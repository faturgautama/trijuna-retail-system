import { FilterModel } from "src/app/@shared/models/components/filter.model";
import { SetupBarangModel } from "src/app/@shared/models/setup-data/setup-barang.model";

export namespace SetupBarangAction {
    export class GetAllBarang {
        static readonly type = '[SETUP BARANG] Get All';
        constructor(public payload: FilterModel.IDynamicFilter[]) { }
    }

    export class GetAllBarangWithoutFilter {
        static readonly type = '[SETUP BARANG] Get All Without Filter';
    }

    export class GetByIdBarang {
        static readonly type = '[SETUP BARANG] Get By Id';
        constructor(public payload: number) { }
    }

    export class SaveBarang {
        static readonly type = '[SETUP BARANG] Save';
        constructor(public payload: SetupBarangModel.SaveSetupBarang) { }
    }

    export class UpdateBarang {
        static readonly type = '[SETUP BARANG] Update';
        constructor(public payload: SetupBarangModel.UpdateSetupBarang) { }
    }

    export class DeleteBarang {
        static readonly type = '[SETUP BARANG] Delete';
        constructor(public payload: number) { }
    }

    export class UbahStatusActiveBarang {
        static readonly type = '[SETUP BARANG] Ubah Status Active';
        constructor(public payload: number) { }
    }

    // ** Barang Satuan
    export class GetAllBarangSatuan {
        static readonly type = '[SETUP BARANG SATUAN] Get All';
        constructor(public payload: number) { }
    }

    export class GetByIdBarangSatuan {
        static readonly type = '[SETUP BARANG SATUAN] Get By Id';
        constructor(public payload: number) { }
    }

    export class SaveBarangSatuan {
        static readonly type = '[SETUP BARANG SATUAN] Save';
        constructor(public payload: SetupBarangModel.SaveSetupBarangSatuan) { }
    }

    export class UpdateBarangSatuan {
        static readonly type = '[SETUP BARANG SATUAN] Update';
        constructor(public payload: SetupBarangModel.UpdateSetupBarangSatuan) { }
    }

    export class DeleteBarangSatuan {
        static readonly type = '[SETUP BARANG SATUAN] Delete';
        constructor(public payload: number) { }
    }

    // ** Barang Rak
    export class GetAllBarangRak {
        static readonly type = '[SETUP BARANG RAK] Get All';
        constructor(public payload: number) { }
    }

    export class GetByIdBarangRak {
        static readonly type = '[SETUP BARANG RAK] Get By Id';
        constructor(public payload: number) { }
    }

    export class SaveBarangRak {
        static readonly type = '[SETUP BARANG RAK] Save';
        constructor(public payload: SetupBarangModel.SaveSetupBarangRak) { }
    }

    export class UpdateBarangRak {
        static readonly type = '[SETUP BARANG RAK] Update';
        constructor(public payload: SetupBarangModel.UpdateSetupBarangRak) { }
    }

    export class DeleteBarangRak {
        static readonly type = '[SETUP BARANG RAK] Delete';
        constructor(public payload: number) { }
    }

    // ** Barang Komponen
    export class GetAllBarangKomponen {
        static readonly type = '[SETUP BARANG KOMPONEN] Get All';
        constructor(public payload: number) { }
    }

    export class GetByIdBarangKomponen {
        static readonly type = '[SETUP BARANG KOMPONEN] Get By Id';
        constructor(public payload: number) { }
    }

    export class SaveBarangKomponen {
        static readonly type = '[SETUP BARANG KOMPONEN] Save';
        constructor(public payload: SetupBarangModel.SaveSetupBarangKomponen) { }
    }

    export class UpdateBarangKomponen {
        static readonly type = '[SETUP BARANG KOMPONEN] Update';
        constructor(public payload: SetupBarangModel.UpdateSetupBarangKomponen) { }
    }

    export class DeleteBarangKomponen {
        static readonly type = '[SETUP BARANG KOMPONEN] Delete';
        constructor(public payload: number) { }
    }

    // ** Barang Urai
    export class GetAllBarangUrai {
        static readonly type = '[SETUP BARANG URAI] Get All';
        constructor(public payload: number) { }
    }

    export class GetByIdBarangUrai {
        static readonly type = '[SETUP BARANG URAI] Get By Id';
        constructor(public payload: number) { }
    }

    export class SaveBarangUrai {
        static readonly type = '[SETUP BARANG URAI] Save';
        constructor(public payload: SetupBarangModel.SaveSetupBarangUrai) { }
    }

    export class UpdateBarangUrai {
        static readonly type = '[SETUP BARANG URAI] Update';
        constructor(public payload: SetupBarangModel.UpdateSetupBarangUrai) { }
    }

    export class DeleteBarangUrai {
        static readonly type = '[SETUP BARANG URAI] Delete';
        constructor(public payload: number) { }
    }
}