import { Component } from '@angular/core';

@Component({
    selector: 'app-loading-dialog',
    templateUrl: './loading-dialog.component.html',
    styleUrls: ['./loading-dialog.component.scss']
})
export class LoadingDialogComponent {

    Visible: boolean = false;

    showDialog() {
        this.Visible = true;
    }

    closeDialog() {
        this.Visible = false;
    }
}
