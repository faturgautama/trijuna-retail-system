import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { MutasiMasukService } from 'src/app/@core/service/inventory/mutasi-masuk/mutasi-masuk.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';

@Component({
    selector: 'app-input-mutasi-masuk',
    templateUrl: './input-mutasi-masuk.component.html',
    styleUrls: ['./input-mutasi-masuk.component.scss']
})
export class InputMutasiMasukComponent implements OnInit {

    ShowDialog = false;

    SelectedFile: any = null;

    UploadSuccess$ = new BehaviorSubject<any>(false);

    constructor(
        private _utilityService: UtilityService,
        private _messageService: MessageService,
        private _mutasiMasukService: MutasiMasukService,
    ) { }

    ngOnInit(): void {
    }

    handleOpenDialog() {
        this.ShowDialog = true;
        this.SelectedFile = null;
        const fileContainer = document.getElementById('fileContainer') as HTMLInputElement;
        fileContainer.value = "";
    }

    handleChangeFile(args: any) {
        this.SelectedFile = args.target.files[0];
        const fileContainer = document.getElementById('fileContainer') as HTMLInputElement;
        fileContainer.value = this.SelectedFile.name;
    }

    handleDeleteFile() {
        this.SelectedFile = null;
        const fileContainer = document.getElementById('fileContainer') as HTMLInputElement;
        fileContainer.value = "";
    }

    handleSave() {
        const formData = new FormData();
        formData.append('json_file', this.SelectedFile);

        this._mutasiMasukService
            .save(formData)
            .subscribe((result) => {
                if (result.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Success', detail: 'File berhasil diupload' });
                    this.ShowDialog = false;
                    this.UploadSuccess$.next(true);
                }
            })
    }
}
