// Compiled using ts2gas 3.4.4 (TypeScript 3.5.3)
var exports = exports || {};
var module = module || { exports: exports };
//import Spreadsheet = GoogleAppsScript.Spreadsheet;
//import _ from "lodash";
var SheetDB = /** @class */ (function () {
    function SheetDB(spreadsheet, sheetName) {
        var _this = this;
        if (spreadsheet != null && typeof sheetName === "string") {
            this.sheet = spreadsheet.getSheetByName(sheetName);
        }
        var getColumns = function () {
            var range = _this.sheet.getRange(1, 1, 1, _this.sheet.getLastColumn()).trimWhitespace();
            var columns = range.getValues();
            return columns.reduce(function (previous, current) { return previous.concat(current); });
        };
        this.columns = getColumns().map(function (column, index) { return ({ id: index, name: column }); });
    }
    /* TODO:順序の保証を行う */
    SheetDB.prototype.saveRecord = function (record) {
        var willSaveRecordColumns = Object.keys(record);
        var DBColumns = this.columns.map(function (column) { return column.name; });
        if (willSaveRecordColumns.toString() === DBColumns.toString()) {
            var range = this.sheet.getRange(this.sheet.getLastRow() + 1, 1, 1, this.sheet.getLastColumn());
            range.setValues([_.values(record)]);
        }
    };
    return SheetDB;
}());
exports.SheetDB = SheetDB;
