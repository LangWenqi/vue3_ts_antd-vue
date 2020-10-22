import Http from '@/utils/request';
import { I_GetAppFilter_Params, I_GetApptList } from './types';

// 应用列表 
export const getAppList = (params: I_GetApptList) => {
  return Http({
    url: '/apps/list',
    data: params
  });    
}
// 获取应用筛选列表
export const getAppFilter = (params: I_GetAppFilter_Params) => {
  return Http({
    url: '/apps/filter',
    method: 'get',
    data: params
  });    
}
