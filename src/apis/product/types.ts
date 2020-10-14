export interface I_GetProductList extends I_GetProductList_Params {
  curpage: number;
  perpage: number;
}

export interface I_GetProductList_Params {
  admin: string[];
  organization: string | undefined;
  status: number | undefined;
  created_at: string | undefined;
  name: string | undefined;
}
