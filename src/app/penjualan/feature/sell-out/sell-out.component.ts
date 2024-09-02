import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PenjualanService } from 'src/app/@core/service/penjualan/penjualan/penjualan.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { CustomFormComponent } from 'src/app/@shared/components/custom-form/custom-form.component';
import { CustomFormModel } from 'src/app/@shared/models/components/custom-form.model';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { FilterModel } from 'src/app/@shared/models/components/filter.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';

@Component({
    selector: 'app-sell-out',
    templateUrl: './sell-out.component.html',
    styleUrls: ['./sell-out.component.scss']
})
export class SellOutComponent implements OnInit {

    DashboardProps: DashboardModel.IDashboard;

    GridProps: GridModel.IGrid;

    OffcanvasFilterProps: FilterModel.IOffcanvasFilter;
    FormInputFooter: CustomFormModel.IForm;
    @ViewChild('CustomFormFooter') CustomFormFooter!: CustomFormComponent;
    constructor(
        private _messageService: MessageService,
        private _utilityService: UtilityService,
        private _penjualanService: PenjualanService,
    ) {
        this.DashboardProps = {
            title: 'History Sell Out Item',
            button_navigation: [],
        };

        this.OffcanvasFilterProps = {
            filter: [
                {
                    id: 'tanggal_pencarian',
                    title: 'Tgl. Pencarian',
                    type: 'date',
                    value: 'tanggal_pencarian',
                },
                {
                    id: 'mb.kode_barang',
                    title: 'Kode Barang',
                    type: 'string',
                    value: 'mb.kode_barang',
                },
                {
                    id: 'mb.barcode',
                    title: 'Barcode',
                    type: 'string',
                    value: 'mb.barcode',
                },
                {
                    id: 'mb.nama_barang',
                    title: 'Nama Barang',
                    type: 'string',
                    value: 'mb.nama_barang',
                },
                {
                    id: 'md.divisi',
                    title: 'Divisi',
                    type: 'string',
                    value: 'md.divisi',
                },
                {
                    id: 'mg.group',
                    title: 'Group',
                    type: 'string',
                    value: 'mg.group',
                },
                {
                    id: 'mm.merk',
                    title: 'Merk',
                    type: 'string',
                    value: 'mm.merk',
                },
            ],
        }

        this.GridProps = {
            column: [
                { field: 'kode_barang', headerName: 'KODE BARANG', width: 150, sortable: true, resizable: true },
                { field: 'barcode', headerName: 'BARCODE', width: 150, sortable: true, resizable: true },
                { field: 'nama_barang', headerName: 'NAMA BARANG', width: 200, sortable: true, resizable: true },
                { field: 'divisi', headerName: 'DIVISI', width: 150, sortable: true, resizable: true },
                { field: 'group', headerName: 'GROUP', width: 150, sortable: true, resizable: true },
                { field: 'kode_satuan', headerName: 'SATUAN', width: 150, sortable: true, resizable: true },
                { field: 'merk', headerName: 'MERK', width: 150, sortable: true, resizable: true },
                { field: 'qty_jual', headerName: 'QTY JUAL', width: 150, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, '') } },
                { field: 'harga_jual', headerName: 'HARGA JUAL', width: 150, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') } },
                { field:'subtotal', headerName: 'SUBTOTAL', width: 150, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') }, },
            ],
            dataSource: [],
            height: "calc(100vh - 14rem)",
            // height: "100%",
            showPaging: false,
        };

        this.FormInputFooter = {
            id: 'form_pemesanan_po_footer',
            type: 'save',
            is_inline: true,
            fields: [
                {
                    id: 'total',
                    label: 'Total',
                    status: 'readonly',
                    type: 'numeric',
                    required: true
                },
            ],
            custom_class: 'grid-rows-6 grid-cols-1',
        };
    }

    ngOnInit(): void {
        // this.handleSearchOffcanvas([]);
    }

    handleSearchOffcanvas(args: any): void {
        let queryParams = "";

        const filter = args.filter((item: any) => {
            if (item.column == 'tanggal_pencarian') {
                queryParams = `?start=${this._utilityService.FormatDate(new Date(item.value), 'yyyy-MM-DD')}&end=${this._utilityService.FormatDate(new Date(item.value2), 'yyyy-MM-DD')}`;
            }

            return item.column != "tanggal_pencarian"
        });

        if (queryParams) {
            this._penjualanService
                .getAllSellOut(queryParams, filter)
                .subscribe((result) => {
                    if (result.success) {
                        this.GridProps.dataSource = result.data;
                        let total = 0;
                        for (const item of this.GridProps.dataSource) {
                            total+= parseFloat(item.subtotal) ; // Output: apple, banana, cherry
                        }
                        this.CustomFormFooter.handleSetFieldValue('total', total);
                    }
                })
        } else {
            this._messageService.clear();
            this._messageService.add({ severity: 'warning', summary: 'Oops', detail: 'Tanggal Pencarian Tidak Boleh Kosong' })
        }
    }

}
