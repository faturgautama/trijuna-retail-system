import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { LoadingDialogComponent } from '../../dialog/loading-dialog/loading-dialog.component';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { HttpRequestService } from 'src/app/@core/service/http-request/http-request.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {

    @Input('props') props: DashboardModel.IDashboard;

    @Output('onClickButtonNav') onClickButtonNav = new EventEmitter<string>();

    @ViewChild('LoadingDialog') LoadingDialog!: LoadingDialogComponent;

    BreadcrumbsProps: string[] = [];

    constructor(
        private _router: Router,
        private _messageService: MessageService,
        private _httpRequestService: HttpRequestService,
    ) {
        this.props = { title: '', button_navigation: [] };
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            // ** Loading
            this._httpRequestService.ToggleLoading.subscribe((result) => {
                this.LoadingDialog.Visible = result;
            });

            // ** Error
            this._httpRequestService.ErrorToast.subscribe((result) => {
                if (result.show) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'error', summary: 'Oops', detail: result.message })
                }
            });

            let data: any[] = [];

            this._router.url.split("/").filter((item, index) => {
                if (index == (this._router.url.split("/").length - 1)) {
                    item = this.props.title;
                } else {
                    item = item.replace(/-/g, " ");
                }

                data.push(item);
            });

            this.BreadcrumbsProps = data;
        }, 1);
    }

    handleCloseToast(args: any): void {
        if (args.message.summary == 'Oops' && args.message.severity == 'error') {
            this._httpRequestService.ErrorToast.next({ show: false, message: "" });
            this._messageService.clear();
        }
    }

    handleClickButtonNav(id: string): void {
        this.onClickButtonNav.emit(id);
    }
}
