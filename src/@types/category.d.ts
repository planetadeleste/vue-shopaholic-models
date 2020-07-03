import { ElementItem, BaseModel } from "./base";

/**
 * Category List item
 */
export interface CategoryListItem extends ElementItem {
  slug: string;
  children: CategoryListItem[];
}

/**
 * Category model
 */
export interface CategoryModel extends CategoryListItem, BaseModel {}
