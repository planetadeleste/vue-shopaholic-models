import BaseApiModel from "@bit/planetadeleste.shopaholic.models.base-api-model";
import CategoryModel from "@bit/planetadeleste.shopaholic.models.category";
import Offer from "@bit/planetadeleste.shopaholic.models.offer";
import { OCFileData } from "@bit/planetadeleste.shopaholic.types.base";

export default class Product extends BaseApiModel {
  id!: number;
  category!: CategoryModel;
  images!: OCFileData[];
  slug!: string;
  category_id!: number;
  category_name!: string;
  offers!: Offer[];
  preview_image!: string;
  preview_text!: string;
  created_at!: string;
  updated_at!: string;
  text!: string;
  value!: number;
  active!: boolean;
  external_id!: string;
  description!: string;
  secondary_thumb?: string;
  thumbnail?: string;
  name!: string;
  code!: string;

  resource() {
    return "products";
  }

  primaryKey() {
    return "slug";
  }

  byActive() {
    return this.filterBy({ active: 1 });
  }

  get mutations() {
    return {
      category: CategoryModel
    };
  }
}
