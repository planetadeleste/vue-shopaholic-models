import { ProductModel } from "@bit/planetadeleste.shopaholic.types.product";

export interface EventModel {
    id: number;
    country_id: number;
    product_id: number;
    state_id: number;
    town_id: number;
    days_before_close: number;
    days_before_open: number;
    event_at: string;
    product: ProductModel;
}