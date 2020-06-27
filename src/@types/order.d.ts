import { UserData } from "./user";
import { UserAddressData } from "./user-address";
import { PaymentMethodItem } from "./payment";

export interface OrderData {
  id?: number;
  user_id?: number;
  status_id?: number;
  payment_method_id?: number;
  shipping_type_id?: number;

  // Prices
  total_price?: string;
  total_price_value?: number;
  shipping_price?: string;
  shipping_price_value?: number;
  old_shipping_price?: string;
  old_shipping_price_value?: number;
  discount_shipping_price?: string;
  discount_shipping_price_value?: number;
  old_total_price?: string;
  old_total_price_value?: number;
  discount_total_price?: string;
  discount_total_price_value?: number;
  position_total_price?: string;
  position_total_price_value?: number;
  old_position_total_price?: string;
  old_position_total_price_value?: number;
  discount_position_total_price?: string;
  discount_position_total_price_value?: number;

  order_number?: string;
  currency_symbol?: string;
  weight?: string;
  order_position_id?: number;
  order_promo_mechanism_id?: string;
  shipping_tax_percent?: string;
  property?: object;

  // Payment Method
  payment_method?: PaymentMethodItem;
}

export interface MakeOrderData {
  order?: OrderData;
  user?: UserData;
  billing_address?: UserAddressData;
  shipping_address?: UserAddressData;
}
