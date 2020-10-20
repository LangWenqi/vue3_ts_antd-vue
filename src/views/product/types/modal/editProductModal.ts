import { I_Organization, I_User } from '@/apis/common/types';

export interface I_EditProductParams {
  icon: string;
  name: string;
  product_admin: string[];
  product_id?: number
  organization: string | undefined;
}

export interface I_EditProductData extends I_EditProductParams{
  adminList: I_User[];
  organizationList: I_Organization[]
}