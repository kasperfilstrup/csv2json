var csv = require('csv-parser')
var fs = require('fs')
var params = require('./params');

if (!params('file')) {
  return console.log('File parameter is missing.\n--file=<filename>\n or \n-f=<filename>');
}

var objs = {};
var keyDefinition = "";

var firstRowIsHeader = !!params('frh');

if (firstRowIsHeader) {
  var items = [];
  fs.createReadStream(params('file'))
  .pipe(csv())
  .on('data', function (data) {
    var obj = {};
    for (var key in data) {
      obj[key] = checkIfShouldBeArray(data[key]) ? data[key].split(',') : data[key];
      obj[key] = key !== 'itemno' ? convertNumericValues(obj[key]) : obj[key];
    }
    items.push(obj);
  })
  .on('end', function() {

    var fileOut = params('out') || 'outfile.json';
    fileOut = fileOut.substr(fileOut.length-5) === '.json' ? fileOut : (fileOut + '.json');
    fs.writeFile(fileOut, JSON.stringify(items, null, 2), 'utf8', function() {
      console.log(`File written: ${fileOut}`);
      process.exit(0);
    });
  });

} else {

  fs.createReadStream(params('file'))
    .pipe(csv())
    .on('headers', function (headerList) {
      keyDefinition = headerList[0];
    })
    .on('data', function (data) {
      for (var key in data) {
        if (!objs.hasOwnProperty(key) && key !== keyDefinition) {
          objs[key] = {};
        }
        if (key !== keyDefinition) {
          objs[key][data[keyDefinition]] = checkIfShouldBeArray(data[key]) ? data[key].split(',') : data[key];
        }
      }
    })
    .on('end', function() {
      var fileOut = params('out') || 'outfile.json';
      fileOut = fileOut.substr(fileOut.length-5) === '.json' ? fileOut : (fileOut + '.json');
      fs.writeFile(fileOut, JSON.stringify(objs, null, 2), 'utf8', function() {
        console.log(`File written: ${fileOut}`);
        process.exit(0);
      });
    });

}

function checkIfShouldBeArray(text) {
  return !!text.match(/\,/g);
}

function convertNumericValues(str) {
  if (!str) return "";
  if (Array.isArray(str)) {
    for (var i = 0, len = str.length; i < len; i++) {
      if (!isNaN(str[i])) {
        str[i] = parseFloat(str[i]);
      }
    }
  } else {
    if (!isNaN(str)) {
      str = parseFloat(str);
    }
  }
  return str;
}