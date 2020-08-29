import BaseApiModel from "@bit/planetadeleste.shopaholic.models.base-api-model";
import Country from "@bit/planetadeleste.shopaholic.models.country";

export default class State extends BaseApiModel {
  id!: number;
  country_id!: number;
  name!: string;
  code!: string;

  resource() {
    return "states";
  }

  get mutations() {
    return {
      country: Country,
    };
  }
}