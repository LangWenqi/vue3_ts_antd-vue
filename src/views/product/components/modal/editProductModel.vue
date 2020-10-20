<template>
  <div>
    <a-modal
      :visible="visible"
      :title="'title'"
      ok-text="确认"
      cancel-text="取消"
      @ok="onConfirm"
      @cancel="onCancel"
    >
      <a-form
        :label-col="formLabelCol"
        :wrapper-col="formWrapperCol"
      >
        <a-form-item label="所属组织" v-bind="validateInfos.organization">
          <a-select
            show-search
            class="width-per-100"
            v-model:value="formData.organization"
            placeholder="请选择所属组织"
            :filter-option="false"
            :default-active-first-option="true"
            :show-arrow="false"
            :not-found-content="organizationLoading ? undefined : null"
            @search="handleSearchOrganization"
            allowClear
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

import { defineComponent, PropType, reactive, computed } from 'vue';
import { useForm } from '@ant-design-vue/use';
import { useEditProductRules } from '../../hooks/modal/editProduct';
import { I_EditProductParams, I_EditProductData } from '../../types/modal/editProductModal';
import { useInject } from '@/inject';
import { commonSymbol } from '@/inject/constants';
import { useSearchUsers, useSearchOrganization } from '@/config/hooks/common';
// import { DownOutlined, UpOutlined } from '@ant-design/icons-vue';
import { formLabelCol, formWrapperCol } from '@/config/maps/layout';

export default defineComponent({
  name: 'applyProductModal',
  components: {
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
        adminList: [],
        organizationList: []
      })
    }
  },
  setup (props, context) {

    const { commonState } = useInject(commonSymbol);
    const username = computed<string>(() => commonState.basicInfo.user.username);

    const { handleSearchUsers, userLoading, searchUserList, handleSearchUserDataList } = useSearchUsers();
    const { searcOrganizationList, organizationLoading, handleSearchOrganization, handleSearchOrganizationDataList } = useSearchOrganization();

    const { rules } = useEditProductRules();

    const formData = reactive<I_EditProductParams>({
      icon: '',
      name: '',
      organization: undefined,
      product_admin: [],
      product_id: undefined
    })

    const initFormData = () => {
      Object.keys(formData).forEach((key: string) => {
        (formData as any)[key] = (props.modalData as any)[key];
      })
    }

    initFormData();
    handleSearchUserDataList((props.modalData as I_EditProductData).adminList);
    handleSearchOrganizationDataList((props.modalData as I_EditProductData).organizationList);

    const { resetFields, validate, validateInfos } = useForm(formData, rules);

    const onCancel = () => {
      resetFields();
      context.emit('update:visible', false);
    }
    
    const onConfirm = () => {
      validate().then(async () => {
        // const params = {
        //   pro_id: formData.pro_id,
        //   role_id: formData.role_id as number,
        //   apply_desc: formData.apply_desc
        // }
        // postApplyProdcut(params).then(() => {
        //   onCancel();
        // })
      });
    }

    return {
      formLabelCol,
      formWrapperCol,
      validateInfos,
      formData,
      onCancel,
      onConfirm,
      rules,
      handleSearchUsers,
      userLoading,
      searchUserList,
      searcOrganizationList,
      organizationLoading,
      handleSearchOrganization
    }
  }
})
</script>

<style lang="scss" scoped>
 
</style>
