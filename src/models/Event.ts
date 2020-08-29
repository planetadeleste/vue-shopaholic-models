import BaseApiModel from "@bit/planetadeleste.shopaholic.models.base-api-model";
import Product from "@bit/planetadeleste.shopaholic.models.product";
import { ProductModel } from '@bit/planetadeleste.shopaholic.types.product';

export default class Event extends BaseApiModel {
  id!: number;
  country_id!: number;
  product_id!: number;
  state_id!: number;
  town_id!: number;
  days_before_close!: number;
  days_before_open!: number;
  event_at!: string;
  product!: ProductModel;
  
  resource() {
    return "events";
  }

  get mutations() {
    return {
      product: Product
    };
  }
}
