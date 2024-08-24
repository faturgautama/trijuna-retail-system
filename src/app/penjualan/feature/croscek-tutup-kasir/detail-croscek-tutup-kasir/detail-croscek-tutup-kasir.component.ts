import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CroscekTutupKasirService } from 'src/app/@core/service/penjualan/croscek-tutup-kasir/croscek-tutup-kasir.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { CustomFormComponent } from 'src/app/@shared/components/custom-form/custom-form.component';
import { CustomFormModel } from 'src/app/@shared/models/components/custom-form.model';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';

@Component({
    selector: 'app-detail-croscek-tutup-kasir',
    templateUrl: './detail-croscek-tutup-kasir.component.html',
    styleUrls: ['./detail-croscek-tutup-kasir.component.scss']
})
export class DetailCroscekTutupKasirComponent implements OnInit {

    DashboardProps: DashboardModel.IDashboard;

    GridDetailProps: GridModel.IGrid;

    FormInputHeader: CustomFormModel.IForm;
    @ViewChild('CustomForm') CustomForm!: CustomFormComponent;

    constructor(
        private _router: Router,
        private _messageService: MessageService,
        private _utilityService: UtilityService,
        private _activatedRoute: ActivatedRoute,
        private _croscekTutupKasirService: CroscekTutupKasirService,
    ) {
        this.DashboardProps = {
            title: 'Detail Croscek Tutup Kasir',
            button_navigation: [
                { id: 'back', caption: 'Back', icon: 'pi pi-chevron-left text-xs' },
            ],
        };

        this.GridDetailProps = {
            column: [
                {
                    field: 'nama_payment_method', headerName: 'METODE BAYAR', flex: 200, sortable: true, resizable: true,
                },
                {
                    field: 'nominal', headerName: 'NOMINAL', flex: 200, sortable: true, resizable: true,
                    cellClass: 'text-end',
                    cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') }
                },
                {
                    field: 'nominal_sistem', headerName: 'NOMINAL SISTEM', flex: 200, sortable: true, resizable: true,
                    cellClass: 'text-end',
                    cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') }
                },
                {
                    field: 'selisih', headerName: 'SELISIH', flex: 200, sortable: true, resizable: true,
                    cellClass: 'text-end',
                    cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') }
                },
            ],
            dataSource: [],
            height: "calc(100vh - 21rem)",
            showPaging: true,
        };

        this.FormInputHeader = {
            id: 'form_detail_croscek_tutup_kasir',
            type: 'save',
            is_inline: true,
            fields: [
                {
                    id: 'kasir',
                    label: 'Nama Kasir',
                    status: 'readonly',
                    type: 'string',
                    required: false,
                },
                {
                    id: 'email',
                    label: 'Email Kasir',
                    status: 'readonly',
                    type: 'string',
                    required: false,
                },
                {
                    id: 'tanggal_tutup_kasir',
                    label: 'Tgl. Tutup Kasir',
                    status: 'readonly',
                    type: 'string',
                    required: false,
                },
                {
                    id: 'tanggal_kroscek_tutup_kasir',
                    label: 'Tgl. Kroscek Kasir',
                    status: 'readonly',
                    type: 'string',
                    required: false,
                },
                {
                    id: 'pendapatan_versi_user',
                    label: 'Pdptn Ver User',
                    status: 'readonly',
                    type: 'string',
                    required: false,
                },
                {
                    id: 'pendapatan_versi_system',
                    label: 'Pdptn Ver Sistem',
                    status: 'readonly',
                    type: 'string',
                    required: false,
                },
                {
                    id: 'selisih',
                    label: 'Selisih',
                    status: 'readonly',
                    type: 'string',
                    required: false,
                },
                {
                    id: 'keterangan_tutup_kasir',
                    label: 'Ket Tutup Kasir',
                    status: 'readonly',
                    type: 'string',
                    required: false,
                },
                {
                    id: 'keterangan_kroscek',
                    label: 'Ket Kroscek',
                    status: 'readonly',
                    type: 'string',
                    required: false,
                },
            ],
            custom_class: 'grid-rows-3 grid-cols-3',
        }
    }

    ngOnInit(): void {
        const id_kroscek_tutup_kasir = this._activatedRoute.snapshot.params['id'];
        console.log(id_kroscek_tutup_kasir);
        this.getDetailKroscek(id_kroscek_tutup_kasir);
    }

    private getDetailKroscek(id_kroscek_tutup_kasir: number) {
        this._croscekTutupKasirService
            .getById(id_kroscek_tutup_kasir)
            .subscribe((result) => {
                result.data.pendapatan_versi_user = this._utilityService.FormatNumber(result.data.pendapatan_versi_user, 'Rp. ');
                result.data.pendapatan_versi_system = this._utilityService.FormatNumber(result.data.pendapatan_versi_system, 'Rp. ');
                result.data.selisih = this._utilityService.FormatNumber(result.data.selisih, 'Rp. ');

                this.CustomForm.CustomForms.patchValue(result.data);
                this.GridDetailProps.dataSource = result.data.detail_pendapatan;
            })
    }

    handleClickButtonNav(args: any): void {
        this._router.navigate(['penjualan/croscek-tutup-kasir/history']);
    }

}
