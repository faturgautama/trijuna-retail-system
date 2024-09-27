import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { map } from 'rxjs';
import { FakturPajakPembelianService } from 'src/app/@core/service/finance/faktur-pajak-pembelian/faktur-pajak-pembelian.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { CustomFormComponent } from 'src/app/@shared/components/custom-form/custom-form.component';
import { CustomFormModel } from 'src/app/@shared/models/components/custom-form.model';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';

@Component({
    selector: 'app-detail-faktur-pajak-pembelian',
    templateUrl: './detail-faktur-pajak-pembelian.component.html',
    styleUrls: ['./detail-faktur-pajak-pembelian.component.scss']
})
export class DetailFakturPajakPembelianComponent implements OnInit {

    DashboardProps: DashboardModel.IDashboard;

    FormInputHeader: CustomFormModel.IForm;
    @ViewChild('CustomForm') CustomForm!: CustomFormComponent;

    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _fakturPajakPembelianService: FakturPajakPembelianService,
    ) {
        this.DashboardProps = {
            title: 'Detail Faktur Pajak Pembelian',
            button_navigation: [
                { id: 'back', caption: 'Back', icon: 'pi pi-chevron-left text-xs' },
                // { id: 'print', caption: 'Print', icon: 'pi pi-print text-xs' },
            ],
        };

        this.FormInputHeader = {
            id: 'form_faktur_pajak_pembelian_header',
            type: 'save',
            is_inline: true,
            fields: [
                {
                    id: 'id_faktur_pajak',
                    label: 'Id Penerimaan',
                    status: 'readonly',
                    type: 'string',
                    required: false,
                    hidden: true
                },
                {
                    id: 'nomor_penerimaan',
                    label: 'No. Penerimaan',
                    status: 'readonly',
                    type: 'string',
                    required: false,
                },
                {
                    id: 'tanggal_nota',
                    label: 'Tgl. Nota',
                    status: 'readonly',
                    type: 'string',
                    required: false,
                },
                {
                    id: 'kode_supplier',
                    label: 'Kode Supplier',
                    status: 'readonly',
                    type: 'string',
                    required: false,
                },
                {
                    id: 'nama_supplier',
                    label: 'Nama Supplier',
                    status: 'readonly',
                    type: 'string',
                    required: false,
                },
                {
                    id: 'tanggal_faktur_pajak',
                    label: 'Tgl. Faktur Pajak',
                    status: 'readonly',
                    type: 'string',
                    required: false,
                },
                {
                    id: 'total_transaksi',
                    label: 'Total Transaksi',
                    status: 'readonly',
                    type: 'numeric',
                    required: true,
                },
                {
                    id: 'dasar_pengenaan_pajak',
                    label: 'Dasar P. Pajak',
                    status: 'readonly',
                    type: 'numeric',
                    required: true,
                },
                {
                    id: 'ppn',
                    label: 'PPn',
                    status: 'readonly',
                    type: 'numeric',
                    required: true,
                },
                {
                    id: 'no_seri',
                    label: 'No. Seri',
                    status: 'readonly',
                    type: 'string',
                    required: true,
                },
                {
                    id: 'tanggal_faktur_pajak',
                    label: 'Tgl. Faktur Pajak',
                    status: 'readonly',
                    type: 'string',
                    required: true,
                },
                {
                    id: 'nama_ttd_faktur',
                    label: 'Nama Ttd Faktur',
                    status: 'readonly',
                    type: 'string',
                    required: true,
                },
                {
                    id: 'keterangan',
                    label: 'Keterangan',
                    status: 'readonly',
                    type: 'string',
                    required: false,
                },
            ],
            custom_class: 'grid-rows-6 grid-cols-2',
        }
    }

    ngOnInit(): void {
        this.getDetailById();
    }

    private getDetailById(): void {
        const id = this._activatedRoute.snapshot.params.id;

        this._fakturPajakPembelianService
            .getById(id)
            .pipe(
                map((result) => {
                    if (result.success) {
                        return result.data;
                    } else {
                        return result;
                    }
                })
            )
            .subscribe((result) => {
                this.CustomForm.props.default_value = result;
                this.CustomForm.handleSetFormDefaultValue();
            })
    }

    handleClickButtonNav(args: string): void {
        if (args == 'back') {
            this._router.navigate(['finance/faktur-pajak-pembelian/history']);
        };
    }
}
