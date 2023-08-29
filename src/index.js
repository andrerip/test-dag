const graphlib = require("graphlib");

const graph = new graphlib.Graph();

// Add nodes for each request
graph.setNode("RequestA");
graph.setNode("RequestB");
graph.setNode("RequestC");

function addEdgeWithCycleDetection(graph, from, to) {
  // Add the edge
  graph.setEdge(from, to);

  // Perform cycle detection on the updated graph
  if (!graphlib.alg.isAcyclic(graph)) {
    console.log("Adding this edge created a cycle. Removing the edge.");
    graph.removeEdge(from, to);
  }
}

// Add edges with cycle detection
addEdgeWithCycleDetection(graph, "RequestA", "RequestB");
addEdgeWithCycleDetection(graph, "RequestB", "RequestC");
addEdgeWithCycleDetection(graph, "RequestC", "RequestA"); // This would create a cycle and be removed

function makeRequest(requestName) {
  // simulate making a request
  console.log(`Making request: ${requestName}`);
}

function executeRequests(graph) {
  // Get the order in which the requests should be executed
  const order = graphlib.alg.topsort(graph);

  // Execute each request in the determined order
  order.forEach(request => {
    makeRequest(request);
  });
}

executeRequests(graph);
