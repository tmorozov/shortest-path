function distance (graph, from, to) {
  if( from === to ) {
    return 0;
  }

}

exports.calcPathsFrom = function (graph, from) {
  var res = [];
  graph.forEach(function(item, i) {
    var dist = distance(graph, from, i);
    res[i] = dist;
  });
  return res;
};

exports.showStats = function (paths) {
  console.log(paths);
}

