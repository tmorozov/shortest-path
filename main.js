#!/usr/bin/env node

var program = require('commander');
var fwgraph = require('./load_weighted_graph.js');
var shortPath = require('./short_path');

var INPUT_FILE_DEFAULT = "./samples/dijkstraData.txt";

function clone(fn) {
    // Workaround for commander.js issue.
    // http://stackoverflow.com/a/6772648
    return fn.bind({});
};

function onGraph(graph) {
//  fwgraph.showStats(graph);
  var shortestPaths = shortPath.calcPathsFrom(graph, 1);
  var nodesStr = '7,37,59,82,99,115,133,165,188,197';
  var nodes = nodesStr.split(',')
    .map(function(item) {
      return ~~item;
    });
  shortPath.showStats(shortestPaths, nodes);
}

if(require.main == module) {
  program
    .option('-f, --file <file>', 'Path to file with data', clone(fwgraph.assertFileExists), INPUT_FILE_DEFAULT)
    .parse(process.argv);

  var graph = fwgraph.loadGraphData(program.file, onGraph);
} else {
//  exports.checkHtmlFile = countInversions;
}
