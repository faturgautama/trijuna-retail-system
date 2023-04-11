import { HttpRequestBaseModel } from "../shared/http-request-base.model"

export namespace SetupMerkModel {
    export interface ISetupMerk {
        id_merk: number
        merk: string
        is_active: number
        created_by: number
        updated_by: number
        created_at: string
        updated_at: string
    }

    export interface SaveSetupMerk {
        merk: string
    }

    export interface UpdateSetupMerk {
        id_merk: string
        merk: string
    }

    export class GetAllSetupMerk implements HttpRequestBaseModel {
        success: boolean;
        message: string;
        data: ISetupMerk[];

        constructor(
            success: boolean,
            message: string,
            data: ISetupMerk[],
        ) {
            this.success = success;
            this.message = message;
            this.data = data;
        }
    }
}