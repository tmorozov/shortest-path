var fs = require('fs');
var lineReader = require('line-reader');


function notEmpty(str) {
  return !!str.length;
}

function toI(item) {
  // use of ~~ to convert to int
  return ~~item;
}

exports.showStats = function (graph) {
}

exports.loadGraphData = function (fileName, cb) {
  var regSplit = /\s+/;

  lineReader.eachLine(fileName, function(line) {
    var arc = line.split(regSplit)
      .filter(notEmpty)

  }).then(function () {
    cb({
    });
  });

}

exports.assertFileExists = function(file) {
    var instr = file.toString();
    if(!fs.existsSync(instr)) {
        console.log("%s does not exist. Exiting.", instr);
        process.exit(1); // http://nodejs.org/api/process.html#process_process_exit_code
    }
    return instr;
};
