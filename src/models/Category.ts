import BaseApiModel from "./BaseApiModel";
import { CategoryListItem } from '@/@types/category';
import { OCFileData } from '@/@types/base';

export default class Category extends BaseApiModel {
  id?: number;
  name?: string;
  code?: string;
  slug?: string;
  preview_image?: string;
  images?: OCFileData[];
  text?: string;
  preview_text?: string;
  value?: number;
  created_at?: string;
  updated_at?: string;
  description?: string;
  active?: boolean;
  external_id?: string;
  children?: CategoryListItem[];

  resource() {
    return "categories";
  }

  static async tree() {
    const self = this.instance();

    return self
      .custom(`${self.resource()}/tree`)
      .get()
      .then(response => response.data || response);
  }

  byActive() {
    return this.filterBy({ active: 1 });
  }

  byTree() {
    return this.filterBy({ tree: 1 });
  }
}
