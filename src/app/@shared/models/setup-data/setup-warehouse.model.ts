import { HttpRequestBaseModel } from "../shared/http-request-base.model"

export namespace SetupWarehouseModel {
    export interface ISetupWarehouse {
        id_warehouse: number
        warehouse: string
        lokasi: string
        is_active: number
        created_by: number
        updated_by: number
        created_at: string
        updated_at: string
    }

    export interface SaveSetupWarehouse {
        warehouse: string
        lokasi: string
    }

    export interface UpdateSetupWarehouse {
        id_warehouse: string
        warehouse: string
        lokasi: string
    }

    export class GetAllSetupWarehouse implements HttpRequestBaseModel {
        success: boolean;
        message: string;
        data: ISetupWarehouse[];

        constructor(
            success: boolean,
            message: string,
            data: ISetupWarehouse[],
        ) {
            this.success = success;
            this.message = message;
            this.data = data;
        }
    }
}