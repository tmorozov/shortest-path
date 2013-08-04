function findNearest(graph, X, A) {
  // as forEach shows only set values - we could use it for checking visited nodes!
  var minArc = {
    i: 0,
    L: 1000000000
  };
//console.log(X);
  X.forEach(function(item) {
    var arcs = graph[item];
//console.log('near', item);
    arcs.forEach( function(arc) {
//console.log('arc', arc);
      if (X[arc.i]) {
        // ignore inserted
//console.log('ignore', arc);
        return;
      }
      var nextLength = A[item] + arc.L;
//console.log(item, A[item], nextLength);
      if (nextLength < minArc.L) {
//console.log('use', arc);
        minArc.L = nextLength;
        minArc.i = arc.i;
      }
    });
  });

  return minArc;
}

function distance (graph, from, to) {
  if( from === to ) {
    return 0;
  }

  var X = [from];
  var A = [];
  A[from] = 0;
  var count = graph.length;
  while(count > 0) {
    var nearest = findNearest(graph, X, A);
    if (nearest.i === 0) {
      A[to] = 1000000;
      break;
    }
    
    A[nearest.i] = nearest.L;
    X.push(nearest.i);
    if (to === nearest.i) {
      break;
    }
    count--;
  }
  return A[to];
}

exports.calcPathsFrom = function (graph, from) {
  var res = [];
  graph.forEach(function(item, i) {
    var dist = distance(graph, from, i);
console.log('dist', from, i, 'is', dist);
    res[i] = dist;
  });
  return res;
};

exports.showStats = function (paths, nodes) {
  nodes.forEach(function (i) {
    console.log('node', i, 'dist', paths[i]);
  });
//  console.log(paths);
}

