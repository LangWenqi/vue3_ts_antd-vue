import { I_Organization, I_User } from '@/config/types/common';

export interface I_EditProductParams {
  icon: string;
  name: string;
  product_admin: string[];
  product_id?: number
  organization: string | undefined;
  description: string;
}

export interface I_EditProductData extends I_EditProductParams{
  adminList: I_User[];
  organizationList: I_Organization[]
}