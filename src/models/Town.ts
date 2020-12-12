import BaseApiModel from "@bit/planetadeleste.shopaholic.models.base-api-model";
import State from "@bit/planetadeleste.shopaholic.models.state";

export default class Town extends BaseApiModel {
  id!: number;
  state_id!: number;
  name!: string;
  slug!: string;
  description!: string;
  is_enabled!: boolean;
  state!: State;

  resource() {
    return "towns";
  }

  get mutations() {
    return {
      state: State
    };
  }
}
