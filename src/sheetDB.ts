import Spreadsheet = GoogleAppsScript.Spreadsheet;
const _ = Underscore.load();

export class SheetDB {

    private columns: Array<{ id: number, name: string }>;
    private sheet: Spreadsheet.Sheet;

    constructor(spreadsheet: Spreadsheet.Spreadsheet, sheetName: string) {
        if (spreadsheet != null && typeof sheetName === "string") {
            this.sheet = spreadsheet.getSheetByName(sheetName);
        }

        const getColumns: () => string[] = () => {
            const range: Spreadsheet.Range = this.sheet.getRange(1, 1, 1, this.sheet.getLastColumn()).trimWhitespace();
            const columns = range.getValues();
            return columns.reduce((previous, current) => previous.concat(current));
        };

        this.columns = getColumns().map((column, index) =>({ id: index, name: column}));
    }

    /* TODO:順序の保証を行う */
    public saveRecord(record: object) {
        const willSaveRecordColumns = Object.keys(record);
        const DBColumns = this.columns.map((column) => column.name);

        if (willSaveRecordColumns.toString() === DBColumns.toString()) {
            const range = this.sheet.getRange(this.sheet.getLastRow() + 1, 1, 1, this.sheet.getLastColumn())
            range.setValues([_.values(record)]);
        }
    }
}