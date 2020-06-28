// @ts-nocheck

import BaseApiModel from "./BaseApiModel";
import { UserAddressType } from '@/@types/user-address';
import { Result } from '@/@types/base';
import _ from "lodash";

export default class UserAddress extends BaseApiModel {
  [x: string]: any;
  id?: number;
  user_id?: number;
  type?: UserAddressType;
  country?: string;
  state?: string;
  city?: string;
  city_id?: number;
  street?: string;
  street_id?: number;
  house?: string;
  building?: string;
  flat?: string;
  floor?: string;
  address1?: string;
  address2?: string;
  postcode?: string;

  resource() {
    return "profile/address";
  }

  async post(path: string) {
    try {
      const response = await this.request({
        method: "POST",
        url: `${this.resource()}/${path}`,
        data: this
      }).then(response => response.data);

      return response;
    } catch (error) {
      return _.get(error, "response.data", error);
    }
  }

  async add(): Promise<Result> {
    return await this.post("add");
  }

  async update(): Promise<Result> {
    return await this.post("update");
  }

  get flatAddress() {
    const arAddress = [
      this.street,
      this.address1,
      this.city,
      this.state,
      this.country
    ];
    return _.chain(arAddress)
      .compact()
      .join(", ")
      .value();
  }
}
