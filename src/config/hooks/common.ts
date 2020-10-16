import { ref, watchEffect } from 'vue';
import { getSearchUsers, getSearchOrganization } from '@/apis/common';

export interface I_searchUsersMap {
  [key: string]: string;
}

export interface I_SearchUser {
  nickname: string;
  username: string;
}

export const useSearchUsers = (delay?: number) => {

  const userKeywords = ref<string>('');

  const handleSearchUsers = (keywords: string) => {
    userKeywords.value = keywords;
  }

  const searchUserMap = ref<I_searchUsersMap>({});

  const searchUserList = ref<I_SearchUser[]>([]);

  const userLoading = ref<boolean>(false);

  let timer: ReturnType<typeof setTimeout>;

  const fetchSearchUserList = async (name: string) => {
    userLoading.value = true;
    const data: I_searchUsersMap = await getSearchUsers({ name }) as I_searchUsersMap;
    userLoading.value = false;
    searchUserMap.value = data as I_searchUsersMap || {};
    searchUserList.value = Object.keys(searchUserMap.value).map((username: string) => ({ username, nickname: searchUserMap.value[username] }));
  }

  watchEffect((onInvalidate) => {

    onInvalidate(() => {
      clearTimeout(timer);
      userLoading.value = false;
    })

    if (userKeywords.value) {
      timer = setTimeout(async () => {
        fetchSearchUserList(userKeywords.value);
      }, delay || 300)
    }
  })
  
  return {
    searchUserMap,
    searchUserList,
    userLoading,
    handleSearchUsers,
    fetchSearchUserList
  }
}

export interface I_searchOrganizationMap {
  [key: string]: string;
}
export interface I_SearchOrganization {
  name: string;
  id: string;
}

export const useSearchOrganization = (delay?: number) => {

  const organizationKeywords = ref<string>('');

  const handleSearchOrganization = (keywords: string) => {
    organizationKeywords.value = keywords;
  }

  const searchOrganizationMap = ref<I_searchOrganizationMap>({});

  const searcOrganizationList = ref<I_SearchOrganization[]>([]);

  const organizationLoading = ref<boolean>(false);

  let timer: ReturnType<typeof setTimeout>;

  const fetchSearchOrganization = async (name: string) => {
    organizationLoading.value = true;
    const data: I_searchOrganizationMap = await getSearchOrganization({ name }) as I_searchOrganizationMap;
    organizationLoading.value = false;
    searchOrganizationMap.value = data as I_searchOrganizationMap || {};
    searcOrganizationList.value = Object.keys(searchOrganizationMap.value).map((id: string) => ({ id, name: searchOrganizationMap.value[id] }));
  }

  watchEffect((onInvalidate) => {

    onInvalidate(() => {
      clearTimeout(timer);
      organizationLoading.value = false;
    })

    if (organizationKeywords.value) {
      timer = setTimeout(async () => {
        fetchSearchOrganization(organizationKeywords.value);
      }, delay || 300)
    }
  })
  
  return {
    searchOrganizationMap,
    searcOrganizationList,
    organizationLoading,
    handleSearchOrganization
  }
}
