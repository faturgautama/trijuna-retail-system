import { Injectable } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/id';
import { MessageService } from 'primeng/api';
import * as Excel from "exceljs";
import * as fs from 'file-saver';
import domtoimage from 'dom-to-image';
import jspdf from 'jspdf';
import { DocumentModel } from 'src/app/@shared/models/shared/document.model';

@Injectable({
    providedIn: 'root'
})
export class UtilityService {

    private Workbook = new Excel.Workbook();

    constructor(
        private _messageService: MessageService,
    ) { }

    FormatDate(date: Date, format?: string): any {
        if (date) {
            moment.locale('id');
            return format ? moment(date).format(format) : moment(date).format('DD/MM/yyyy');
        } else {
            return date;
        }
    }

    FormatNumber(number: any, prefix?: string): any {
        if (number) {
            return prefix ? prefix + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        } else {
            return number;
        }
    }

    IconBoolean(data: 0 | 1): any {
        if (data == 1) {
            return `<i class="pi pi-check"></i>`;
        } else {
            return `<i class="pi pi-times"></i>`;
        }
    }

    GetSomeValueFromArray(arr: any[], valueKey: any): string {
        console.log(arr);

        let result = "";

        arr.forEach((item) => {
            result += `${item[valueKey]}, `;
        });

        return result;
    }

    JoinTwoObject(obj1: any, obj2: any): any {
        return { ...obj1, ...obj2 };
    }

    exportToPdf(divId: string, fileTitle: string) {
        const node = document.getElementById(divId);

        console.log("node =>", node);

        if (node) {
            domtoimage.toPng(node)
                .then((dataUrl) => {
                    // Generate the PDF
                    const pdf = new jspdf('p', 'mm', 'a4');
                    const imgProps = pdf.getImageProperties(dataUrl);
                    const pdfWidth = pdf.internal.pageSize.getWidth();
                    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
                    pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);

                    // Save the PDF
                    pdf.save(`${fileTitle}.pdf`);

                    setTimeout(() => {
                        window.history.back();
                    }, 100);
                })
                .catch((error) => {
                    console.error('Error capturing the element:', error);
                });
        } else {
            console.error('Element not found:', divId);
        }
    }

    exportToExcel(payload: DocumentModel.ExportExcel) {
        this.Workbook.removeWorksheet('docs');

        let worksheets = this.Workbook.addWorksheet('docs');

        let column = [];

        for (const data of Object.keys(payload.dataSource[0])) {
            column.push({
                header: data.replace(/_/g, " ").toUpperCase(),
                key: data,
                width: 20,
            });
        }

        worksheets.columns = column;

        for (const item of payload.dataSource) {
            worksheets.addRow(item);
        }

        let fileName = `${payload.worksheetName}-${this.FormatDate(new Date(), 'DD-mm-yyyy HH:mm:ss')}`;

        this.Workbook.xlsx.writeBuffer().then((data) => {
            let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            fs.saveAs(blob, fileName + '.xlsx');
        })
    }
}
