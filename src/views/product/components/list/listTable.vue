<template>
  <div class="padding-all-24">
    <a-table
      rowKey="id"
      size="middle"
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
        <div flex>
          <a-avatar class="border-radius-4" :size="48" shape="square" :src="record.icon"></a-avatar>
          <div class="margin-left-12">
            <div>{{record.name}}</div>
            <div class="color-black-9 font-12">{{record.description || '-'}}</div>
          </div>
        </div>
      </template>
      <template v-slot:status="{ record }">
        <div>
          {{getStatus(record)}}
          <a-tag :color="getStatus(record).color">
              {{getStatus(record).name}}
          </a-tag> 
        </div>
      </template>
      <template v-slot:organization="{ record }">
        <div>
          {{record?.organization?.name || '-'}}
        </div>
      </template>
      <template v-slot:admin="{ record }">
        <div>
          {{getAdmins(record)}}
        </div>
      </template>
      <template v-slot:create_at="{ record }">
        <div>
          {{getCreateAt(record)}}
        </div>
      </template>
       <template v-slot:control="{ record }">
        <div>
          <a-button type="link" v-if="isShowApply(record)">申请权限</a-button>
          <a-button type="link" v-if="isShowEdit(record)">编辑</a-button>
          <a-button type="link" v-if="isShowDelete(record)">删除</a-button>
          <a-button type="link" v-if="isShowDetail(record)">详情</a-button>
        </div>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import { useInjectProductListData } from '../../hooks/list';
import { mapProductStatus } from '@/config/maps/common';
import { I_ProductItem } from '../../types/list';

export default defineComponent({
  name: 'ListTable',
  components: {
  },
  setup () {

    const { productListData } = useInjectProductListData();

    const { 
      curpage,
      perpage,
      rcount,
      loading,
      columns,
      productList,
      changePage
    } = productListData; 

    const getStatus = (record: I_ProductItem) => {
      return {
        color: mapProductStatus[record.status]?.color || '',
        name: mapProductStatus[record.status]?.name || ''
      }
    }

    const getAdmins = (record: I_ProductItem) => {
      if (record.role_list && Array.isArray(record.role_list.product_admin)) {
        return record.role_list.product_admin.join('、');
      } else {
        return '-';
      }
    }

    const getCreateAt = (record: I_ProductItem) => {
      return record.created_at?.split(' ')[0] || '-';
    }

    const isShowApply = (record: I_ProductItem) => (record.privilege !== -1 && record.privilege === 0);
    const isShowEdit = (record: I_ProductItem) => (record.privilege === 1);
    const isShowDelete = (record: I_ProductItem) => (record.status === -1 && record.privilege === 1);
    const isShowDetail = (record: I_ProductItem) => (record.status === -1 && (record.privilege === 1 || record.privilege === 2));

    return {
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
      isShowDetail
    }
  }
})
</script>

<style lang="scss" scoped>
 
</style>
