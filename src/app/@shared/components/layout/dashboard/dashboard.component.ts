import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { LoadingDialogComponent } from '../../dialog/loading-dialog/loading-dialog.component';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpRequestService } from 'src/app/@core/service/http-request/http-request.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit, OnDestroy {

    Destroy$ = new Subject();

    IsBeranda = false;

    @Input('props') props: DashboardModel.IDashboard;

    @Output('onClickButtonNav') onClickButtonNav = new EventEmitter<string>();

    @ViewChild('LoadingDialog') LoadingDialog!: LoadingDialogComponent;

    BreadcrumbsProps: string[] = [];

    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _messageService: MessageService,
        private _httpRequestService: HttpRequestService,
    ) {
        this.props = { title: '', button_navigation: [] };

        // this._activatedRoute.url.subscribe((result) => {
        //     console.log(result)
        // })
    }

    ngAfterViewInit(): void {
        setTimeout(() => {

            // ** Loading
            this._httpRequestService
                .ToggleLoading
                .pipe(takeUntil(this.Destroy$))
                .subscribe((result) => {
                    this.LoadingDialog.Visible = result;
                });

            // ** Error
            this._httpRequestService
                .ErrorToast
                .pipe(takeUntil(this.Destroy$))
                .subscribe((result) => {
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

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }
}
