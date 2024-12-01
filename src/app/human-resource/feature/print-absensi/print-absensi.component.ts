import { Component, HostListener, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/@core/service/authentication/authentication.service';
import { AbsensiService } from 'src/app/@core/service/human-resource/absensi/absensi.service';
import { MutasiKeluarService } from 'src/app/@core/service/inventory/mutasi-keluar/mutasi-keluar.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { PrintOutGridModel } from 'src/app/@shared/models/components/print-out-grid.model';

@Component({
    selector: 'app-print-absensi',
    templateUrl: './print-absensi.component.html',
    styleUrls: ['./print-absensi.component.scss']
})
export class PrintAbsensiComponent implements OnInit {

    UserData: any = this._authenticationService.userData;

    Data: any;

    GridProps: PrintOutGridModel.IGrid;

    Date = new Date();

    StartDate = "";

    EndDate = "";

    @HostListener('window:afterprint', ['$event'])
    onAfterPrint(event: Event) {
        window.history.back();
    }

    constructor(
        private _router: Router,
        public _utilityService: UtilityService,
        private _activatedRoute: ActivatedRoute,
        private _absensiService: AbsensiService,
        private _authenticationService: AuthenticationService,
    ) {
        this.GridProps = {
            id: 'print-out-master-barang',
            column: [
                { field: 'nama_karyawan', headerName: 'Nama Pegawai', width: '25%' },
                { field: 'tanggal', headerName: 'Tanggal', width: '15%' },
                { field: 'masuk1', headerName: 'Jam Masuk 1', width: '15%' },
                { field: 'keluar1', headerName: 'Jam Keluar 1', width: '15%' },
                { field: 'masuk2', headerName: 'Jam Masuk 2', width: '15%' },
                { field: 'keluar2', headerName: 'Jam Keluar 2', width: '15%' },
            ],
            dataSource: [],
            height: "100%",
            showPaging: false,
        };
    }

    ngOnInit(): void {
        const id_karyawan = this._activatedRoute.snapshot.params['id_karyawan'],
            start = this._activatedRoute.snapshot.params['start'],
            end = this._activatedRoute.snapshot.params['end'],
            url = this._router.url,
            isExportPdf = url.includes('export-pdf');

        this.StartDate = start;
        this.EndDate = end;

        this.getDetail(start, end, id_karyawan, isExportPdf);
    }

    getDetail(start: any, end: any, id_karyawan: any, exportPdf: boolean) {
        this._absensiService
            .getAll(start, end, id_karyawan)
            .subscribe((result) => {
                this.Data = result.data.data.length ? result.data.data[0] : null;

                console.log("data =>", this.Data);

                this.GridProps.dataSource = result.data.data;

                if (!exportPdf) {
                    setTimeout(() => {
                        window.print();
                    }, 1500);
                } else {
                    setTimeout(() => {
                        this._utilityService.exportToPdf('printMutasiKeluar', `Absensi - ${this.Data.nama_karyawan} - ${this.StartDate} s/d ${this.EndDate}`);
                    }, 500);
                }
            })
    }

}
