export interface UserData {
  email: string;
  name: string;
  last_name?: string;
  middle_name?: string;
  phone?: string;
  phone_list?: string[];
  socialite_token?: string[];
  avatar?: string;
  property?: any[];
  vendor?: VendorData;
}

export interface VendorData {
  id: number;
  user_id: number;
  commission?: number;
  created_at?: string;
  updated_at?: string;
}

export interface UserItem extends UserData {
  id: number;
}

export interface UserModel extends UserItem {
  groups: string[];
  role?: string;
}

export type UserRegisterOptions = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};
