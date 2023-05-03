import { PembelianDenganPoState } from "./pembelian-dengan-po";
import { PembelianTanpaPoState } from "./pembelian-tanpa-po";
import { PemesananPoState } from "./pemesanan-po";
import { PenerimaanKonsinyasiState } from "./penerimaan-konsinyasi";
import { ReturKonsinyasiState } from "./retur-konsinyasi";
import { ReturPembelianState } from "./retur-pembelian";

export const PEMBELIAN_STATE = [
    PemesananPoState,
    PembelianDenganPoState,
    PembelianTanpaPoState,
    PenerimaanKonsinyasiState,
    ReturPembelianState,
    ReturKonsinyasiState,
]