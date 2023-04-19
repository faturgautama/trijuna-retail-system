import { Component, OnInit } from '@angular/core';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { FilterModel } from 'src/app/@shared/models/components/filter.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';

@Component({
    selector: 'app-history-penerimaan-dengan-po',
    templateUrl: './history-penerimaan-dengan-po.component.html',
    styleUrls: ['./history-penerimaan-dengan-po.component.scss']
})
export class HistoryPenerimaanDenganPoComponent implements OnInit {

    DashboardProps: DashboardModel.IDashboard;

    GridProps: GridModel.IGrid;

    OffcanvasFilterProps: FilterModel.IOffcanvasFilter;

    constructor() {
        this.DashboardProps = {} as any;

        this.GridProps = {} as any;

        this.OffcanvasFilterProps = {} as any;
    }

    ngOnInit(): void {

    }
}   
