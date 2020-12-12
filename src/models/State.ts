import BaseApiModel from "@bit/planetadeleste.shopaholic.models.base-api-model";
import Country from "@bit/planetadeleste.shopaholic.models.country";
import Town from "@bit/planetadeleste.shopaholic.models.town";

export default class State extends BaseApiModel {
  id!: number;
  country_id!: number;
  name!: string;
  code!: string;
  is_default!: boolean;

  resource() {
    return "states";
  }

  get mutations() {
    return {
      country: Country
    };
  }

  towns() {
    return this.hasMany(Town);
  }
}
