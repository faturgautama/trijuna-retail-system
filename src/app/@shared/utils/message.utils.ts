import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";

@Injectable()
export class MessageUtils {

    ToggleLoading: boolean = false;

    constructor(
        private _messageService: MessageService,
    ) { }

    showToast(severity: 'success' | 'info' | 'danger' | 'warn', title: string, content: string) {
        this._messageService.clear();
        this._messageService.add({ severity: severity, summary: title, detail: content })
    }


}