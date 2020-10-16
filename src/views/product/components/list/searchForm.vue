<template>
  <div class="padding-all-24">
    <div flex="cross:center" v-if="!isSeniorSearch">
      <a-input class="input-width" v-model:value="name" placeholder="请输入关键词" allowClear/>
      <a-button class="margin-left-24" type="primary" @click="searchProductList">搜索</a-button>
      <a-button type="link">高级搜索<DownOutlined/></a-button>
    </div>
    <div v-else>
      <a-row>
        <a-col :span="24">
          <a-form-item label="管理员" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-select
              class="select-width"
              mode="multiple"
              v-model:value="admin"
              placeholder="请选择管理员"
              :filter-option="false"
              :not-found-content="userLoading ? undefined : null"
              @search="handleSearchUsers"
            >
              <template v-if="userLoading" v-slot:notFoundContent>
                <a-spin size="small" />
              </template>
              <a-select-option v-for="searchUserItem in searchUserList" :key="searchUserItem.username">
                {{ searchUserItem.nickname }}
              </a-select-option>
            </a-select>
            <a-button type="link" @click="handleSelfAdmin">只看自己的</a-button>
          </a-form-item>
        </a-col>
      </a-row>
      <a-divider dashed />
      <a-row>
        <a-col :span="8">
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent, ref, computed } from 'vue';
import { useInjectProductListData } from '../../hooks/list/index';
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue';
import { useSearchUsers, useSearchOrganization } from '@/config/hooks/common';
import { useInject } from '@/inject';
import { commonSymbol } from '@/inject/constants';
// import { mapProductStatus } from '@/config/maps/common';
// import { I_ProductItem, I_ProductItem_RoleList_ProductAdminItem } from '../../types/list';

const inlineLabelCol = { span: 6 };
const inlineWrapperCol = { span: 18 };

const labelCol = { span: 2 };
const wrapperCol = { span: 22 };

export default defineComponent({
  name: 'SearchForm',
  components: {
    DownOutlined,
    UpOutlined
  },
  setup () {

    const { productParamsData, productCommonData } = useInjectProductListData();

    const { searchProductList } = productCommonData;

    const {
      admin,
      organization,
      status,
      created_at,
      name
    } = productParamsData;

    const { handleSearchUsers, userLoading, searchUserList, fetchSearchUserList } = useSearchUsers();

    const { commonState } = useInject(commonSymbol);

    const username = computed<string>(() => commonState.basicInfo.user.username);

    const isSeniorSearch = ref(true);

    const setSelfAdmin = () => {
      admin.value = [username.value];
    }

    const handleSelfAdmin = async () => {
      await fetchSearchUserList(username.value);
      setSelfAdmin();
    }

    return {
      labelCol,
      wrapperCol,
      inlineLabelCol,
      inlineWrapperCol,
      admin,
      organization,
      status,
      created_at,
      name,
      searchProductList,
      isSeniorSearch,
      handleSearchUsers,
      fetchSearchUserList,
      userLoading,
      searchUserList,
      handleSelfAdmin
    }
  }
})
</script>

<style lang="scss" scoped>
 
</style>
