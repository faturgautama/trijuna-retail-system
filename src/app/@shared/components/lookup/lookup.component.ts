import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LookupModel } from '../../models/components/lookup.model';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { HttpRequestService } from '../../services/http-request/http-request.service';
import { FilterModel } from '../../models/components/filter.model';
import { GridModel } from '../../models/components/grid.model';

@Component({
    selector: 'app-lookup',
    templateUrl: './lookup.component.html',
    styleUrls: ['./lookup.component.scss']
})
export class LookupComponent implements OnInit {

    @Input('props') props!: LookupModel.ILookup;

    ShowDialog: boolean = false;

    FormLookup: FormGroup;

    GridProps: GridModel.IGrid;

    @Output('onSelectData') onSelectData = new EventEmitter<any>();

    constructor(
        private _formBuilder: FormBuilder,
        private _httpRequestService: HttpRequestService,
    ) {
        this.FormLookup = this._formBuilder.group({
            filter: ['', []],
            search: ['', []],
        });

        this.GridProps = {
            column: [],
            dataSource: [],
            height: '300px',
        };
    }

    ngOnInit(): void {
        this.GridProps.column = this.props.columns;
    }

    handleToggleDialog(): void {
        this.ShowDialog = !this.ShowDialog;
    }

    handleEnterInputSearch(value: string): void {
        let payload: FilterModel.IDynamicFilter[] = [];

        const savedFilterIndex = this.props.filter.findIndex((item) => { return item.value == this.filter.value });

        if (savedFilterIndex > -1) {
            payload.push({
                filter: this.props.filter[savedFilterIndex].type,
                column: this.props.filter[savedFilterIndex].value,
                value: value,
                value2: "",
            });
        }

        this._httpRequestService.postRequest(this.props.url, { filter: payload })
            .subscribe((result) => {
                this.GridProps.dataSource = result.data;
            });
    }

    handleSelectData(args: any): void {
        this.onSelectData.emit(args);

        this.ShowDialog = false;

        const lookupInputResult = document.getElementById('lookupInputResult') as HTMLInputElement;
        lookupInputResult.value = args[this.props.selectedField];

    }

    get filter(): AbstractControl { return this.FormLookup.get('filter') as AbstractControl }
    get search(): AbstractControl { return this.FormLookup.get('search') as AbstractControl }
}
