import Http from '@/utils/request';
import { I_GetProductList } from './types';

// 获取产品列表
export function getProductList (params: I_GetProductList) {
  return Http({
    url: '/product/list',
    data: params
  });
}
