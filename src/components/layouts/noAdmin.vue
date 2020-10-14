

<template>
  <div class="not-found__container">
    <a-result status="403" title="" sub-title="您没有查看权限，请联系管理员：多啦A梦-朱莹">
      <template #extra>
        <a-button type="primary" @click="backToHome">
          返回首页
        </a-button>
        <a-button type="primary" @click="toAdmin">
          申请权限
        </a-button>
      </template>
    </a-result>
    <!-- <a-empty class="not-found__inner"
      :image-style="{
        height: '160px',
      }"
    >
      <template v-slot:image>
        <img src="../../images/401.png" alt="">
      </template>
      <span class="not-found__font" slot="description">您没有查看权限，请联系管理员：多啦A梦-朱莹</span>
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
  toAdmin() {
    window.open('https://ibox.imeete.com/apply?id=1054&name=%E5%8F%91%E8%A1%8C%E5%B9%B3%E5%8F%B0&st_name=&st_id=0');
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
