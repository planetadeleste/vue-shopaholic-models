import BaseApiModel from "@bit/planetadeleste.shopaholic.models.base-api-model";
import State from '@bit/planetadeleste.shopaholic.models.state';

export default class Country extends BaseApiModel {
  id!: number;
  name!: string;
  code!: string;
  is_pinned!: boolean;
  is_enabled!: boolean;
  is_default!: boolean;
  states!: State[];

  resource() {
    return "countries";
  }

}
