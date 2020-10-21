<template>
  <div class="padding-all-24">
    <a-table
      size="middle"
      rowKey="id"
      :columns="columns"
      :loading="loading"
      :data-source="productList"
      :pagination="{
        showQuickJumper: true,
        onChange: changePage,
        current: curpage,
        pageSize: perpage,
        total: rcount,
        size: 'normal'
      }"
    >
      <template v-slot:name="{ record }">
        <div flex :style="{minWidth: minWidth}">
          <a-avatar class="border-radius-4" :size="48" shape="square" :src="record.icon"></a-avatar>
          <div class="margin-left-12">
            <div>{{record.name}}</div>
            <div class="color-black-9 font-12">{{record.description || '-'}}</div>
          </div>
        </div>
      </template>
      <template v-slot:status="{ record }">
        <div>
          <a-tag :color="getStatus(record).color">
              {{getStatus(record).name}}
          </a-tag> 
        </div>
      </template>
      <template v-slot:organization="{ record }">
        <div :style="{minWidth: minWidth}">
          {{record.organization?.name || '-'}}
        </div>
      </template>
      <template v-slot:admin="{ record }">
        <div :style="{minWidth: minWidth}">
          {{getAdmins(record)}}
        </div>
      </template>
      <template v-slot:created_at="{ record }">
        <div :style="{minWidth: minWidth}">
          {{getCreateAt(record)}}
        </div>
      </template>
      <template v-slot:control="{ record }">
        <div class="ant-btn-no-padding" :style="{minWidth: minWidth}">
          <a-button type="link" v-if="isShowApply(record)" @click="handleApplyProductModal(true, record)">申请权限</a-button>
          <a-button type="link" v-if="isShowEdit(record)" @click="handleEditProductModal(true, record)">编辑</a-button>
          <a-divider type="vertical" v-if="isShowDelete(record)"/>
          <a-button type="link" v-if="isShowDelete(record)">删除</a-button>
          <a-divider type="vertical" v-if="isShowDetail(record)"/>
          <a-button type="link" v-if="isShowDetail(record)" @click="toDetail(record.id)">详情</a-button>
        </div>
      </template>
    </a-table>
    <apply-product-modal v-if="applyProductVisible" @refresh="resetProductList" :modal-data="applyProductData" v-model:visible="applyProductVisible"></apply-product-modal>
    <edit-product-modal v-if="editProductVisible" @refresh="resetProductList" :modal-data="editProductData" v-model:visible="editProductVisible"></edit-product-modal>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import { useInjectProductListData } from '../../hooks/list';
import { useApplyProductVisible } from '../../hooks/modal/applyProduct';
import { useEditProductVisible } from '../../hooks/modal/editProduct';
import { mapProductStatus } from '@/config/maps/common';
import { I_ProductItem } from '../../types/list/listTable';
import { I_User } from '@/config/types/common';
import applyProductModal from '../modal/applyProductModal.vue';
import editProductModal from '../modal/editProductModel.vue';
import { useRouter } from 'vue-router';

const minWidth = '80px';

export default defineComponent({
  name: 'ListTable',
  components: {
    applyProductModal,
    editProductModal
  },
  setup () {

    const { productListData, productCommonData } = useInjectProductListData();

    const { 
      curpage,
      perpage,
      rcount,
      loading,
      columns,
      productList,
      changePage
    } = productListData;

    const { resetProductList } = productCommonData;
    
    const getStatus = (record: I_ProductItem) => {
      return {
        color: mapProductStatus[record.status]?.color || '',
        name: mapProductStatus[record.status]?.name || ''
      }
    }

    const getAdminArr = (record: I_ProductItem) => {
      return record.role_list && Array.isArray(record.role_list.product_admin) ? record.role_list.product_admin : [];
    }

    const getAdmins = (record: I_ProductItem) => {
      const arr = getAdminArr(record);
      return arr.length > 0 ? arr.map((item: I_User) => item.nickname).join('、') : '-'
    }

    const getAdminIds = (record: I_ProductItem) => {
      const arr = getAdminArr(record);
      return arr.length > 0 ? arr.map((item: I_User) => item.username) : [];
    }

    const getOrganizations = (record: I_ProductItem) => {
      return record.organization && record.organization.id ? [record.organization] : [];
    }
    const getCreateAt = (record: I_ProductItem) => {
      return record.created_at?.split(' ')[0] || '-';
    }

    const isShowApply = (record: I_ProductItem) => (record.privilege !== -1 && record.privilege === 0);
    const isShowEdit = (record: I_ProductItem) => (record.privilege === 1);
    const isShowDelete = (record: I_ProductItem) => (record.status === -1 && record.privilege === 1);
    const isShowDetail = (record: I_ProductItem) => (record.privilege === 1 || record.privilege === 2);

    const {
      applyProductVisible,
      applyProductData,
      handleApplyProductVisible,
      handleApplyProductData
    } = useApplyProductVisible();

    const handleApplyProductModal = (visible: boolean, record: I_ProductItem) => {
      handleApplyProductData({
        pro_id: record.id,
        role_id: undefined,
        product_name: record.name,
        apply_desc: ''
      });
      handleApplyProductVisible(visible);
    }
    
    const {
      editProductVisible,
      editProductData,
      handleEditProductVisible,
      handleEditProductData
    } = useEditProductVisible();

    const handleEditProductModal = (visible: boolean, record?: I_ProductItem) => {
      const data = {
        product_id: record ? record.id : undefined,
        icon: record ? record.icon : '',
        name: record ? record.name : '',
        organization: record ? record.organization?.id : undefined,
        product_admin: record ? getAdminIds(record) : [],
        adminList: record ? getAdminArr(record) : [],
        organizationList: record ? getOrganizations(record) : [],
        description: (record && record.description) || ''
      }
      handleEditProductData(data);
      handleEditProductVisible(visible);
    }

    const router = useRouter();

    const toDetail = (id: number) => {
      const routeData = router.resolve({
        path: '/product/detail',
        query: {
          id
        }
      });
      window.open(routeData.href);
    }
    return {
      minWidth,
      curpage,
      perpage,
      rcount,
      loading,
      columns,
      productList,
      changePage,
      getStatus,
      getAdmins,
      getCreateAt,
      isShowApply,
      isShowEdit,
      isShowDelete,
      isShowDetail,
      handleApplyProductModal,
      applyProductVisible,
      applyProductData,
      editProductVisible,
      editProductData,
      handleEditProductVisible,
      handleEditProductData,
      handleEditProductModal,
      resetProductList,
      toDetail
    }
  }
})
</script>

<style lang="scss" scoped>
 
</style>
