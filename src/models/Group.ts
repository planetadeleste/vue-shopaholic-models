import BaseApiModel from "@bit/planetadeleste.shopaholic.models.base-api-model";
import { Group as GroupModel } from "@bit/planetadeleste.shopaholic.types.group"

export default class Group extends BaseApiModel implements GroupModel {
    id!: number;
    name!: string;
    code!: string;
    description?: string;
    created_at?: string;
    updated_at?: string;
    text!: string;
    value!: number;

    resource() {
        return "groups";
    }
}
