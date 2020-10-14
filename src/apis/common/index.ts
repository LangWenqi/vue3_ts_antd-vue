import Http from '@/utils/request';
import { I_GetSearchUsers } from './types';

// 登出
export const handleLogout = () => {
  window.location.href = '/api/logout';
}

// 获取用户基础信息
export function getBasicInfo () {
  return Http({
    url: '/basic',
    data: {}
  });
};
// 搜索获取用户
export function getSearchUsers (params: I_GetSearchUsers) {
  return Http({
    url: '/search/user',
    data: params
  });
};
