<template>
  <div>
    <list-table></list-table>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import listTable from './components/list/listTable.vue';
import { useProvideProductListData } from './hooks/list';

export default defineComponent({
  name: 'Product',
  components: {
    listTable
  },
  setup () {
    useProvideProductListData();
  }
})
</script>

<style lang="scss" scoped>
 
</style>
