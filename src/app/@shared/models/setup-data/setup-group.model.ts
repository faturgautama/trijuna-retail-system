import { HttpRequestBaseModel } from "../shared/http-request-base.model"

export namespace SetupGroupModel {
    export interface ISetupGroup {
        id_group: number
        kode_group: string
        group: string
        is_active: number
        created_by: number
        updated_by: number
        created_at: string
        updated_at: string
    }

    export interface SaveSetupGroup {
        group: string
    }

    export interface UpdateSetupGroup {
        id_group: string
        kode_group: string
        group: string
    }

    export class GetAllSetupGroup implements HttpRequestBaseModel {
        success: boolean;
        message: string;
        data: ISetupGroup[];

        constructor(
            success: boolean,
            message: string,
            data: ISetupGroup[],
        ) {
            this.success = success;
            this.message = message;
            this.data = data;
        }
    }
}