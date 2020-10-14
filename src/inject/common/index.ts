
import { reactive, readonly } from 'vue';
import { I_CommonInject, I_CommonState, I_BasicInfo } from './types';
import { getBasicInfo } from '@/apis/common';
import { deepClone } from '@/utils/object';

const staticBasicInfo: I_BasicInfo = {
  user: {
    username: '',
    name: '',
    email: '',
    picture: '',
    company: {
      business_name: '',
      company_id: '',
      company_name: '',
      department_code: '',
      department_id: '',
      department_name: '',
      group_company_id: '',
      group_e_number: '',
      job_name: '',
      manage_position: '',
      manage_ranks: '',
      professional_position: '',
      professional_ranks: ''
    }
  }
}
/** 此方法构建是为了在路由中调用（同vuex）**/
const state: I_CommonState = reactive({
  collapsed: false,
  basicInfo: deepClone(staticBasicInfo)
});

export const actions = {
  handleCollapsed: (collapsed = false) => {
    state.collapsed = collapsed;
  },
  handleBasicInfo: (): Promise<I_BasicInfo> => {
    return new Promise((resolve) => {
      getBasicInfo().then((basicInfo) => {
        state.basicInfo = basicInfo as I_BasicInfo || deepClone(staticBasicInfo);
        resolve(state.basicInfo);
      })
    })
  }
}

export const GetCommonInject = (): I_CommonInject => {
  return {
    commonState: readonly(state),
    ...actions
  }
}

/** 此方法构建每次创建新实例，非全局或者路由钩子函数中不需要调用（同vuex）**/

// export const createCommonInject = () => {
//   const state: CommonStateInterface = reactive({
//     counter: 0
//   });

//   const handleIncrementCounter = (counter: number) => {
//     setTimeout(() => {
//       state.counter = counter;
//     }, 1000);
//   }

//   return {
//     commonState: readonly(state),
//     handleIncrementCounter
//   }
// }
// export const provideCommonState = () => provide(
//   commonSymbol, 
//   createCommonInject()
// );
