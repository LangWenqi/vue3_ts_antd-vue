export interface I_GetAppFilter_Params {
  product_id: number
}


export interface I_GetApptList extends I_GetAppList_params {
  curpage: number;
  perpage: number;
  product_id: number;
}

export interface I_GetAppList_params {
  area_id: number | undefined;
  channel_market_type: number | undefined;
  cp_content_id: number | undefined;
  search: string;
}
