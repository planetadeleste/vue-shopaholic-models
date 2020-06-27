import BaseApiModel from "./BaseApiModel";
import { OCFileData } from '@/@types/base';

export default class Offer extends BaseApiModel {
  id!: number;
  name!: string;
  code!: string;
  price!: string;
  price_value!: number;
  old_price!: string;
  old_price_value!: number;
  quantity!: number;
  currency!: string;
  preview_text!: string;
  thumbnail!: string;
  text!: string;
  value!: number;
  active!: number;
  description!: string;
  preview_image!: string;
  images!: OCFileData[];
  property!: any[];
}