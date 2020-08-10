import { ElementItem, OCFileData } from "@bit/planetadeleste.shopaholic.types.base";

export interface OfferItem extends ElementItem {
  price: string;
  price_value: number;
  old_price: string;
  old_price_value: number;
  quantity: number;
  currency: string;
  preview_text: string;
  created_at: string;
  updated_at: string;
  thumbnail: string;
  code: string;
}

export interface OfferModel extends OfferItem {
  images: OCFileData[];
  properties: Array<any>;
}
