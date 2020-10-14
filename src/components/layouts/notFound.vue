

<template>
  <div class="not-found__container">
    <a-result status="404" title="" sub-title="找不到页面~">
      <template #extra>
        <a-button type="primary" @click="backToHome">
          返回首页
        </a-button>
      </template>
    </a-result>
    <!-- <a-empty class="not-found__inner"
      :image-style="{
        height: '160px',
      }"
    >
      <template v-slot:image>
        <img src="../../images/404.png" alt="">
      </template>
      <span class="not-found__font" slot="description">找不到页面~</span>
      <a-button type="primary" @click="backToHome">
        返回首页
      </a-button>
    </a-empty> -->
  </div>
</template>    
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class NotFound extends Vue {
  backToHome() {
    this.$router.replace('/');
  }
}
</script>

<style lang="scss" scoped>
  /* .not-found__container {
    height: 100vh;
    position: relative;
  }
  .not-found__inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-70%);
  }
  .not-found__font {
  } */
</style>
