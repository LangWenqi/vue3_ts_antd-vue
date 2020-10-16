import Http from '@/utils/request';
import { I_GetSearchUsers, I_SearchOrganization } from './types';

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
// 搜索获取部门
export function getSearchOrganization(params: I_SearchOrganization) {
  return Http({
    url: '/search/organization',
    data: params
  });
}