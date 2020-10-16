<template>
  <div>
    <search-form/>
    <div class="line-grey-16"></div>
    <list-table/>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import searchForm from './components/list/searchForm.vue';
import listTable from './components/list/listTable.vue';
import { useProvideProductListData } from './hooks/list';

export default defineComponent({
  name: 'Product',
  components: {
    searchForm,
    listTable
  },
  setup () {
    useProvideProductListData();
  }
})
</script>

<style lang="scss" scoped>
 
</style>
