import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LaporanPajakService } from 'src/app/@core/service/laporan/laporan-pajak.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { CustomFormComponent } from 'src/app/@shared/components/custom-form/custom-form.component';
import { CustomFormModel } from 'src/app/@shared/models/components/custom-form.model';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { FilterModel } from 'src/app/@shared/models/components/filter.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';

@Component({
    selector: 'app-laporan-pajak-bkp-rekap',
    templateUrl: './laporan-pajak-bkp-rekap.component.html',
    styleUrls: ['./laporan-pajak-bkp-rekap.component.scss']
})
export class LaporanPajakBkpRekapComponent implements OnInit {

    DashboardProps: DashboardModel.IDashboard;

    GridProps: GridModel.IGrid;

    OffcanvasFilterProps: FilterModel.IOffcanvasFilter;
    FormInputFooter: CustomFormModel.IForm;
    @ViewChild('CustomFormFooter') CustomFormFooter!: CustomFormComponent;

    constructor(
        private _messageService: MessageService,
        private _utilityService: UtilityService,
        private _laporanPajakService: LaporanPajakService,
    ) {
        this.DashboardProps = {
            title: 'Laporan Pajak BKP Rekap',
            button_navigation: [
                { id: 'export_excel', caption: 'Excel', icon: 'pi pi-file-excel text-xs' },
            ],
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
                { field: 'tanggal', headerName: 'TANGGAL', flex: 150, sortable: true, resizable: true, cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value, 'dd-MM-yyyy') } },
                { field: 'subtotal', headerName: 'SUBTOTAL', flex: 150, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') }, },
                { field: 'dpp', headerName: 'DPP', flex: 150, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') }, },
                { field: 'ppn', headerName: 'PPN', flex: 150, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') }, },
            ],
            dataSource: [],
            height: "calc(100vh - 18rem)",
            showPaging: false,
        };

        this.FormInputFooter = {
            id: 'form_pemesanan_po_footer',
            type: 'save',
            is_inline: true,
            fields: [
                {
                    id: 'total_jumlah_harian',
                    label: 'Total Jumlah Harian',
                    status: 'readonly',
                    type: 'numeric',
                    required: false
                },
                {
                    id: 'total_dpp_harian',
                    label: 'Total DPP Harian',
                    status: 'readonly',
                    type: 'numeric',
                    required: false
                },
                {
                    id: 'total_ppn_harian',
                    label: 'Total PPn Harian',
                    status: 'readonly',
                    type: 'numeric',
                    prefix: 'Rp. ',
                    prefix_position: 'left',
                    required: false
                },
            ],
            custom_class: 'grid-rows-3 grid-cols-1',
        };
    }

    ngOnInit(): void {
        // this.handleSearchOffcanvas([]);
    }

    handleClickButtonNav(args: string): void {
        if (args == 'export_excel') {
            const dataSource = this.GridProps.dataSource.map((item) => {
                return {
                    tanggal: item.tanggal,
                    subtotal: (item.subtotal),
                    dpp: (item.dpp),
                    ppn: (item.ppn),
                }
            });

            this._utilityService.exportToExcel({ worksheetName: 'Laporan Pajak Non BKP', dataSource: dataSource })
        };
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
            this._laporanPajakService
                .getLaporanPajakBkpRekap(filter)
                .subscribe((result) => {
                    if (result.success) {
                        this.GridProps.dataSource = result.data;

                        let total = 0;

                        for (const item of this.GridProps.dataSource) {
                            item.subtotal = parseFloat(item.subtotal);
                            total += item.subtotal;
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
