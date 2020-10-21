<template>
  <div>
    <product-base-info @edit-product="handleEditProductModal(true, ...arguments)"></product-base-info>
    <div class="line-grey-16"></div>
    <edit-product-modal v-if="editProductVisible" @refresh="handleProductDetail" :modal-data="editProductData" v-model:visible="editProductVisible"></edit-product-modal>
  </div>
</template>

<script lang="ts">

import { defineComponent, Ref } from 'vue';
import { useProvideProductDetailData } from './hooks/detail';
import { useDetailEditProduct } from './hooks/detail/productModal';
import productBaseInfo from './components/detail/prodcutBaseInfo.vue';
import editProductModal from './components/modal/editProductModel.vue';
import { I_ProductDetail } from './types/detail/productDetail';

export default defineComponent({
  name: 'ProductDetail',
  components: {
    productBaseInfo,
    editProductModal
  },
  setup () {
    const { handleProductDetail, productInfo } = useProvideProductDetailData();

    handleProductDetail();

    const {
      editProductVisible,
      editProductData,
      handleEditProductModal
    } = useDetailEditProduct(productInfo as Ref<I_ProductDetail>);
    
    return {
      productInfo,
      editProductVisible,
      editProductData,
      handleProductDetail,
      handleEditProductModal
    }
  }
})
</script>

<style lang="scss" scoped>
 
</style>
