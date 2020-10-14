import { ref, Ref, watchEffect } from 'vue';
import { getSearchUsers } from '@/apis/common';

export interface I_searchUsersMap {
  [key: string]: string;
}

export interface I_SearchUser {
  name: string;
  username: string;
}

export const useSearchUsers = (name: Ref<string>, delay?: number) => {

  const searchUserMap = ref<I_searchUsersMap>({});
  const searchUserList = ref<I_SearchUser[]>([]);

  let timer: ReturnType<typeof setTimeout>;

  watchEffect((onInvalidate) => {

    onInvalidate(() => {
      clearTimeout(timer);
    })

    if (name.value) {
      timer = setTimeout(async () => {
        const data: I_searchUsersMap = await getSearchUsers({ name: name.value }) as I_searchUsersMap;
        searchUserMap.value = data as I_searchUsersMap || {};
        searchUserList.value = Object.keys(searchUserMap.value).map((username: string) => ({ username, name: searchUserMap.value[username] }));
      }, delay || 300)
    }
  })
  
  return {
    searchUserMap,
    searchUserList
  }
}
