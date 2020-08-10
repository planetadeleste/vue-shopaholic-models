declare module "vue-api-query" {
  import { Result } from "@bit/planetadeleste.shopaholic.types.base";
  import { AxiosInstance, AxiosRequestConfig, AxiosPromise } from "axios";

  type ThisClass<InstanceType extends Model> = {
    new (...args: any[]): InstanceType;
  };
  type Constructor<T> = new (...args: any[]) => T;

  interface Class<T> {
    super(...args: any[]): T;
  }

  abstract class StaticModel {
    static instance<T extends StaticModel>(this: T, data?: object | T): T;
    static include<T extends StaticModel>(...args: any[]): T;

    static $find(id: number | string): any;
    static $first(): any;
    static $get(): any;

    static append<T extends StaticModel>(...args: any[]): T;
    static custom<T extends StaticModel>(this: T, ...args: any[]): T;
    static find<T extends StaticModel>(
      this: T,
      id: number | string
    ): Promise<T | undefined>;
    static first<T extends StaticModel>(this: T): T;
    static get(): any;
    static limit<T extends StaticModel>(this: T, value: any): T;
    static orderBy<T extends StaticModel>(this: T, sColumn: string, sDirection?: string): T;
    static page<T extends StaticModel>(value: any): T;
    static params<T extends Model>(this: T, payload: LooseObject): T;
    static select<T extends StaticModel>(...args: any[]): T;
    static where<T extends StaticModel>(field: string, value: any): T;
    static whereIn<T extends StaticModel>(field: string, array: any[]): T;
  }

  export class Model extends StaticModel {
    constructor(...args: any[]);
    super: Constructor<this>;

    static $http: AxiosInstance;
    $http: AxiosInstance;
    mutations?: object;
    _builder: Builder;

    /**
     * Settings
     */
    endpoint(): string;
    resource(): string;
    primaryKey(): string;
    getPrimaryKey(): string;
    baseURL(): string;
    request(config: AxiosRequestConfig): AxiosPromise<any>;
    _from(url: string): void;

    /**
     * Query
     */
    append<T extends Model>(this: T,...args: any[]): T;
    custom<T extends Model>(this: T,...args: any[]): T;
    include<T extends Model>(this: T,...args: any[]): T;
    select<T extends Model>(this: T,...args: any[]): T;
    orderBy<T extends Model>(this: T, sColumn: string, sDirection?: string): T;
    where<T extends Model>(this: T, field: string, value: any): T;
    whereIn<T extends Model>(this: T, field: string, array: any[]): T;
    limit<T extends Model>(this: T, value: number): T;
    page<T extends Model>(this: T, value: number): T;
    params<T extends Model>(this: T, payload: LooseObject): T;
    for<T extends Model>(this: T,...args: any[]): T;
    hasMany<T>(model: T): T;

    // filterBy<T extends Model>(this: ThisClass<T>, filters: object): T;

    /**
     * Results
     */
    $find(identifier: number | string): any;
    $first(): any;
    $get(): any;

    find<T extends Model>(
      this: T,
      identifier: number | string
    ): Promise<T | undefined>;
    first<T extends Model>(this: T): Promise<T | undefined>;
    get<T extends Model>(this: T): Promise<T[] | any | undefined>;
    delete(): Promise<Result>;
    save<T extends Model>(this: T): Promise<T | undefined | Result>;
    attach(params: object): Promise<any>;
    sync(params: object): Promise<any>;

    /**
     * Helpers
     */
    hasId(): boolean;
    isValidId(id: any): boolean;

    parameterNames(): any;
  }

  export class Builder {
    /**
     *
     * @param model
     */
    constructor(model: any);

    /**
     * query string parsed
     */
    query(): void;

    /**
     * Query builder
     * @param ...args
     * @return
     */
    include(...args: any): /* Builder.prototype.+Builder */ any;

    /**
     *
     * @param ...args
     * @return
     */
    append(...args: any): /* !this */ any;

    /**
     *
     * @param ...fields
     * @return
     */
    select(...fields: any): /* !this */ any;

    /**
     *
     * @param key
     * @param value
     * @return
     */
    where(key: any, value: any): /* !this */ any;

    /**
     *
     * @param key
     * @param array
     * @return
     */
    whereIn(key: any, array: any): /* !this */ any;

    /**
     *
     * @param ...args
     * @return
     */
    orderBy(...args: any): /* !this */ any;

    /**
     *
     * @param value
     * @return
     */
    page(value: any): /* !this */ any;

    /**
     *
     * @param value
     * @return
     */
    limit(value: any): /* !this */ any;

    /**
     *
     * @param payload
     * @return
     */
    params(payload: any): /* !this */ any;

    includes: any[];
    appends: any[];
    sorts: any[];
    fields: object;
    filters: object;
    model: any;
    pageValue: null | number;
    limitValue: null | number;
    payload: any;
    parser: Parser;
  }

  export class Parser {
    /**
     *
     * @param builder
     */
    constructor(builder: any);

    /**
     * final query string
     * @return
     */
    query(): /* !this.uri */ any;

    /**
     * Helpers
     * @return
     */
    hasIncludes(): boolean;

    /**
     *
     * @return
     */
    hasAppends(): boolean;

    /**
     *
     * @return
     */
    hasFields(): boolean;

    /**
     *
     * @return
     */
    hasFilters(): boolean;

    /**
     *
     * @return
     */
    hasSorts(): boolean;

    /**
     *
     * @return
     */
    hasPage(): boolean;

    /**
     *
     * @return
     */
    hasLimit(): boolean;

    /**
     *
     * @return
     */
    hasPayload(): boolean;

    /**
     *
     * @return
     */
    prepend(): string;

    /**
     *
     */
    parameterNames(): void;

    /**
     * Parsers
     */
    includes(): void;

    /**
     *
     */
    appends(): void;

    /**
     *
     */
    fields(): void;

    /**
     *
     */
    filters(): void;

    /**
     *
     */
    sorts(): void;

    /**
     *
     */
    page(): void;

    /**
     *
     */
    limit(): void;

    /**
     *
     */
    payload(): void;
  }

  interface LooseObject {
    [key: string]: any;
  }
}
