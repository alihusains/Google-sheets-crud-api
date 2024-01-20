

// code 2 with numbers

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

function readData(e) {
  var sheetName = e.parameter.sheet;
  var sheet = SpreadsheetApp.getActive().getSheetByName(sheetName);
  if (!sheet) {
    return ContentService.createTextOutput(JSON.stringify({status: "failed", sheetname: sheetName, result: "Sheet not found"})).setMimeType(ContentService.MimeType.JSON);
  }

  var data = sheet.getDataRange().getValues();
  var headers = data[0];

  // Get filter parameters from the request
  var filters = {};
  for (var param in e.parameter) {
    if (param !== 'sheet') {
      filters[param] = e.parameter[param];
    }
  }

  var filteredData = [];

  // Check if any filters are provided
  if (Object.keys(filters).length > 0) {
    // Iterate through data to filter based on headers and values
    for (var i = 1; i < data.length; i++) {
      var match = true;
      for (var header in filters) {
        var headerIndex = headers.indexOf(header);
        if (headerIndex !== -1 && String(data[i][headerIndex]) !== filters[header]) {
          match = false;
          break;
        }
      }
      if (match) {
        var obj = {};
        for (var j = 0; j < headers.length; j++) {
          obj[headers[j]] = data[i][j];
        }
        filteredData.push(obj);
      }
    }
  } else {
    // No filters provided, return the entire sheet
    for (var i = 1; i < data.length; i++) {
      var obj = {};
      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = data[i][j];
      }
      filteredData.push(obj);
    }
  }

  return ContentService.createTextOutput(JSON.stringify(filteredData)).setMimeType(ContentService.MimeType.JSON);
}

function addData(e) {
  // Add data implementation here
  // This function remains unchanged from the previous response
}

function updateData(e) {
  // Update data implementation here
  // This function remains unchanged from the previous response
}

function deleteData(e) {
  // Delete data implementation here
  // This function remains unchanged from the previous response
}


