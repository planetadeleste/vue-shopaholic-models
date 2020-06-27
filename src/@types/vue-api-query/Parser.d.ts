// Type definitions for node_modules/vue-api-query/src/Parser.js
// Project: [LIBRARY_URL_HERE]
// Definitions by: [YOUR_NAME_HERE] <[YOUR_URL_HERE]>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/**
 *
 */
declare interface Parser {
  /**
   *
   * @param builder
   */
  constructor(builder: any): Parser;

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
