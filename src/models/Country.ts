import BaseApiModel from "@bit/planetadeleste.shopaholic.models.base-api-model";

export default class Country extends BaseApiModel {
  id!: number;
  name!: string;
  code!: string;
  is_pinned!: boolean;
  is_enabled!: boolean;

  resource() {
    return "countries";
  }
}
