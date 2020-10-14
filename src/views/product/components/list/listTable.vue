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
        <div>
          <a-avatar class="border-radius-4" :size="48" shape="square" :src="record.icon"></a-avatar>
        </div>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import { useInjectProductListData } from '../../hooks/list';
import { mapProductStatus } from '@/config/maps/common';

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
   
    return {
      curpage,
      perpage,
      rcount,
      loading,
      columns,
      productList,
      changePage,
      mapProductStatus
    }
  }
})
</script>

<style lang="scss" scoped>
 
</style>
