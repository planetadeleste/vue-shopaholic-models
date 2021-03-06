import { Model as BaseModel, Constructor, ThisClass } from "vue-api-query";
import { AxiosRequestConfig } from "axios";
import { VuexModule } from "vuex-module-decorators";
import { objectToFormData } from "object-to-formdata";
import {
  ApiListResponse,
  ApiIndexResponse,
} from "@bit/planetadeleste.shopaholic.types.api";
import { Result } from "@bit/planetadeleste.shopaholic.types.base";
import _ from "lodash";

// @ts-ignore
export default class Model extends BaseModel {
  // ["constructor"]!: typeof BaseModel;

  baseURL() {
    return "";
  }

  static $flashModule?: VuexModule;
  static $loadingModule?: VuexModule;
  static $authModule?: VuexModule;

  get flashModule() {
    return Model.$flashModule;
  }

  get loadingModule() {
    return Model.$loadingModule;
  }

  get authModule() {
    return Model.$authModule;
  }

  async request(config: AxiosRequestConfig) {
    if (config.method == "PUT") {
      config.method = "POST";
      config.data._method = "PUT";
    }

    config.data = this.toPlainObject(config.data);

    if (this.hasFileUpload(config.data)) {
      config.data = objectToFormData(config.data, {
        indices: true,
      });
    }

    if (!this.hideLoading && this.loadingModule) {
      _.invoke(this.loadingModule, "loading");
    }

    const response = await this.$http.request(config);

    if (this.loadingModule) {
      _.invoke(this.loadingModule, "loaded");
    }

    return response;
  }

  /**
   * Iterates over elements of data to find instaceof File
   *
   * @param {Object} data
   * @returns {Boolean}
   */
  private hasFileUpload(data: any): boolean {
    let hasFile = false;

    if (data instanceof File) {
      return true;
    }

    if (_.isArray(data) || _.isObject(data)) {
      _.forEach(data, (item: any) => {
        if (this.hasFileUpload(item)) {
          hasFile = true;
        }
      });
    } else if (data instanceof File) {
      hasFile = true;
    }

    return hasFile;
  }

  /**
   * Prevent global loading
   */
  preventLoading() {
    this.hideLoading = true;

    return this;
  }

  /**
   * Show global loading
   */
  showLoading<T extends Model>(this: T): T {
    this.hideLoading = false;

    return this;
  }

  get hideLoading(): boolean {
    return _.get(this, "_hideLoading", false);
  }

  set hideLoading(value) {
    _.set(this, "_hideLoading", value);
  }

  /**
   * Like hasMany, but without primary key
   */
  hasManyWithoutKey<T extends Model>(model: Constructor<T>): T {
    const instance = new model();
    const url = `${this.baseURL()}/${this.resource()}/${instance.resource()}`;

    instance._from(url);

    return instance;
  }

  /**
   * Reload model data
   */
  async reload<T extends Model>(this: T): Promise<T> {
    if (!this.hasId()) {
      throw new Error("You must specify the identified param.");
    }

    const response = this.$find(this.getPrimaryKey());
    if (response && _.has(response, "id")) {
      _.assignIn(this, response);
    }

    return this;
  }

  list<T extends Model>(this: T): T {
    return this.custom(`${this.resource()}/list`);
  }

  static list() {
    return this.instance().list();
  }

  static instance<T extends Model>(this: Constructor<T>, data?: Record<string, any> | T): T {
    if (_.isUndefined(data)) {
      return new this();
    }

    return data instanceof this ? data : new this(data);
  }

  async save(): Promise<Result | undefined> {
    try {
      // @ts-ignore
      return await super.save().then((response: Result) => {
        const model = response.data;
        this.applyMutations(model);

        return response;
      });
    } catch (error) {
      this.catchError(error);
    }
    return undefined;
  }

  async find<T extends BaseModel>(id: number | string): Promise<T | undefined> {
    try {
      // @ts-ignore
      return await super.find(id).then((response: ApiListResponse) => {
        const model = response.data || response;
        return this.applyMutations(model);
      });
    } catch (error) {
      this.catchError(error);
    }
  }

  async first<T extends BaseModel>(): Promise<T | undefined> {
    try {
      // @ts-ignore
      return await super.first().then((response: ApiListResponse) => {
        const model = response.data || response;
        return this.applyMutations(model);
      });
    } catch (error) {
      this.catchError(error);
    }
  }

  async get<T extends BaseModel>(): Promise<T[] | any | undefined> {
    try {
      // @ts-ignore
      return await super.get().then((response: ApiIndexResponse) => {
        const models = response.data || response;
        models.forEach((model: Model) => {
          model = this.applyMutations(model);
        });

        if (response.data) {
          response.data = models;
        }

        return response;
      });
    } catch (error) {
      this.catchError(error);
    }
  }

  filterBy<T extends Model>(this: T, filters: object): T {
    if (_.isEmpty(filters) || !_.isPlainObject(filters)) {
      return this;
    }

    if (!_.isObject(this._builder.payload)) {
      this._builder.payload = {};
    }

    if (!_.has(this._builder.payload, "filters")) {
      this._builder.payload.filters = {};
    }

    if (_.has(filters, "filters")) {
      filters = _.get(filters, "filters");
    }

    _.assign(this._builder.payload.filters, filters);

    return this;
  }

  orderBy<T extends BaseModel>(
    this: T,
    sColumn: string,
    sDirection: string = "asc"
  ): T {
    const arSorts = this._builder.sorts;
    arSorts.push(JSON.stringify({ column: sColumn, direction: sDirection }));

    return this;
  }

  toPlainObject(obj: any = this): object {
    if (_.isEmpty(obj)) {
      return obj;
    }

    if (_.isArray(obj)) {
      return _.map(obj, (innerObj) => this.toPlainObject(innerObj));
    }

    if (_.isPlainObject(obj)) {
      return _.chain(obj)
        .pickBy((item, key) => {
          return !_.isFunction(item) && key !== "_builder";
        })
        .mapValues((val) => this.toPlainObject(val))
        .value();
    }

    if (_.isObject(obj)) {
      if (obj instanceof File) {
        return obj;
      }

      return this.toPlainObject(_.toPlainObject(obj));
    }

    return obj;
  }

  private applyMutations<T extends Model>(this: T, model: T | Record<string, any>): T {
    if (_.isPlainObject(model)) {
      // @ts-ignore
      model = new this.constructor(model);
    }

    Object.keys(model.mutations || {}).forEach((propKey) => {
      if (!_.has(model, propKey)) {
        return;
      }

      const ModelForKey = _.get(model.mutations, propKey, undefined);
      const obModelData = _.get(model, propKey, undefined);

      if (_.isUndefined(obModelData)) {
        return;
      }

      if (_.isArray(obModelData)) {
        // @ts-ignore
        obModelData.forEach((item: any, i: number) => {
          const modelData = _.get(obModelData, i);
          if (!_.isUndefined(modelData)) {
            _.set(model, `${propKey}[${i}]`, new ModelForKey(modelData));
          }

          this.applyMutations(_.get(model, `${propKey}[${i}]`));
        });
      } else {
        _.set(model, `${propKey}`, new ModelForKey(obModelData));
        this.applyMutations(_.get(model, `${propKey}`));
      }
    });

    // @ts-ignore
    return model;
  }

  private catchError(error: unknown) {
    if (this.loadingModule) {
      _.invoke(this.loadingModule, "loaded");
    }

    let message = this.syncErrors(error);

    if (!message || _.isEmpty(message) || !this.flashModule) {
      return;
    }

    if (message === "invalid_credentials") {
      message = "Usuario/Email o clave incorrectos";
    }

    _.invoke(this.flashModule, "error", message);

    return;
  }

  private syncErrors(error: any): null | string {
    if (_.isUndefined(error)) {
      return null;
    }

    if (error instanceof Error) {
      const message = error.message;
      if (this.isJSON(message)) {
        return this.syncErrors(JSON.parse(message));
      }

      return message;
    } else if (_.has(error, "response.data")) {
      const data = _.get(error, "response.data");

      if (_.has(data, "errors")) {
        return _.isArray(data.errors) ? _.first(data.errors) : data.errors;
      } else if (_.has(data, "error")) {
        return data.error;
      }
    } else if (_.has(error, "message")) {
      return _.get(error, "message");
    } else if (_.has(error, "error")) {
      return _.get(error, "error");
    }

    return error;
  }

  private isJSON(str: string): boolean {
    try {
      return JSON.parse(str) && !!str;
    } catch (e) {
      return false;
    }
  }
}
