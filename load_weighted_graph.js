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
  console.log('nodes count +1', graph.length);
  graph.forEach(function(item, i) {
    console.log(i, 'count', item.length);
  });
}

exports.loadGraphData = function (fileName, cb) {
  var regSplit = /\s+/;
  var graph = [];


  lineReader.eachLine(fileName, function(line) {
    var nodes = line.split(regSplit)
      .filter(notEmpty)
    var node = toI(nodes.shift());
    graph[node] = [];
    nodes.forEach(function (pair) {
      var arc = pair.split(',')
        .filter(notEmpty)
        .map(toI);

      graph[node].push({
        i: arc[0],
        L: arc[1]
      });
    });

  }).then(function () {
    cb(graph);
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
