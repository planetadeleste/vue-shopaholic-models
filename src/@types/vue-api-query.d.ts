declare module "vue-api-query" {
  import { AxiosInstance, AxiosRequestConfig, AxiosPromise } from "axios";

  type ThisClass<InstanceType extends Model> = {
    new (...args: any[]): InstanceType;
  };
  type Constructor<T> = new (...args: any[]) => T;

  interface Class<T> {
    super(...args: any[]): T;
  }

  export class StaticModel {
    static instance<T extends StaticModel>(this: T): T;
    static include<T extends StaticModel>(...args: any[]): T;
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
    append(...args: any[]): this;
    custom(...args: any[]): this;
    include(...args: any[]): this;
    select(...args: any[]): this;
    orderBy(...args: any[]): this;
    where(field: string, value: any): this;
    whereIn(field: string, array: any[]): this;
    limit<T extends Model>(this: ThisClass<T>, value: number): T;
    page(value: number): this;
    params<T extends Model>(this: ThisClass<T>, payload: LooseObject): T;
    for(...args: any[]): this;
    hasMany<T>(model: T): T;

    // filterBy<T extends Model>(this: ThisClass<T>, filters: object): T;

    /**
     * Results
     */
    $find(identifier: number | string): any;
    $first(): any;
    $get(): any;
    find<T extends Model>(
      this: ThisClass<T>,
      identifier: number | string
    ): Promise<T | undefined>;
    first<T extends Model>(this: ThisClass<T>): Promise<T | undefined>;
    get<T extends Model>(this: ThisClass<T>): Promise<T[] | undefined>;
    delete(): Promise<any>;
    save<T extends Model>(this: ThisClass<T>): Promise<T | undefined>;
    attach(params: object): Promise<any>;
    sync(params: object): Promise<any>;

    /**
     * Helpers
     */
    hasId(): boolean;
    isValidId(id: any): boolean;

    parameterNames(): any;

    static $find(id: number | string): any;
    static $first(): any;
    static $get(): any;
    static append(...args: any[]): Model;
    static custom<T extends Model>(this: ThisClass<T>, ...args: any[]): T;
    static find<T extends Model>(this: ThisClass<T>, id: number | string): T;
    static first<T extends Model>(this: ThisClass<T>): T;
    static get(): any;
    // static include(...args: any[]): Model;
    // static instance<T extends Model>(this: ThisClass<T>): T;
    static limit<T extends Model>(this: ThisClass<T>, value: any): T;
    static orderBy(...args: any[]): Model;
    static page(value: any): Model;
    static params<T extends Model>(this: ThisClass<T>, payload: LooseObject): T;
    static select(...args: any[]): Model;
    static where(field: string, value: any): Model;
    static whereIn(field: string, array: any[]): Model;
  }

  export class Builder {
    /**
     *
     * @param model
     */
    constructor(model: any): Builder;

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
