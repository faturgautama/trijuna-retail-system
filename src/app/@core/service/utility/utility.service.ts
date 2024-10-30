import { Injectable } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/id';
import { MessageService } from 'primeng/api';
import * as Excel from "exceljs";
import * as fs from 'file-saver';
import domtoimage from 'dom-to-image';
import jspdf from 'jspdf';
import { DocumentModel } from 'src/app/@shared/models/shared/document.model';
import { AuthenticationService } from '../authentication/authentication.service';
import { CookiesUtils } from 'src/app/@shared/utils/cookies.utils';

@Injectable({
    providedIn: 'root'
})
export class UtilityService {

    UserData: any = this._cookieUtils.getCookie('TRSUserData') as any;;

    private Workbook = new Excel.Workbook();

    constructor(
        private _cookieUtils: CookiesUtils,
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

    // exportToExcel(payload: DocumentModel.ExportExcel) {
    //     this.Workbook.removeWorksheet('docs');

    //     let worksheets = this.Workbook.addWorksheet('docs');


    //     worksheets.getRow(1).values = [payload.worksheetName];
    //     worksheets.getRow(2).values = [this.UserData.lokasi.nama_lokasi];
    //     worksheets.getRow(3).values = [this.UserData.lokasi.nama_lokasi];

    //     let column = [];

    //     for (const data of Object.keys(payload.dataSource[0])) {
    //         column.push({
    //             header: data.replace(/_/g, " ").toUpperCase(),
    //             key: data,
    //             width: 20,
    //         });
    //     }

    //     worksheets.headerFooter = {
    //         firstHeader: 'TEST'
    //     }

    //     worksheets.columns = [{}, ...column];

    //     for (const item of payload.dataSource) {
    //         worksheets.addRow(item);
    //     }

    //     let fileName = `${payload.worksheetName}-${this.FormatDate(new Date(), 'DD-mm-yyyy HH:mm:ss')}`;

    //     this.Workbook.xlsx.writeBuffer().then((data) => {
    //         let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    //         fs.saveAs(blob, fileName + '.xlsx');
    //     })
    // }

    exportToExcel(payload: DocumentModel.ExportExcel) {
        this.Workbook.removeWorksheet('docs');

        let worksheets = this.Workbook.addWorksheet('docs');

        // Set title and location in the first two rows
        worksheets.getRow(1).values = [payload.worksheetName];
        worksheets.getRow(1).font = { bold: true, size: 14 };
        worksheets.getRow(2).values = [this.UserData.lokasi.nama_lokasi];
        worksheets.getRow(2).font = { bold: true, size: 12 };
        worksheets.getRow(3).values = []; // Empty row for spacing

        // Define and set column headers
        const columnHeaders = Object.keys(payload.dataSource[0]).map(key =>
            key.replace(/_/g, " ").toUpperCase()
        );
        worksheets.getRow(4).values = columnHeaders;

        // Add data rows
        payload.dataSource.forEach(item => {
            const rowData = Object.keys(item).map(key => item[key]); // Extract values based on keys
            worksheets.addRow(rowData);
        });

        // Set the file name
        let fileName = `${payload.worksheetName}-${this.FormatDate(new Date(), 'DD-mm-yyyy HH:mm:ss')}`;

        // Write to buffer and save as an Excel file
        this.Workbook.xlsx.writeBuffer().then((data) => {
            let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            fs.saveAs(blob, fileName + '.xlsx');
        });
    }

}
