// Type definitions for node_modules/vue-api-query/src/Builder.js
// Project: [LIBRARY_URL_HERE]
// Definitions by: [YOUR_NAME_HERE] <[YOUR_URL_HERE]>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/**
 *
 */
export interface Builder {
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
