import { HttpRequestBaseModel } from "../../shared/http-request-base.model"

export namespace SettingHadiahMerkModel {
    export interface ISettingHadiahMerk {
        id_promo_hadiah_setting_merk: number
        id_merk: number
        merk: string
    }

    export class GetAllSettingHadiahMerk implements HttpRequestBaseModel {
        success!: boolean
        message!: string
        data!: ISettingHadiahMerk[]
    }

    export interface SaveSettingHadiahMerk {
        id_promo_hadiah_setting_merk: number
        id_merk: number
    }
}