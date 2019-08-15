import Spreadsheet = GoogleAppsScript.Spreadsheet;
import {SheetDB} from "./sheetDB";

export class Sheet {

    private spreadsheet: Spreadsheet.Spreadsheet;
    private sheets: Spreadsheet.Sheet[];

    constructor();
    constructor(id?: any) {
        if (typeof id === "string") {
            this.spreadsheet = SpreadsheetApp.openById(id);
        }

        if (this.spreadsheet == null && id == null) {
            this.spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        }

        this.sheets = this.spreadsheet.getSheets();
    }

    public saveRecord(record: object, sheetName: string) {
        const sheetDB = new SheetDB(this.spreadsheet, sheetName);
        sheetDB.saveRecord(record);
    }
}