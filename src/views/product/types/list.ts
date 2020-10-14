export interface I_ProductItem {
  created_at: string;
  creator: string;
  description: string;
  differ: number;
  icon: string;
  id: number;
  name: string;
  privilege: number;
  status: number;
  role_list: I_ProductItem_RoleList;
  organization: I_ProductItem_Organization;
  [key: string]: any;
}

export interface I_ProductItem_Organization {
  id: string;
  name: string;
}

export interface I_ProductItem_RoleList {
  product_admin: Array<{
    username: string;
    nickname: string;
  }>;
  [key: string]: any;
}