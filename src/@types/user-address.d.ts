type UserAddressType = "shipping" | "billing";
export interface UserAddress extends UserAddressData {
  type?: UserAddressType;
  id?: number;
  user_id?: number;
}

export interface UserAddressData {
  country?: string;
  state?: string;
  state_id?: number;
  city?: string;
  city_id?: number;
  street?: string;
  house?: string;
  building?: string;
  flat?: string;
  floor?: string;
  address1?: string;
  address2?: string;
  postcode?: string;
}
