import { ElementItem, BaseModel, OCFileData } from "@bit/planetadeleste.shopaholic.types.base";

/**
 * Category List item
 */
export interface CategoryListItem extends ElementItem {
  slug: string;
  children?: CategoryListItem[];
  images?: OCFileData[];
}

/**
 * Category model
 */
export interface CategoryModel extends CategoryListItem, BaseModel {}
