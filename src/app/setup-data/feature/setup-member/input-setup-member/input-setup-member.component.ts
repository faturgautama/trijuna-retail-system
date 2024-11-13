import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { SetupMemberService } from 'src/app/@core/service/setup-data/setup-member/setup-member.service';
import { CustomFormComponent } from 'src/app/@shared/components/custom-form/custom-form.component';
import { CustomFormModel } from 'src/app/@shared/models/components/custom-form.model';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { SetupMemberAction } from 'src/app/@shared/state/setup-data/setup-member';

@Component({
    selector: 'app-input-setup-member',
    templateUrl: './input-setup-member.component.html',
    styleUrls: ['./input-setup-member.component.scss']
})
export class InputSetupMemberComponent implements OnInit {

    IsDetailPage = this._router.url.includes('detail');

    DashboardProps: DashboardModel.IDashboard;

    FormInput: CustomFormModel.IForm;

    @ViewChild('CustomForm') CustomForm!: CustomFormComponent

    constructor(
        private _store: Store,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _messageService: MessageService,
        private _setupMemberService: SetupMemberService,
    ) {
        this.FormInput = {
            id: 'input_setup_member',
            type: 'save',
            is_inline: true,
            fields: [
                {
                    id: 'id_member',
                    label: 'Nama Lengkap',
                    status: 'insert',
                    type: 'string',
                    required: true,
                    hidden: true,
                },
                {
                    id: 'nama_member',
                    label: 'Nama Lengkap',
                    status: 'insert',
                    type: 'string',
                    required: true,
                },
                {
                    id: 'alamat',
                    label: 'Alamat',
                    status: 'insert',
                    type: 'string',
                    required: true,
                },
                {
                    id: 'kota',
                    label: 'Kota',
                    status: 'insert',
                    type: 'string',
                    required: true,
                },
                {
                    id: 'kecamatan',
                    label: 'Kecamatan',
                    status: 'insert',
                    type: 'string',
                    required: true,
                },
                {
                    id: 'kelurahan',
                    label: 'Kelurahan',
                    status: 'insert',
                    type: 'string',
                    required: true,
                },
                {
                    id: 'email',
                    label: 'Email',
                    status: 'insert',
                    type: 'string',
                    required: true,
                },
                {
                    id: 'jenis_kelamin',
                    label: 'Jenis Kelamin',
                    status: 'insert',
                    required: true,
                    type: 'radio',
                    radio_props: [
                        { id: 'pria', name: 'Pria', value: 'L' },
                        { id: 'wanita', name: 'Wanita', value: 'W' },
                    ]
                },
                {
                    id: 'no_handphone',
                    label: 'No. Handphone',
                    status: 'insert',
                    required: true,
                    type: 'string',
                },
                {
                    id: 'pekerjaan',
                    label: 'Pekerjaan',
                    status: 'insert',
                    required: true,
                    type: 'string',
                },
                {
                    id: 'jenis_identitas',
                    label: 'Jenis Identitas',
                    status: 'insert',
                    required: true,
                    type: 'select',
                    select_props: [
                        { name: 'KTP', value: 'KTP' },
                        { name: 'SIM', value: 'SIM' },
                    ]
                },
                {
                    id: 'nomor_identitas',
                    label: 'No. Identitas',
                    status: 'insert',
                    required: true,
                    type: 'string',
                },
                {
                    id: 'tanggal_daftar',
                    label: 'Tgl. Daftar',
                    status: 'insert',
                    required: true,
                    type: 'date',
                },
                {
                    id: 'limit_piutang',
                    label: 'Limit Piutang',
                    status: 'insert',
                    type: 'numeric',
                    required: true,
                },
                {
                    id: 'jumlah_poin',
                    label: 'Jumlah Poin',
                    status: 'readonly',
                    type: 'numeric',
                    required: true,
                },
            ]
        };

        if (this.IsDetailPage) {
            this.DashboardProps = {
                title: 'Detail Setup Member',
                button_navigation: [
                    { id: 'back', caption: 'Back', icon: 'pi pi-chevron-left text-xs' },
                    { id: 'ubah_status', caption: 'Ubah Status', icon: 'pi pi-refresh text-xs' },
                    { id: 'update', caption: 'Update', icon: 'pi pi-save text-xs' },
                ],
            };
        } else {
            this.DashboardProps = {
                title: 'Input Setup Member',
                button_navigation: [
                    { id: 'back', caption: 'Back', icon: 'pi pi-chevron-left text-xs' },
                    { id: 'save', caption: 'Save', icon: 'pi pi-save text-xs' },
                ],
            };
        }
    }

    ngOnInit(): void {
        if (this.IsDetailPage) {
            const id_member = this._activatedRoute.snapshot.params['id'];
            this.getDetail(id_member);
        } else {
            this.FormInput.fields[14].hidden = true;
        }
    }

    private getDetail(id_member: number) {
        this._store
            .dispatch(new SetupMemberAction.GetById(id_member))
            .subscribe((result) => {
                if (result.setup_member.entities.success) {
                    this.CustomForm.CustomForms.patchValue(result.setup_member.entities.data);
                }
            });
    }

    handleClickButtonNav(args: string): void {
        switch (args) {
            case 'back':
                this._router.navigate(['setup-data/setup-member/list']);
                break;
            case 'save':
                this.handleSubmitForm();
                break;
            case 'update':
                this.handleUpdateData();
                break;
            case 'ubah_status':
                this._setupMemberService
                    .updateStatus(this._activatedRoute.snapshot.params['id'])
                    .subscribe((result) => {
                        if (result.success) {
                            this._messageService.clear();
                            this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Status Berhasil Diperbarui' });

                            setTimeout(() => {
                                this._router.navigate(['setup-data/setup-member/list']);
                            }, 1000);
                        }
                    })
                break;
            default:
                break;
        }
    }

    handleSubmitForm(): void {
        const data = this.CustomForm.handleSubmitForm();

        this._store
            .dispatch(new SetupMemberAction.Save(data))
            .subscribe((result) => {
                if (result.setup_member.entities.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Disimpan' });
                    this.CustomForm.handleResetForm();
                }
            });
    }

    handleUpdateData(): void {
        let data = this.CustomForm.handleSubmitForm();

        delete data.jumlah_poin;

        this._store
            .dispatch(new SetupMemberAction.Update(data))
            .subscribe((result) => {
                if (result.setup_member.entities.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Diperbarui' });
                    this.CustomForm.handleResetForm();
                }
            });
    }
}
