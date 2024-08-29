import { HttpRequestBaseModel } from "../../shared/http-request-base.model"

export namespace SetupUserGroupModel {
    export interface ISetupUserGroup {
        id_group: number
        group_name: string
        is_active: boolean
        created_by: number
        updated_by: number
        created_at: string
        updated_at: string
    }

    export interface SaveSetupUserGroup {
        group_name: string
    }

    export interface UpdateSetupUserGroup {
        group_name: string
    }

    export class GetAllSetupUserGroup implements HttpRequestBaseModel {
        success: boolean;
        message: string;
        data: ISetupUserGroup[];

        constructor(
            success: boolean,
            message: string,
            data: ISetupUserGroup[],
        ) {
            this.success = success;
            this.message = message;
            this.data = data;
        }
    }
}