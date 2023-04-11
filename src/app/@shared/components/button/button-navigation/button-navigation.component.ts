import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonModel } from 'src/app/@shared/models/components/button.model';

@Component({
    selector: 'app-button-navigation',
    templateUrl: './button-navigation.component.html',
    styleUrls: ['./button-navigation.component.scss']
})
export class ButtonNavigationComponent implements OnInit {

    @Input('props') props: ButtonModel.IButtonNavigation[];

    @Output('onClick') onClick = new EventEmitter<string>();

    constructor() {
        this.props = [];
    }

    ngOnInit(): void {
    }

    handleClick(args: string): void {
        this.onClick.emit(args);
    }
}
