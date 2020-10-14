
<template>
  <a-layout-sider
    class="height-vh-100 overflow--auto--hide-scrollbar"
    breakpoint="lg"
    v-model:collapsed="collapsed"
  >
    <div class="logo" />
    <a-menu theme="dark" mode="inline" :selectedKeys="[currentPath]" @click="changeMenuRoute">
      <a-menu-item :key="menuItem.path" v-for="menuItem in menuList">
        <component :is="menuItem.icon"></component>
        <span class="nav-text">{{menuItem.name}}</span>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import { AppstoreOutlined } from '@ant-design/icons-vue';
import { useCollapsed, useMenuList, useSelectRoute } from '../hooks/layouts/sidebar';

export default defineComponent({
  name: 'SideBar',
  components: {
    AppstoreOutlined  
  },
  setup () {
    const { collapsed } = useCollapsed();

    const { menuList } = useMenuList();

    const { currentPath, handleMenuRoute } = useSelectRoute();

    const changeMenuRoute = ({ key: path }: { key: string}) => {
      if (currentPath.value === path) return;
      handleMenuRoute(path);
    }
    return {
      collapsed,
      menuList,
      currentPath,
      handleMenuRoute,
      changeMenuRoute
    }
  }
})
</script>

<style lang="scss" scoped>
 
</style>
