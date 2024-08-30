import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { ButtonModel } from 'src/app/@shared/models/components/button.model';
import { FilterModel } from 'src/app/@shared/models/components/filter.model';

@Component({
    selector: 'app-offcanvas-filter',
    templateUrl: './offcanvas-filter.component.html',
    styleUrls: ['./offcanvas-filter.component.scss']
})
export class OffcanvasFilterComponent {

    ButtonProps: ButtonModel.ICustomButton = { id: 'open', caption: 'Pencarian', icon: 'pi pi-search', severity: 'info', class: '' }

    OpenOffcanvas: boolean = false;

    @Input('props') props: FilterModel.IOffcanvasFilter;

    FormSearch: FormGroup;

    ButtonAddProps: ButtonModel.ICustomButton = { id: 'add', caption: 'Add', icon: '', severity: 'info', class: '' }

    SavedFilter: FilterModel.IOffcanvasSavedFilter[] = [];

    ButtonSearchProps: ButtonModel.ICustomButton = { id: 'search', caption: 'Search', icon: 'pi pi-search', severity: 'info', class: '' }

    ChipsDatasource: any[] = [];

    @Output('onSearch') onSearch = new EventEmitter<FilterModel.IDynamicFilter[]>([] as any);

    constructor(
        private _formBuilder: FormBuilder,
        private _utilityService: UtilityService,
    ) {
        this.props = {
            filter: [
                { id: 'test', title: 'test', type: 'string', value: 'ms.test' },
                { id: 'test2', title: 'test2', type: 'date', value: 'ms.test2' },
            ],
            url: ''
        };

        this.FormSearch = this._formBuilder.group({
            id: [''],
            title: [''],
            type: [''],
            columnName: [''],
            kataKunci: [''],
            kataKunci2: [''],
            dropdownDatasource: [[]]
        });
    }

    handleToggleOffcanvas(state: boolean): void {
        this.OpenOffcanvas = !state;
    }

    handleChangeFilterBy(args: any): void {
        this.id.setValue(args.value.id + "_" + (this.SavedFilter.length + 1));
        this.title.setValue(args.value.title);
        this.type.setValue(args.value.type == 'string' ? 'like' : (args.value.type == 'date' ? 'between' : 'equal'));
        this.columnName.setValue(args.value.value);
        this.dropdownDatasource.setValue(args.value.dropdown_props);
    }

    handleAddSearch(data: FilterModel.IOffcanvasSavedFilter): void {
        if (data.type == 'between') {
            const kataKunci1 = this.kataKunci.value[0];
            const kataKunci2 = this.kataKunci.value[1];

            data.kataKunci = this._utilityService.FormatDate(kataKunci1, 'yyyy-MM-DD');
            data.kataKunci2 = this._utilityService.FormatDate(kataKunci2, 'yyyy-MM-DD');
        }

        if (data.type == 'equal') {
            const kataKunci1 = this.kataKunci.value;
            const kataKunci2 = data.dropdownDatasource?.find(item => item.name == kataKunci1).value;

            data.kataKunci = kataKunci1;
            data.kataKunci2 = kataKunci2;
        }

        this.SavedFilter.push(data);

        this.FormSearch.reset();
    }

    handleDeleteFilter(index: number): void {
        this.SavedFilter = this.SavedFilter.filter((data: any, i) => {
            if (i != index) {
                return data;
            }
        });
    }

    handleSearchData(changeChip: boolean): void {
        this.ChipsDatasource = [];

        const payload: any[] = this.SavedFilter.map((item) => {
            if (changeChip) {
                const chip = `${item.title} = ${item.type == 'between' ? item.kataKunci + " - " + item.kataKunci2 : item.kataKunci}`

                this.ChipsDatasource.push({
                    id: item.id,
                    label: chip,
                })
            }

            return {
                filter: item.type == 'like' ? 'contain' : (item.type == 'between' ? 'between' : 'equel'),
                column: item.columnName,
                value: item.type == 'equal' ? item.kataKunci2 : item.kataKunci,
                value2: item.type == 'between' ? item.kataKunci2 : "",
            }
        });

        console.log("payload");

        this.onSearch.emit(payload);

        this.OpenOffcanvas = false;
    }

    handleRemoveChips(args: any): void {
        const index = this.SavedFilter.findIndex((item) => { return item.id == args.id });

        this.handleDeleteFilter(index);

        this.handleSearchData(false);
    }

    get id(): AbstractControl { return this.FormSearch.get('id') as AbstractControl }
    get title(): AbstractControl { return this.FormSearch.get('title') as AbstractControl }
    get type(): AbstractControl { return this.FormSearch.get('type') as AbstractControl }
    get columnName(): AbstractControl { return this.FormSearch.get('columnName') as AbstractControl }
    get kataKunci(): AbstractControl { return this.FormSearch.get('kataKunci') as AbstractControl }
    get kataKunci2(): AbstractControl { return this.FormSearch.get('kataKunci2') as AbstractControl }
    get dropdownDatasource(): AbstractControl { return this.FormSearch.get('dropdownDatasource') as AbstractControl }
}
