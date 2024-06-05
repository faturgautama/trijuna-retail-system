import { HttpRequestBaseModel } from "../../shared/http-request-base.model"

export namespace SettingDiskonMerkModel {
    export interface ISettingDiskonMerk {
        id_promo_diskon_setting_merk: number
        id_merk: number
        merk: string
    }

    export class GetAllSettingDiskonMerk implements HttpRequestBaseModel {
        success!: boolean
        message!: string
        data!: ISettingDiskonMerk[]
    }

    export interface SaveSettingDiskonMerk {
        id_promo_diskon: number
        id_merk: number
    }
}