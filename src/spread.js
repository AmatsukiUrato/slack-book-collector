// Compiled using ts2gas 3.4.4 (TypeScript 3.5.3)
var exports = exports || {};
var module = module || { exports: exports };
//import Spreadsheet = GoogleAppsScript.Spreadsheet;
//import {SheetDB} from "./sheetDB";
var Sheet = /** @class */ (function () {
    function Sheet(id) {
        if (typeof id === "string") {
            this.spreadsheet = SpreadsheetApp.openById(id);
        }
        if (this.spreadsheet == null && id == null) {
            this.spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        }
        this.sheets = this.spreadsheet.getSheets();
    }
    Sheet.prototype.saveRecord = function (record, sheetName) {
        var sheetDB = new SheetDB(this.spreadsheet, sheetName);
        sheetDB.saveRecord(record);
    };
    return Sheet;
}());
exports.Sheet = Sheet;
