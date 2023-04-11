import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonModel } from 'src/app/@shared/models/components/button.model';

@Component({
    selector: 'app-button-custom',
    templateUrl: './button-custom.component.html',
    styleUrls: ['./button-custom.component.scss']
})
export class ButtonCustomComponent implements OnInit {

    @Input('props') props: ButtonModel.ICustomButton;

    @Output('onClick') onClick = new EventEmitter<string>();

    constructor() {
        this.props = {
            id: '',
            caption: '',
            icon: '',
            severity: 'primary',
            class: ''
        };
    }

    ngOnInit(): void {
    }

    handleClickButtonCustom(data: ButtonModel.ICustomButton): void {
        this.onClick.emit(data.id);
    }
}
