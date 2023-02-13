function doGet(e) {
var action = e.parameter.action;

switch(action) {
case 'read':
return readData(e);
default:
return ContentService.createTextOutput(JSON.stringify({status: "failed", result: "Invalid action"})).setMimeType(ContentService.MimeType.JSON);
}
}

function doPost(e) {
var action = e.parameter.action;

switch(action) {
case 'create':
return addData(e);
case 'update':
return updateData(e);
case 'delete':
return deleteData(e);
default:
return ContentService.createTextOutput(JSON.stringify({status: "failed", result: "Invalid action"})).setMimeType(ContentService.MimeType.JSON);
}
}

// function readData(e) {
// var sheetName = e.parameter.sheet;
// var sheet = SpreadsheetApp.getActive().getSheetByName(sheetName);
// if (!sheet) {
// return ContentService.createTextOutput(JSON.stringify({status: "failed",sheetname: sheetName,result:"Sheet not found"})).setMimeType(ContentService.MimeType.JSON);
// }

// var data = sheet.getDataRange().getValues();
// var headers = data[0];

// var result = [];
// for (var i = 1; i < data.length; i++) {
// var obj = {};
// for (var j = 0; j < headers.length; j++) {
// obj[headers[j]] = data[i][j];
// }
// result.push(obj);
// }
// return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
// }


// Updated READ DATA where it can also fetch single ID
function readData(e) {
  var sheetName = e.parameter.sheet;
  var sheet = SpreadsheetApp.getActive().getSheetByName(sheetName);
  if (!sheet) {
    return ContentService.createTextOutput(JSON.stringify({status: "failed",sheetname: sheetName,result:"Sheet not found"})).setMimeType(ContentService.MimeType.JSON);
  }

  var data = sheet.getDataRange().getValues();
  var headers = data[0];
  var idColumn = headers.indexOf("id");
  if (idColumn == -1) {
    return ContentService.createTextOutput(JSON.stringify({status: "failed",sheetname: sheetName,result:"Id column not found"})).setMimeType(ContentService.MimeType.JSON);
  }

  var id = e.parameter.id;
  if (id) {
    for (var i = 1; i < data.length; i++) {
      if (data[i][idColumn] == id) {
        var obj = {};
        for (var j = 0; j < headers.length; j++) {
          obj[headers[j]] = data[i][j];
        }
        return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
      }
    }
    return ContentService.createTextOutput(JSON.stringify({status: "failed",sheetname: sheetName,result:"Id not found"})).setMimeType(ContentService.MimeType.JSON);
  }

  var result = [];
  for (var i = 1; i < data.length; i++) {
    var obj = {};
    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = data[i][j];
    }
    result.push(obj);
  }
  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
}




// ==================

function addData(e) {
var json = JSON.parse(e.postData.contents);
var sheetName = json.sheet;
var sheet = SpreadsheetApp.getActive().getSheetByName(sheetName);
if (!sheet) {
return ContentService.createTextOutput(JSON.stringify({status: "failed",sheetname: sheetName,result:"Sheet not found"})).setMimeType(ContentService.MimeType.JSON);
}

var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
var idColumn = headers.indexOf("id");
if (idColumn == -1) {
headers.push("id");
sheet.getRange(1, headers.length).setValue("id");
idColumn = headers.indexOf("id");
}

var data = sheet.getDataRange().getValues();
var id = 1;
for (var i = 0; i < data.length; i++) {
if (data[i][idColumn] >= id) {
id = data[i][idColumn] + 1;
}
}

var row = [];
for (var j = 0; j < headers.length; j++) {
if (json[headers[j]]) {
row.push(json[headers[j]]);
} else {
row.push("");
}
}
row[idColumn] = id;
sheet.appendRow(row);
return ContentService.createTextOutput(JSON.stringify({status: "success",sheetname: sheetName,result:"Row added",rowDetails: json})).setMimeType(ContentService.MimeType.JSON);

}


function updateData(e) {
var json = JSON.parse(e.postData.contents);
var sheetName = json.sheet;
var sheet = SpreadsheetApp.getActive().getSheetByName(sheetName);
if (!sheet) {
return ContentService.createTextOutput(JSON.stringify({status: "failed",sheetname: sheetName,result:"Sheet not found"})).setMimeType(ContentService.MimeType.JSON);
}

var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
var idColumn = headers.indexOf("id");
if (idColumn == -1) {
return ContentService.createTextOutput(JSON.stringify({status: "failed",sheetname: sheetName,result:"id column not found"})).setMimeType(ContentService.MimeType.JSON);
}

var data = sheet.getDataRange().getValues();
var found = false;
for (var i = 0; i < data.length; i++) {
if (data[i][idColumn] == json.id) {
found = true;
break;
}
}

if (!found) {
return ContentService.createTextOutput(JSON.stringify({status: "failed",sheetname: sheetName,result:"Row not found"})).setMimeType(ContentService.MimeType.JSON);
}

for (var j = 0; j < headers.length; j++) {
if (json[headers[j]]) {
sheet.getRange(i + 1, j + 1).setValue(json[headers[j]]);
}
}
return ContentService.createTextOutput(JSON.stringify({status: "success",sheetname: sheetName,result:"Row updated", rowDetails:json})).setMimeType(ContentService.MimeType.JSON);
}





// 
function deleteData(e) {
var json = JSON.parse(e.postData.contents);
var sheetName = json.sheet;
var sheet = SpreadsheetApp.getActive().getSheetByName(sheetName);
if (!sheet) {
return ContentService.createTextOutput(JSON.stringify({status: "failed",sheetname: sheetName,result:"Sheet not found"})).setMimeType(ContentService.MimeType.JSON);
}

var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
var idColumn = headers.indexOf("id");
if (idColumn == -1) {
return ContentService.createTextOutput(JSON.stringify({status: "failed",sheetname: sheetName,result:"id column not found"})).setMimeType(ContentService.MimeType.JSON);
}

var data = sheet.getDataRange().getValues();
var found = false;
for (var i = 0; i < data.length; i++) {
if (data[i][idColumn] == json.id) {
found = true;
break;
}
}

if (!found) {
return ContentService.createTextOutput(JSON.stringify({status: "failed",sheetname: sheetName,result:"Row not found"})).setMimeType(ContentService.MimeType.JSON);
}

sheet.deleteRow(i + 1);
return ContentService.createTextOutput(JSON.stringify({status: "success",sheetname: sheetName,result:"Row deleted"})).setMimeType(ContentService.MimeType.JSON);
}

