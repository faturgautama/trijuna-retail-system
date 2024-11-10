import { Component, HostListener, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';

@Component({
    selector: 'app-print-label-harga',
    templateUrl: './print-label-harga.component.html',
    styleUrls: ['./print-label-harga.component.scss']
})
export class PrintLabelHargaComponent implements OnInit {

    Datasource: any[] = [];

    TanggalCetak = new Date();

    @HostListener('window:afterprint', ['$event'])
    onAfterPrint(event: Event) {
        // window.close();
    }

    constructor(
        public _utilityService: UtilityService
    ) { }

    ngOnInit(): void {
        const data = JSON.parse(localStorage.getItem('_TRS_PRINT_LABEL_') as any);
        this.Datasource = data ? data : [];

        console.log("data =>", data);

        if (data) {
            // setTimeout(() => {
            //     window.print();
            // }, 1500);
        }
    }
}
