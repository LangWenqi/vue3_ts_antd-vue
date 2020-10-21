<template>
  <div>
    <a-modal
      :visible="visible"
      :title="modalTitle"
      ok-text="确认"
      cancel-text="取消"
      @ok="onConfirm"
      @cancel="onCancel"
    >
      <a-form
        :label-col="formLabelCol"
        :wrapper-col="formWrapperCol"
      >
        <a-form-item label="产品图标" v-bind="validateInfos.icon">
          <a-upload
            name="data"
            :action="uploadUrl"
            list-type="picture-card"
            :show-upload-list="false"
            @change="handleChangeFile"
            @beforeUpload="beforeUpload"
          >
            <div class="upload-img" v-if="formData.icon && !fileLoading">
              <img :src="formData.icon">
            </div>
            <div v-else>
              <LoadingOutlined v-if="fileLoading"/>
              <PlusOutlined v-else/>
              <div>{{fileLoading ? '图片上传中' : '上传图片'}}</div>
            </div>
          </a-upload>
        </a-form-item>
        <a-form-item label="产品名称" v-bind="validateInfos.name">
          <a-input v-model:value="formData.name" allowClear placeholder="请输入产品名称"></a-input>
        </a-form-item>
        <a-form-item label="产品简介">
          <a-textarea
            v-model:value="formData.description"
            placeholder="请输入产品简介"
            :auto-size="{ minRows: 2, maxRows: 5 }"
            allowClear
          />
        </a-form-item>
        <a-form-item label="所属组织" v-bind="validateInfos.organization">
          <a-select
            show-search
            class="width-per-100"
            v-model:value="formData.organization"
            placeholder="请选择所属组织"
            :filter-option="false"
            :default-active-first-option="true"
            :not-found-content="organizationLoading ? undefined : null"
            @search="handleSearchOrganization"
          >
            <template v-if="organizationLoading" v-slot:notFoundContent>
              <a-spin size="small" />
            </template>
            <a-select-option v-for="organizationItem in searcOrganizationList" :key="organizationItem.id">
              {{ organizationItem.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="产品管理员" v-bind="validateInfos.product_admin">
          <a-select
            class="select-width"
            mode="multiple"
            show-search
            v-model:value="formData.product_admin"
            placeholder="请选择管理员"
            :filter-option="false"
            :not-found-content="userLoading ? undefined : null"
            @search="handleSearchUsers"
            allowClear
          >
            <template v-if="userLoading" v-slot:notFoundContent>
              <a-spin size="small" />
            </template>
            <a-select-option v-for="searchUserItem in searchUserList" :key="searchUserItem.username">
              {{ searchUserItem.nickname }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts">

import { defineComponent, PropType, reactive, ref, computed } from 'vue';
import { useForm } from '@ant-design-vue/use';
import { useEditProductRules } from '../../hooks/modal/editProduct';
import { I_EditProductParams, I_EditProductData } from '../../types/modal/editProductModal';
import { useInject } from '@/inject';
import { commonSymbol } from '@/inject/constants';
import { useSearchUsers, useSearchOrganization } from '@/config/hooks/common';
import { editProduct, addProduct } from '@/apis/product';
import { uploadUrl } from '@/apis/file/upload';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { formLabelCol, formWrapperCol } from '@/config/maps/layout';

export default defineComponent({
  name: 'applyProductModal',
  components: {
    PlusOutlined,
    LoadingOutlined
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    modalData: {
      type: Object as PropType<I_EditProductData>,
      defult: () => ({
        icon: '',
        name: '',
        organization: undefined,
        product_admin: [],
        product_id: undefined,
        description: '',
        adminList: [],
        organizationList: []
      })
    }
  },
  setup (props, context) {

    const { commonState } = useInject(commonSymbol);
    const username = computed<string>(() => commonState.basicInfo.user.username);
    const nickname = computed<string>(() => commonState.basicInfo.user.name);

    const { handleSearchUsers, userLoading, searchUserList, handleSearchUserDataList } = useSearchUsers();
    const { searcOrganizationList, organizationLoading, handleSearchOrganization, handleSearchOrganizationDataList } = useSearchOrganization();

    const { rules } = useEditProductRules();

    const formData = reactive<I_EditProductParams>({
      icon: '',
      name: '',
      organization: undefined,
      product_admin: [],
      product_id: undefined,
      description: ''
    })
    const productId = computed<number | undefined>(() => (props.modalData as I_EditProductData).product_id);

    const modalTitle = computed<string>(() => productId.value ? '编辑产品' : '申请创建产品');

    const initFormData = () => {
      Object.keys(formData).forEach((key: string) => {
        (formData as any)[key] = (props.modalData as any)[key];
      });
      if (!productId.value) {
        formData.product_admin = [username.value];
      }
    }

    initFormData();
    handleSearchUserDataList(productId.value ? (props.modalData as I_EditProductData).adminList : [{ username: username.value, nickname: nickname.value }]);
    handleSearchOrganizationDataList((props.modalData as I_EditProductData).organizationList);

    const { resetFields, validate, validateInfos } = useForm(formData, rules);

    const onCancel = () => {
      resetFields();
      context.emit('update:visible', false);
    }
    
    const onConfirm = () => {
      validate().then(async () => {
        const requestFuc = productId.value ? editProduct : addProduct;
        const params = {
          ...formData,
          organization: searcOrganizationList.value[0]
        }
        requestFuc(params).then(() => {
          context.emit('refresh');
          onCancel();
        })
      });
    }
    const beforeUpload = (file: File) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('只能上传类型JPG/PNG的图片!');
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('上传图片大小不能超过2MB');
        return false;
      }
      return true;
    }
    const fileLoading = ref<boolean>(false);

    const handleChangeFile = (info: any) => {
      if (info.file.status === 'error') {
        fileLoading.value = false;
        message.error('上传图标出错！');
        return;
      }
      if (info.file.status === 'uploading') {
        fileLoading.value = true;
        return;
      }
      if (info.file.status === 'done') {
        fileLoading.value = false;
        if (info.file.response) {
          message.success('上传成功！');
        } else {
          message.error('上传图标出错！');
        }
        formData.icon = info.file.response.url || info.file.thumbUrl || '';
      }
    }
    
    return {
      uploadUrl,
      formLabelCol,
      formWrapperCol,
      validateInfos,
      modalTitle,
      formData,
      onCancel,
      onConfirm,
      rules,
      handleSearchUsers,
      userLoading,
      searchUserList,
      searcOrganizationList,
      organizationLoading,
      handleSearchOrganization,
      beforeUpload,
      handleChangeFile,
      fileLoading
    }
  }
})
</script>

<style lang="scss" scoped>
 
</style>
