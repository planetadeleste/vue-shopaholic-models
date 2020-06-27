import { Result } from "./base";
import { OfferModel } from "./offer";
import { ProductItem } from "./product";

/**
 * CART
 */
export interface CartItemPriceData {
  price: string;
  price_value: number;
  tax_price: string;
  tax_price_value: number;
  price_without_tax: string;
  price_without_tax_value: number;
  price_with_tax: string;
  price_with_tax_value: number;
  old_price: string;
  old_price_value: number;
  tax_old_price: string;
  tax_old_price_value: number;
  old_price_without_tax: string;
  old_price_without_tax_value: number;
  old_price_with_tax: string;
  old_price_with_tax_value: number;
  discount_price: string;
  discount_price_value: number;
  tax_discount_price: string;
  tax_discount_price_value: number;
  discount_price_without_tax: string;
  discount_price_without_tax_value: number;
  discount_price_with_tax: string;
  discount_price_with_tax_value: number;
  price_per_unit: string;
  price_per_unit_value: number;
  tax_price_per_unit: string;
  tax_price_per_unit_value: number;
  price_per_unit_without_tax: string;
  price_per_unit_without_tax_value: number;
  price_per_unit_with_tax: string;
  price_per_unit_with_tax_value: number;
  old_price_per_unit: string;
  old_price_per_unit_value: number;
  tax_old_price_per_unit: string;
  tax_old_price_per_unit_value: number;
  old_price_per_unit_without_tax: string;
  old_price_per_unit_without_tax_value: number;
  old_price_per_unit_with_tax: string;
  old_price_per_unit_with_tax_value: number;
  discount_price_per_unit: string;
  discount_price_per_unit_value: number;
  tax_discount_price_per_unit: string;
  tax_discount_price_per_unit_value: number;
  discount_price_per_unit_without_tax: string;
  discount_price_per_unit_without_tax_value: number;
  discount_price_per_unit_with_tax: string;
  discount_price_per_unit_with_tax_value: number;
  log: any[];
}

export interface CartPosition extends CartItemPriceData {
  id: number;
  item_id: number;
  item_type: string;
  quantity: number;
  max_quantity: number;
  property: string;
}

export interface CartPositionGroup {
  [key: string]: CartPosition;
}

export interface CartProcessorData {
  position: CartPositionGroup[];
  shipping_price: {};
  position_total_price: CartItemPriceData;
  total_price: CartItemPriceData;
  quantity: number;
  total_quantity: number;
  payment_method_id: number | null;
  shipping_type_id: number | null;
  user_data: any[] | null;
  shipping_address: any | null;
  billing_address: any | null;
  property: any[] | null;
}

export interface CartProcessor extends Result {
  data: CartProcessorData;
}

export interface CartDataItem {
  offer_id: number;
  quantity: number;
  property?: any[];
}

export interface CartData {
  cart: Array<CartDataItem | number>;
  shipping_type_id?: number;
  payment_method_id?: number;
}

export interface CartGetPositionItem {
  offer: OfferModel;
  product: ProductItem;
  price: string;
  currency: string;
  total: string;
  total_value: number;
  quantity: number;
  price_per_unit_value: number;
  price_per_unit: string;
}

export interface CartGetPositionCollection {
  positions: CartGetPositionItem[];
  currency: string;
  total: string;
  total_value: number;
}
