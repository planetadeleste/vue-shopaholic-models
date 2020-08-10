import { ElementItem, BaseModel, OCFileData } from "@bit/planetadeleste.shopaholic.types.base";
import { OfferModel } from "@bit/planetadeleste.shopaholic.types.offer";
import { CategoryListItem } from "@bit/planetadeleste.shopaholic.types.category";

/**
 * Product list item
 */
export interface ProductItem extends ElementItem {
  slug: string;
  category_id: number;
  category_name: string;
  thumbnail?: string;
  secondary_thumb?: string;
  offers: Array<OfferModel>;
}

/**
 * Product model
 */
export interface ProductModel extends ProductItem, BaseModel {
  category: CategoryListItem;
  images: OCFileData[];
}
