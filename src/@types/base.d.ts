export interface LooseObject {
  [key: string]: any;
}

export interface BaseData {
  id: number;
  name: string;
}

/**
 * Base for list elements
 */
export interface BaseListData {
  text: string;
  value: number;
}

export interface OCFileData {
  thumb: string;
  path: string;
  file_name: string;
  extension: string;
  title: string;
  description: string;
  is_image: boolean;
}

/**
 * Base model
 */
export interface BaseModelData extends BaseListData, BaseData {
  created_at?: string;
  updated_at?: string;
}


/**
 * Base Item
 * @class \Lovata\Toolbox\Classes\Item\ElementItem
 */
export interface ElementItem extends BaseModelData {
  preview_image: string;
  preview_text: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Base Model
 * @class \Model
 */
export interface BaseModel extends BaseModelData {
  active: boolean;
  external_id: string;
  description?: string;
}

/**
 * Result response
 * @class \Kharanenka\Helper\Result
 */
export interface Result {
  status: boolean;
  message: string | null;
  code: string | null;
  data: any;
}
