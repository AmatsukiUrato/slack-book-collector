// Compiled using ts2gas 3.4.4 (TypeScript 3.5.3)
var exports = exports || {};
var module = module || { exports: exports };
//import Config from "./config";
//import {Sheet} from "./spread";
function doPost(event) {
    var message = createPureText(event.parameter);
    switch (event.parameter.trigger_word) {
        case "!b w":
            saveWord(message);
            break;
        case "!b t":
            saveTitle(message);
            break;
    }
    postSlack("保存が完了したよ！");
}
function postSlack(text) {
    var url = Config.WEB_HOOK_URL;
    var options = {
        headers: { "Content-type": "application/json" },
        method: "post",
        payload: '{"text":"' + text + '"}'
    };
    UrlFetchApp.fetch(url, options);
}
function createPureText(parameter) {
    var text = parameter["text"];
    var prefix = parameter["trigger_word"];
    return text.replace(prefix, "");
}
function saveWord(message) {
}
function saveTitle(message) {
}
function testFunc() {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getActiveSheet();
    var range = spreadsheet.getActiveSheet().getRange(1, 1, 1, sheet.getLastColumn());
    Logger.log(range.getValues());
}
function testSave() {
    var sheet = new Sheet();
    var record = {
        id: 1,
        word: "XXXの本"
    };
    sheet.saveRecord(record, "word");
}
