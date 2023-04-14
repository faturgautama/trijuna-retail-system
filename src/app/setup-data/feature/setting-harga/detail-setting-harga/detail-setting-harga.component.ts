import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { map } from 'rxjs';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { CustomFormComponent } from 'src/app/@shared/components/custom-form/custom-form.component';
import { CustomFormModel } from 'src/app/@shared/models/components/custom-form.model';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';
import { SettingHargaModel } from 'src/app/@shared/models/setup-data/setting-harga.model';
import { SetupLokasiModel } from 'src/app/@shared/models/setup-data/setup-lokasi.model';
import { SettingHargaAction } from 'src/app/@shared/state/setup-data/setting-harga';
import { SetupLokasiAction } from 'src/app/@shared/state/setup-data/setup-lokasi';

@Component({
    selector: 'app-detail-setting-harga',
    templateUrl: './detail-setting-harga.component.html',
    styleUrls: ['./detail-setting-harga.component.scss']
})
export class DetailSettingHargaComponent implements OnInit {

    DashboardProps: DashboardModel.IDashboard;

    FormInputHeader: CustomFormModel.IForm;
    @ViewChild('CustomForm') CustomForm!: CustomFormComponent

    GridProps: GridModel.IGrid;
    GridSelectedData: SettingHargaModel.ISettingHargaDetail = {} as any;

    LokasiDatasource: SetupLokasiModel.ISetupLokasi[] = [];

    constructor(
        private _store: Store,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _utilityService: UtilityService,
    ) {
        this.DashboardProps = {
            title: 'Detail Setting Harga',
            button_navigation: [
                { id: 'back', caption: 'Back', icon: 'pi pi-chevron-left text-xs' },
            ],
        };

        this.FormInputHeader = {
            id: 'form_setting_harga_header',
            type: 'save',
            is_inline: true,
            fields: [
                {
                    id: 'tanggal_mulai_berlaku',
                    label: 'Tgl. Mulai Berlaku',
                    status: 'readonly',
                    type: 'string',
                    required: true,
                },
                {
                    id: 'nama_lokasi',
                    label: 'Lokasi',
                    status: 'readonly',
                    type: 'string',
                    required: true,
                },
            ],
            custom_class: 'grid-rows-1 grid-cols-2',
        }

        this.GridProps = {
            column: [
                { field: 'barcode', headerName: 'BARCODE', width: 170, sortable: true, resizable: true },
                { field: 'nama_barang', headerName: 'NAMA BARANG', width: 350, sortable: true, resizable: true },
                { field: 'harga_jual', headerName: 'HARGA JUAL', width: 200, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value, 'Rp. ') : e } },
                { field: 'qty_grosir1', headerName: 'QTY GROSIR 1', width: 200, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e } },
                { field: 'harga_grosir1', headerName: 'HARGA GROSIR 1', width: 200, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e } },
                { field: 'qty_grosir2', headerName: 'QTY GROSIR 2', width: 200, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e } },
                { field: 'harga_grosir2', headerName: 'HARGA GROSIR 2', width: 200, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value, 'Rp. ') : e } },
                { field: 'lokasi', headerName: 'LOKASI', width: 500, sortable: true, resizable: true, cellRenderer: (e: any) => { return this._utilityService.GetSomeValueFromArray(e.value, 'nama_lokasi') } }
            ],
            dataSource: [],
            height: "calc(100vh - 15rem)",
            showPaging: true,
        };
    }

    ngOnInit(): void {
        this.getDetailSettingHarga();
    }

    getDetailSettingHarga(): void {
        const id = this._activatedRoute.snapshot.params.id;

        this._store.dispatch(new SettingHargaAction.GetById(id))
            .pipe(
                map((result) => {
                    if (result.setting_harga.entities.status) {
                        return result.setting_harga.entities.data;
                    } else {
                        return result;
                    }
                })
            )
            .subscribe((result) => {
                const payload = {
                    tanggal_mulai_berlaku: result.tanggal_mulai_berlaku,
                    nama_lokasi: result.nama_lokasi,
                };

                this.FormInputHeader.default_value = payload;
                this.CustomForm.handleSetFormDefaultValue();

                this.GridProps.dataSource = result.detail;
            })
    }

    handleClickButtonNav(args: string): void {
        switch (args) {
            case 'back':
                this._router.navigate(['setup-data/setting-harga/list']);
                break;
            default:
                break;
        }
    }
}   
