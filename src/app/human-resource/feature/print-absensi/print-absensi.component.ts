import { formatDate } from '@angular/common';
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
            id: 'print-out-absensi',
            column: [
                { field: 'no_urut', headerName: 'No.', width: '5%' },
                { field: 'nama_karyawan', headerName: 'Nama Pegawai', width: '25%' },
                { field: 'tanggal', headerName: 'Tanggal', width: '14%' },
                { field: 'masuk1', headerName: 'Jam Masuk 1', width: '14%' },
                { field: 'keluar1', headerName: 'Jam Keluar 1', width: '14%' },
                { field: 'masuk2', headerName: 'Jam Masuk 2', width: '14%' },
                { field: 'keluar2', headerName: 'Jam Keluar 2', width: '14%' },
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
                this.GridProps.dataSource = result.data.data.map((item: any, index: number) => {
                    return {
                        ...item,
                        no_urut: index + 1,
                        masuk1: item.masuk1 ? item.masuk1.split(" ")[1] : '-',
                        masuk2: item.masuk2 ? item.masuk2.split(" ")[1] : '-',
                        keluar1: item.keluar1 ? item.keluar1.split(" ")[1] : '-',
                        keluar2: item.keluar2 ? item.keluar2.split(" ")[1] : '-',
                    }
                });

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
