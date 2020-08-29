// @ts-nocheck

import BaseApiModel from "@bit/planetadeleste.shopaholic.models.base-api-model";
import Vue from "vue";
import UserAddress from "@bit/planetadeleste.shopaholic.models.user-address";
import { UserRegisterOptions, VendorData, UserModel } from "@bit/planetadeleste.shopaholic.types.user";
import _ from "lodash";
import { Result } from '@bit/planetadeleste.shopaholic.types.base';

export default class User extends BaseApiModel implements UserModel {
  groups!: string[];
  id!: number;
  email!: string;
  name!: string;
  last_name?: string | undefined;
  middle_name?: string | undefined;
  phone?: string | undefined;
  phone_list?: string[] | undefined;
  socialite_token?: string[] | undefined;
  avatar?: string | undefined;
  property?: any[] | undefined;
  address?: UserAddress[];
  vendor?: VendorData;
  role?: string;

  resource() {
    return "users";
  }

  hidden() {
    return ["password", "password_confirmation", "_method"];
  }

  get mutations() {
    return { address: UserAddress };
  }

  get fullName() {
    return _.chain([this.name, this.middle_name, this.last_name])
      .compact()
      .join(" ")
      .value();
  }

  async loadAvatar(): Promise<void> {
    const response = await this.request({
      url: `${this.resource()}/avatar`,
      method: "GET"
    }).then(response => response.data);

    if (response.status && response.data.avatar) {
      _.assignIn(this, { avatar: response.data.avatar });
    }

    this.store();
  }

  static async loadAvatar() {
    await this.instance().loadAvatar();
  }

  async reload<T extends BaseApiModel>(this: T): Promise<T> {
    const response = await User.first();
    if (response) {
      _.assignIn(this, response);
      this.store();
    }

    return this;
  }

  async login(login: string, password: string): Promise<Result> {
    try {
      const response: Result = await this.request({
        method: "POST",
        url: "auth/login",
        data: { email: login, password: password }
      }).then(response => response.data);

      if (!response.status || !response) {
        return response;
      }

      if (response.data.user) {
        _.assignIn(this, response.data.user);
      }

      return _.pick(response.data, ["token", "expires_in"]);
    } catch (error) {
      return _.get(error, "response.data", error);
    }
  }

  async logout(): Promise<Result | undefined> {
    try {
      if (!localStorage.getItem("access_token")) {
        return;
      }

      const response: Result = await this.request({
        method: "POST",
        url: "auth/invalidate",
        data: {
          token: localStorage.getItem("access_token")
        }
      }).then(response => response.data);

      if (response.status) {
        localStorage.clear();
        if (this.authModule) {
          _.invoke(this.authModule, "logout");
        }
      }

      return response;
    } catch (error) {
      return _.get(error, "response.data", error);
    }
  }

  async register(params: UserRegisterOptions): Promise<Result> {
    try {
      const response: Result = await this.request({
        method: "POST",
        url: "auth/register",
        data: params
      }).then(response => response.data);

      if (!response.status || !response) {
        return response;
      }

      if (response.user) {
        _.assignIn(this, response.user);
      }
      return _.pick(response, ["token", "expires_in"]);
    } catch (error) {
      return _.get(error, "response.data", error);
    }
  }

  async update() {
    try {
      const response = await this.request({
        method: "PUT",
        url: this.endpoint(),
        data: this.toPlainObject()
      }).then(response => response.data);

      if (_.has(response, "data")) {
        _.assignIn(this, response.data);
        this.store();
      }

      return response;
    } catch (error) {
      return _.get(error, "response.data", error);
    }
  }

  store(): void {
    const obUser = this.toPlainObject();
    const sUser = JSON.stringify(_.omit(obUser, this.hidden()));
    localStorage.setItem("user", sUser);
    Vue.prototype.$user.set(this);

    if (this.authModule) {
      _.invoke(this.authModule, "loginSuccess", this);
    }
  }
}
