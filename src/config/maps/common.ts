import moment from 'moment';
// 产品状态Map
 export const mapProductStatus = {
  0: {
    name: '审批中',
    color: 'orange'
  },
  1: {
    name: '未上线',
    color: ''
  },
  2: {
    name: '运营中',
    color: 'blue'
  },
  3: {
    name: '维护中',
    color: 'volcano'
  },
  4: {
    name: '已下线',
    color: 'red'
  },
  '-1': {
    name: '审批不通过',
    color: 'red'
  }
  // '-2': {
  //   name: '已删除',
  //   color: 'red'
  // },
}; 

// 审批状态Map
  export const mapObjApprovalStatus = {
    '0': {
      name: '待审批',
      color: 'blue'
    },
    '-2': {
      name: '已撤销',
      color: 'rgba(0, 0, 0, .25)'
    },
    '-1': {
      name: '审批不通过',
      color: 'red'
    },
    '1': {
      name: '审批通过',
      color: 'green'
    }
};
// 审批状态array
export const mapArrApprovalStatus = [
    {
        name: '待审批',
        value: '0'
    },  
    {
        name: '审批通过',
        value: '1'
    },
    {
        name: '审批不通过',
        value:'-1'
    },
    {
        name: '已撤销',
        value:'-2'
    },
];


// 申请类型
export const mapApplyType = {
    '1': '产品创建',
    '2': '权限申请',
    3: '账号体系创建',
    4: '游戏服务创建',
    5: '部署服务组创建'
};

// 申请时间
export const mapArrApplyTime = [
  {
    name:'不限',
    key: '0',
    value: []
  },
  {
    name:'本周',
    key: '1',
    value: [moment().startOf('week').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
  },
  {
    name:'本月',
    key: '2',
    value:[moment().startOf('month').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
  },
  {
    name:'近三个月',
    key: '3',
    value: [moment().subtract(3, 'month').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
  },
  {
    name:'近半年',
    key: '4',
    value: [moment().subtract(6, 'month').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
  },
  {
    name:'今年',
    key: '5',
    value: [moment().startOf('year').startOf('month').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
  }
];

// 平台map
export const mapPlatform = {
  '1': '安卓',
  '2': 'IOS',
  '3': 'H5'
};

// 商城属性
export const mallStatus = {
	'1': '开放',
	'2': '私有'
}; 

export const goodsTimeliness = {
	'1': '永久商品',
	'2': '时效商品'
}; 

export const payMap = {
	'0': '全部',
	'1': '支付',
	'2': '登录'
}
// 服务配置状态
export const ServiceStatus = {
  unset: 0,
  applying: 1,
  setted: 2,
  fail: 3
}

// 服务配置分类
export const ServiceType = {
  // 交易服务
  exchange: 'exchange',
  // 游戏服务
  game: 'game',
  // 多宝盒服务
  operate: 'operate',
  // 数据分析
  data: 'data'
}
// 服务配置状态
export const ServiceMap = {
  [ServiceStatus.unset + '']: {
    name: '未配置',
    color: '#bfbfbf',
    id: ServiceStatus.unset,
  },
  [ServiceStatus.applying + '']: {
    name: '申请中',
    color: 'blue',
    id: ServiceStatus.applying
  },
  [ServiceStatus.setted + '']: {
    name: '已配置',
    color: 'green',
    id: ServiceStatus.setted
  },
  [ServiceStatus.fail + '']: {
    name: '失败',
    color: 'red',
    id: ServiceStatus.fail
  },
}
export const payModelList = [
  {
    label: '移动',
    value: 1
  },
  {
    label: 'web',
    value: 2
  }
]
export const payModelMap = {
  '1': '移动',
  '2': 'web'
}
export const accountTypeList = [
  {
      id: 'pt33',
      name: '边锋33体系（BF33）'
  }
  ,
  {
      id: 'other',
      name: '其它'
  }
]
export const accountMap = {
  'pt33': '边锋33体系（BF33）',
  'other': '其它'
}
export const TextMaxLength = 100;
export const InputMaxLength = 50;
