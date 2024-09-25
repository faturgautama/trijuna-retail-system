import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { map } from 'rxjs';
import { SetupPotonganPembelianService } from 'src/app/@core/service/finance/setup-data/setup-potongan-pembelian.service';
import { TitipTagihanService } from 'src/app/@core/service/finance/titip-tagihan/titip-tagihan.service';
import { MutasiKeluarService } from 'src/app/@core/service/inventory/mutasi-keluar/mutasi-keluar.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { CustomFormComponent } from 'src/app/@shared/components/custom-form/custom-form.component';
import { CustomFormModel } from 'src/app/@shared/models/components/custom-form.model';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';
import { SetupSupplierAction } from 'src/app/@shared/state/setup-data/setup-supplier';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-input-titip-tagihan',
    templateUrl: './input-titip-tagihan.component.html',
    styleUrls: ['./input-titip-tagihan.component.scss']
})
export class InputTitipTagihanComponent implements OnInit {

    DashboardProps: DashboardModel.IDashboard;

    FormInputHeader: CustomFormModel.IForm;
    @ViewChild('CustomForm') CustomForm!: CustomFormComponent

    FormInputFooter: CustomFormModel.IForm;
    @ViewChild('CustomFormFooter') CustomFormFooter!: CustomFormComponent

    GridProps: GridModel.IGrid;
    GridSelectedData: any = {} as any;

    GridReturProps: GridModel.IGrid;
    GridReturSelectedData: any = {} as any;

    GridPotonganPembelianProps: GridModel.IGrid;
    GridPotonganPembalianSelectedData: any = {} as any;

    Banyak: number = 0;
    Qty: number = 0;
    HargaSatuan: number = 0;
    TotalMutasi: number = 0;

    constructor(
        private _store: Store,
        private _router: Router,
        private _messageService: MessageService,
        private _utilityService: UtilityService,
        private _mutasiKeluarService: MutasiKeluarService,
        private _titipTagihanService: TitipTagihanService,
        private _setupPotonganPembelianService: SetupPotonganPembelianService,
    ) {
        this.DashboardProps = {
            title: 'Input Titip Tagihan',
            button_navigation: [
                { id: 'back', caption: 'Back', icon: 'pi pi-chevron-left text-xs' },
                { id: 'save', caption: 'Save', icon: 'pi pi-save text-xs' },
            ],
        };

        this.FormInputHeader = {
            id: 'form_titip_tagihan_header',
            type: 'save',
            is_inline: true,
            fields: [
                {
                    id: 'tanggal_titip_tagihan',
                    label: 'Tgl. TT',
                    status: 'insert',
                    type: 'date',
                    required: true,
                },
                {
                    id: 'tanggal_rencana_bayar',
                    label: 'Tgl. Bayar',
                    status: 'insert',
                    type: 'date',
                    required: true,
                },
                {
                    id: 'id_supplier',
                    label: 'Supplier',
                    status: 'insert',
                    type: 'lookup',
                    lookup_props: {
                        id: 'lookupSupplier',
                        title: 'Data Supplier',
                        columns: [
                            { field: 'kode_supplier', flex: 200, headerName: 'KODE SUPPLIER', sortable: true, resizable: true },
                            { field: 'nama_supplier', flex: 275, headerName: 'NAMA SUPPLIER', sortable: true, resizable: true },
                            { field: 'alamat', flex: 290, headerName: 'ALAMAT SUPPLIER', sortable: true, resizable: true },
                        ],
                        filter: [
                            { id: 'kode_supplier', title: 'Kode Supplier', type: 'contain', value: 'ms.kode_supplier' },
                            { id: 'nama_supplier', title: 'Nama Supplier', type: 'contain', value: 'ms.nama_supplier' },
                        ],
                        label: 'Supplier',
                        selectedField: 'nama_supplier',
                        selectedValue: 'id_supplier',
                        url: `${environment.endpoint}/supplier/by_param`,
                        callback: (args: any) => {
                            this.onGetHutangPembelianAndPotonganSupplier(args.id_supplier);
                        }
                    },
                    required: true,
                },
            ],
            custom_class: 'grid-rows-1 grid-cols-3',
        };

        this.FormInputFooter = {
            id: 'form_titip_tagihan_footer',
            type: 'save',
            is_inline: true,
            fields: [
                {
                    id: 'total_titip_tagihan',
                    label: 'Total Titip Tagihan',
                    status: 'readonly',
                    type: 'numeric',
                    required: true,
                    is_form_grouped: false,
                },
                {
                    id: 'total_retur',
                    label: 'Total Retur',
                    status: 'readonly',
                    type: 'numeric',
                    required: true,
                    is_form_grouped: false,
                },
                {
                    id: 'total_potongan',
                    label: 'Total Potongan',
                    status: 'readonly',
                    type: 'numeric',
                    required: true,
                    is_form_grouped: false,
                },
                {
                    id: 'total_bayar',
                    label: 'Total Bayar',
                    status: 'readonly',
                    type: 'numeric',
                    required: true,
                    is_form_grouped: false,
                },
            ],
            custom_class: 'grid-rows-4 grid-cols-1',
        };

        this.GridProps = {
            column: [
                {
                    headerName: "PILIH",
                    field: "choosen",
                    cellRenderer: (params: any) => {
                        var input = document.createElement('input');
                        input.type = "checkbox";
                        input.checked = params.value;
                        input.addEventListener('click', function (event) {
                            params.value = !params.value;
                            params.node.data.choosen = params.value;
                        });
                        return input;
                    },
                    valueGetter: params => { return params.data.choosen },
                    valueSetter: params => {
                        const data = JSON.parse(JSON.stringify(params.data));
                        data.choosen = params.newValue;
                        params.data = data;
                        return true;
                    },
                    onCellValueChanged: (e: any) => {
                        this.countFooter();
                    },
                    flex: 100,
                    cellClass: 'text-center',
                    headerClass: 'text-center',
                },
                { field: 'nomor_penerimaan', headerName: 'FAKTUR', flex: 200, sortable: true, resizable: true, },
                { field: 'no_nota', headerName: 'NO. NOTA', flex: 200, sortable: true, resizable: true },
                { field: 'tanggal_nota', headerName: 'TGL. NOTA', flex: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatDate(e.value, 'DD-MM-yyyy') : e } },
                { field: 'created_at', headerName: 'WAKTU INPUT', flex: 150, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatDate(e.value, 'DD-MM-yyyy') : e } },
                { field: 'validasi_at', headerName: 'WAKTU VALIDASI', flex: 150, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatDate(e.value, 'DD-MM-yyyy') : e } },
                { field: 'total_transaksi', headerName: 'SUBTOTAL', flex: 200, sortable: true, resizable: true, cellClass: 'text-end', cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value, 'Rp. ') : e } },
            ],
            dataSource: [],
            height: "250px",
            toolbar: [],
            showPaging: false,
        };

        this.GridReturProps = {
            column: [
                {
                    headerName: "PILIH",
                    field: "choosen",
                    cellRenderer: (params: any) => {
                        var input = document.createElement('input');
                        input.type = "checkbox";
                        input.checked = params.value;
                        input.addEventListener('click', (event: any) => {
                            params.value = !params.value;
                            params.node.data.choosen = params.value;
                        });
                        return input;
                    },
                    valueGetter: params => { return params.data.choosen },
                    valueSetter: params => {
                        const data = JSON.parse(JSON.stringify(params.data));
                        data.choosen = params.newValue;
                        params.data = data;
                        return true;
                    },
                    onCellValueChanged: (e: any) => {
                        this.countFooter();
                    },
                    flex: 100,
                    cellClass: 'text-center',
                    headerClass: 'text-center',
                },
                { field: 'nomor_retur_pembelian', headerName: 'FAKTUR', flex: 200, sortable: true, resizable: true, },
                { field: 'tanggal_retur_pembelian', headerName: 'TGL. RETUR', flex: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatDate(e.value, 'DD-MM-yyyy') : e } },
                { field: 'total_harga', headerName: 'TOTAL HARGA', flex: 200, sortable: true, resizable: true, cellClass: 'text-end', cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value, 'Rp. ') : e } },
                { field: 'qty', headerName: 'QTY', flex: 200, sortable: true, resizable: true, cellClass: 'text-end', cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e } },
                { field: 'created_at', headerName: 'WAKTU INPUT', flex: 150, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatDate(e.value, 'DD-MM-yyyy') : e } },
            ],
            dataSource: [],
            height: "250px",
            toolbar: [],
            showPaging: false,
        };

        this.GridPotonganPembelianProps = {
            column: [
                { field: 'id_potongan_pembelian', headerName: 'ID', flex: 200, sortable: true, resizable: true, hide: true },
                { field: 'potongan_pembelian', headerName: 'POTONGAN PEMBELIAN', flex: 200, sortable: true, resizable: true, },
                {
                    field: 'total_potongan', headerName: 'TOTAL POTONGAN', flex: 200, sortable: true, resizable: true,
                    editable: true,
                    cellClass: 'text-end',
                    cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value, 'Rp. ') : e },
                    valueGetter: params => { return params.data.total_potongan },
                    valueSetter: params => {
                        const data = JSON.parse(JSON.stringify(params.data));
                        data.total_potongan = params.newValue;
                        params.data = data;
                        return true;
                    },
                    onCellValueChanged: (e: any) => {
                        this.countFooter();
                    }
                },
            ],
            dataSource: [],
            height: "250px",
            toolbar: [],
            showPaging: false,
        };
    }

    ngOnInit(): void {
        this.onGetSupplier();
    }

    private onGetSupplier(): void {
        this._store.dispatch(new SetupSupplierAction.GetAll([]))
            .pipe(
                map((result: any) => {
                    if (result.setup_supplier.entities.success) {
                        return result.setup_supplier.entities.data;
                    } else {
                        return result;
                    }
                })
            )
            .subscribe((result) => {
                const indexSupplier = this.CustomForm.props.fields.findIndex((item) => {
                    return item.id == 'id_supplier'
                });

                const data = result.map((item: any) => {
                    return {
                        name: item.nama_supplier,
                        value: item.id_supplier
                    }
                });

                this.CustomForm.props.fields[indexSupplier].select_props = data;
            })
    }

    private onGetHutangPembelianAndPotonganSupplier(id_supplier: number) {
        this._titipTagihanService
            .getAllNotaDanRetur(id_supplier)
            .subscribe((result) => {
                if (result.success) {
                    this.GridProps.dataSource = result.data.nota_pembelian.map((item: any) => {
                        return {
                            ...item,
                            choosen: false
                        }
                    });

                    this.GridReturProps.dataSource = result.data.retur_pembelian.map((item: any) => {
                        return {
                            ...item,
                            choosen: false
                        }
                    });

                    this.getPotonganPembelian();
                }
            })
    }

    private getPotonganPembelian() {
        this._setupPotonganPembelianService
            .getAll()
            .subscribe((result) => {
                this.GridPotonganPembelianProps.dataSource = result.map((item: any) => {
                    return {
                        ...item,
                        total_potongan: 0
                    }
                });
            })
    }

    handleClickButtonNav(args: string): void {
        switch (args) {
            case 'back':
                this._router.navigate(['finance/titip-tagihan/history']);
                break;
            case 'save':
                this.handleSubmitForm();
                break;
            default:
                break;
        }
    }

    onCellClicked(args: any): void {
        this.GridSelectedData = args;
        this.countFooter();
    }

    private countFooter() {
        let totalFaktur = 0, totalRetur = 0, totalPotongan = 0, totalBayar = 0;

        this.GridProps.dataSource.forEach((item: any) => {
            if (item.choosen) {
                item.total_transaksi = parseFloat(item.total_transaksi);
                totalFaktur += item.total_transaksi;
                this.CustomFormFooter.CustomForms.get('total_titip_tagihan')?.setValue(totalFaktur);
            }
        });

        this.GridReturProps.dataSource.forEach((item: any) => {
            if (item.choosen) {
                item.total_harga = parseFloat(item.total_harga);
                totalRetur += item.total_harga;
                this.CustomFormFooter.CustomForms.get('total_retur')?.setValue(totalRetur);
            }
        });

        this.GridPotonganPembelianProps.dataSource.forEach((item: any) => {
            if (item.total_potongan > 1) {
                item.total_potongan = parseFloat(item.total_potongan);
                totalPotongan += item.total_potongan;
                this.CustomFormFooter.CustomForms.get('total_potongan')?.setValue(totalPotongan);
            }
        });

        setTimeout(() => {
            totalBayar = totalFaktur + totalRetur - totalPotongan;
            this.CustomFormFooter.CustomForms.get('total_bayar')?.setValue(totalBayar);
        }, 1000);
    }

    handleSubmitForm(): void {
        this.countFooter();

        const header = this.CustomForm.handleSubmitForm();
        header.detail_faktur = this.GridProps.dataSource.filter(item => item.choosen);
        header.detail_retur = this.GridReturProps.dataSource.filter(item => item.choosen);
        header.detail_potongan = this.GridPotonganPembelianProps.dataSource.filter(item => item.total_potongan > 1);

        const footer = this.CustomFormFooter.handleSubmitForm();
        const payload = this._utilityService.JoinTwoObject(header, footer);

        this._titipTagihanService
            .save(payload)
            .subscribe((result) => {
                if (result.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Disimpan' });

                    this.CustomForm.handleResetForm();

                    setTimeout(() => {
                        this._router.navigate(['finance/titip-tagihan/history']);
                    }, 1500);
                }
            });
    }

}
