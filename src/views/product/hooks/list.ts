import { ref, reactive, inject, provide, toRefs, watch } from 'vue';
import { I_ProductItem } from '../types/list';
import { getProductList } from '@/apis/product';
import { I_GetProductList_Params } from '@/apis/product/types';
import { I_Page } from '@/config/types/common';
import { deepClone } from '@/utils/object';

export const useListTableColumns = () => {
  const columns = ref([
    {
      title: '产品',
      key: 'name',
      dataIndex: 'name',
      slots: { customRender: 'name' }
    },
    {
      title: '所属组织',
      key: 'organization',
      dataIndex: 'organization',
      slot: { customRender: 'organization' }
    },
    {
      title: '管理员',
      key: 'admin',
      dataIndex: 'admin',
      slot: { customRender: 'admin' }
    },
    {
      title: '创建时间',
      key: 'created_at',
      dataIndex: 'created_at',
      slot: { customRender: 'created_at' }
    }
  ]);

  return {
    columns
  }
}

// 产品列表删选组件

export const useListParams = () => {

  const staticProduuctParams: I_GetProductList_Params = {
    admin: [],
    organization: undefined,
    status: undefined,
    created_at: undefined,
    name: ''
  };

  const productParams = reactive<I_GetProductList_Params>(deepClone(staticProduuctParams));
  
  const resetProductParams = () => {
    Object.keys(staticProduuctParams).forEach((key: string) => {
      const paramsKey = key as keyof I_GetProductList_Params;
      (productParams as any)[paramsKey] = typeof staticProduuctParams[paramsKey] === 'object' ? deepClone(staticProduuctParams[paramsKey]) : staticProduuctParams[paramsKey];
    })
  }

  return {
    productParams,
    resetProductParams
  }
}

// 产品列表表格组件

export const useListData = () => {

  const loading = ref(false);
  
  const curpage = ref<number>(1);

  const rcount = ref<number>(0);

  const perpage = ref<number>(15);

  const productList = ref<I_ProductItem[]>([]);
  
  const changePage = (page: number) => {
    curpage.value = page;
  }

  const handleProductList = (productParams: I_GetProductList_Params) => {

    loading.value = true;
    
    getProductList({ ...productParams, curpage: curpage.value, perpage: perpage.value }).then((data: any) => {

      const { page, list }: { page: I_Page; list: I_ProductItem[] } = data || {};

      productList.value = list || [];

      rcount.value = page.rcount;

      loading.value = false;
     
    }).catch(() => {

      loading.value = false;

    })
  }
  
  return {
    curpage,
    perpage,
    rcount,
    loading,
    productList,
    handleProductList,
    changePage
  }
}

// 产品列表主页面

export const useProductList = () => {

  const listParams = useListParams();

  const listData = useListData();
  
  const { productParams, resetProductParams } = listParams;

  const { curpage, changePage, handleProductList } = listData;

  const resetProductList = () => {
    resetProductParams();
    changePage(1);
  }
   
  watch(curpage, () => {
    handleProductList(productParams);
  }, {
    immediate: true
  });

  return {
    productListData: {
      ...useListTableColumns(),
      ...listData
    },
    productParamsData: {
      ...toRefs(productParams),
      resetProductParams
    },
    productCommonData: {
      resetProductList
    }
  }
}

export const productListSymbol = Symbol('productList');

export const useInjectProductListData = () => {
  return inject(productListSymbol) as ReturnType<typeof useProductList>
}

export const useProvideProductListData = () => {
  const productListData = useProductList()
  provide(productListSymbol, productListData);
  return {
    productListData
  }
}
