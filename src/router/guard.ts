import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import router from '@/router';
import { GetCommonInject } from '@/inject/common';
export class RouterGuardClass {
  static instance: RouterGuardClass | null

  static getInstance () {
    if (!RouterGuardClass.instance) {
      RouterGuardClass.instance = new RouterGuardClass()
    }
    return RouterGuardClass.instance;
  }

  beforeEach () {
    router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      console.log('routerBreforeEach', to, from);
      const { commonState, handleBasicInfo } = GetCommonInject()

      if (!commonState.basicInfo.user.username) {
        await handleBasicInfo();
      }
      next();
    });
    return this;
  }

  afterEach () {
    router.afterEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
      console.log('routerAfterEach', to, from);
    })
    return this;
  }

}
