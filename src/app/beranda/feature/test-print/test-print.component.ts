import { Component, HostListener, OnInit } from '@angular/core';

@Component({
    selector: 'app-test-print',
    templateUrl: './test-print.component.html',
    styleUrls: ['./test-print.component.scss']
})
export class TestPrintComponent implements OnInit {

    @HostListener('window:afterprint', ['$event'])
    onAfterPrint(event: Event) {
        window.history.back();
    }

    ngOnInit(): void {
        setTimeout(() => {
            window.print();
        }, 1500);
    }
}
