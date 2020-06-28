import { Model, ThisClass } from "vue-api-query";
import { CategoryListItem } from "./@types/category";
import { OCFileData, Result } from "./@types/base";
import { UserRegisterOptions, VendorData, UserData } from "./@types/user";
import { ResponseLogin } from "./@types/api";
import { UserAddressType, UserAddressData } from "./@types/user-address";

import { VuexModule } from "vuex-module-decorators";

declare module "vue-shopaholic-models" {
  export class BaseApiModel extends Model {
    static $flashModule?: VuexModule;
    static $loadingModule?: VuexModule;
    static $authModule?: VuexModule;

    get flashModule(): VuexModule | undefined;
    get loadingModule(): VuexModule | undefined;
    get authModule(): VuexModule | undefined;
    get hideLoading(): boolean;

    set hideLoading(value: boolean);

    preventLoading<T extends BaseApiModel>(): T;
    showLoading<T extends BaseApiModel>(): T;
    hasManyWithoutKey<T extends BaseApiModel>(model: ThisClass<T>): T;
    filterBy<T extends BaseApiModel>(filters: object): T;
    toPlainObject(): object;
  }

  export class Category extends BaseApiModel {
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

    byActive<T extends BaseApiModel>(): T;
    byTree<T extends BaseApiModel>(): T;

    static tree(): Promise<any>;
  }

  export class Product extends BaseApiModel {
    id?: number;
    category?: Category;
    images?: OCFileData[];
    slug?: string;
    category_id?: number;
    category_name?: string;
    offers?: Offer[];
    preview_image?: string;
    preview_text?: string;
    created_at?: string;
    updated_at?: string;
    text?: string;
    value?: number;
    active?: boolean;
    external_id?: string;
    description?: string;
    secondary_thumb?: string;
    thumbnail?: string;
    name?: string;
    code?: string;

    byActive<T extends BaseApiModel>(): T;
  }

  export class Event extends Product {}

  export class Offer extends BaseApiModel {
    id?: number;
    name?: string;
    code?: string;
    price?: string;
    price_value?: number;
    old_price?: string;
    old_price_value?: number;
    quantity?: number;
    currency?: string;
    preview_text?: string;
    thumbnail?: string;
    text?: string;
    value?: number;
    active?: number;
    description?: string;
    preview_image?: string;
    images?: OCFileData[];
    property?: any[];
  }

  export class User extends BaseApiModel {
    groups?: string[];
    id?: number;
    email?: string;
    name?: string;
    last_name?: string | undefined;
    middle_name?: string | undefined;
    phone?: string | undefined;
    phone_list?: string[] | undefined;
    socialite_token?: string[] | undefined;
    avatar?: string | undefined;
    property?: any[] | undefined;
    address?: UserAddress[];
    vendor?: VendorData;

    get full_name(): string;

    loadAvatar(): Promise<void>;
    reload<T extends BaseApiModel>(): Promise<T>;
    login(login: string, password: string): Promise<ResponseLogin>;
    logout(): Promise<ResponseLogin | undefined>;
    register(params: UserRegisterOptions): Promise<ResponseLogin>;
    update(): Promise<UserData>;
    store(): void;

    static loadAvatar(): Promise<void>;
  }

  export class UserAddress extends BaseApiModel {
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

    get flatAddress(): string;

    add(): Promise<Result>;
    update(): Promise<Result>;
    post(path: string): Promise<UserAddressData>;
  }
}
