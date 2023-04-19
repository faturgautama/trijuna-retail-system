import { PembelianDenganPoState } from "./pembelian-dengan-po";
import { PembelianTanpaPoState } from "./pembelian-tanpa-po";
import { PemesananPoState } from "./pemesanan-po";

export const PEMBELIAN_STATE = [
    PemesananPoState,
    PembelianDenganPoState,
    PembelianTanpaPoState,
]