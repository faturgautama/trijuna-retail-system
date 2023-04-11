import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CustomFormComponent } from 'src/app/@shared/components/custom-form/custom-form.component';
import { LoadingDialogComponent } from 'src/app/@shared/components/dialog/loading-dialog/loading-dialog.component';
import { ButtonModel } from 'src/app/@shared/models/components/button.model';
import { CustomFormModel } from 'src/app/@shared/models/components/custom-form.model';
import { AuthenticationService } from 'src/app/@shared/services/authentication/authentication.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [MessageService]
})
export class LoginComponent implements OnInit {

    @ViewChild('FormAuthentication') FormAuthentication!: CustomFormComponent

    FormAuth: CustomFormModel.IForm;

    ButtonSubmit: ButtonModel.ICustomButton = { id: 'submit', icon: '', severity: 'info', caption: 'Login', class: 'my-10' };

    @ViewChild('LoadingDialog') LoadingDialog!: LoadingDialogComponent;

    constructor(
        private _router: Router,
        private _messageService: MessageService,
        private _authenticationService: AuthenticationService,
    ) {
        this.FormAuth = {
            id: 'authentication',
            type: 'save',
            fields: [
                {
                    id: 'email',
                    label: 'Email',
                    required: true,
                    validator: 'Email Tidak Boleh Kosong',
                    status: 'insert',
                    type: 'string',
                },
                {
                    id: 'password',
                    label: 'Password',
                    required: true,
                    validator: 'Password Tidak Boleh Kosong',
                    status: 'insert',
                    type: 'password',
                }
            ],
            is_inline: false,
            custom_class: 'grid-rows-2'
        }
    }

    ngOnInit(): void {

    }

    handleClickButtonLogin(args: string): void {
        const data = this.FormAuthentication.handleSubmitForm();

        this.LoadingDialog.showDialog();

        this._authenticationService.login(data)
            .subscribe((result) => {
                if (result.success) {
                    this.LoadingDialog.closeDialog();
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Login Success' });
                }
            }, (error) => {
                this.LoadingDialog.closeDialog();
                this._messageService.clear();
                this._messageService.add({ severity: 'error', summary: 'Oops', detail: error.message });
            })
    }

    onCloseToast(args: any): void {
        if (args.message.severity == 'success') {
            this._router.navigate(['beranda']);
        }
    }
}
