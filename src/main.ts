import Config from "./config";
import {Sheet} from "./spread";

function doPost(event: GoogleAppsScript.Events.AppsScriptHttpRequestEvent) {
    const message = createPureText(event.parameter);

    switch (event.parameter.trigger_word) {
        case "!b w":
            saveWord(message);
            break;
        case "!b t":
            saveTitle(message);
            break;
    }
    postSlack("保存が完了しました！");
}

function postSlack(text: string) {
    const url = Config.WEB_HOOK_URL;
    const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
        headers: {"Content-type": "application/json"},
        method: "post",
        payload: '{"text":"' + text + '"}',
    };
    UrlFetchApp.fetch(url, options);
}

function createPureText(parameter: object) {
    const text: string = parameter["text"];
    const prefix: string = parameter["trigger_word"];
    return text.replace(prefix, "").substr(1);
}

function saveWord(message: string) {
    const sheet = new Sheet();
    const record = {
        id: 1,
        word: message,
    };
    sheet.saveRecord(record, "word");
}

function saveTitle(message: string) {

}

function testFunc() {
    let spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = spreadsheet.getActiveSheet();
    let range = spreadsheet.getActiveSheet().getRange(1, 1, 1, sheet.getLastColumn());
    Logger.log(range.getValues());
}

function testSave() {
    const sheet = new Sheet();
    const record = {
        id: 1,
        word: "XXXの本",
    };
    sheet.saveRecord(record, "word");

}