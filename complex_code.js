/* 
   filename: complex_code.js
   This code demonstrates a complex algorithm for finding the shortest path in a weighted graph using Dijkstra's algorithm.
*/

class Graph {
  constructor() {
    this.vertices = [];
    this.edges = {};
  }

  addVertex(vertex) {
    this.vertices.push(vertex);
    this.edges[vertex] = {};
  }

  addEdge(source, target, weight) {
    this.edges[source][target] = weight;
    this.edges[target][source] = weight;
  }

  dijkstra(source) {
    const dist = {};
    const visited = {};
    let currentVertex = source;

    // Initialize distances and visited flags
    this.vertices.forEach((vertex) => {
      dist[vertex] = Infinity;
      visited[vertex] = false;
    });
    dist[source] = 0;

    while (currentVertex !== null) {
      // Visit the current vertex
      visited[currentVertex] = true;

      // Update distances to neighboring vertices
      Object.keys(this.edges[currentVertex]).forEach((neighbor) => {
        const distance = this.edges[currentVertex][neighbor];
        const newDistance = dist[currentVertex] + distance;

        if (newDistance < dist[neighbor]) {
          dist[neighbor] = newDistance;
        }
      });

      // Find next unvisited vertex with the smallest distance
      let smallestDistance = Infinity;
      let smallestDistanceVertex = null;

      this.vertices.forEach((vertex) => {
        if (!visited[vertex] && dist[vertex] < smallestDistance) {
          smallestDistance = dist[vertex];
          smallestDistanceVertex = vertex;
        }
      });

      currentVertex = smallestDistanceVertex;
    }

    return dist;
  }
}

// Create a graph
const graph = new Graph();

// Add vertices
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');

// Add edges
graph.addEdge('A', 'B', 2);
graph.addEdge('A', 'C', 4);
graph.addEdge('B', 'C', 1);
graph.addEdge('B', 'D', 5);
graph.addEdge('C', 'D', 8);
graph.addEdge('C', 'E', 3);
graph.addEdge('D', 'E', 6);

// Run Dijkstra's algorithm
const shortestDistances = graph.dijkstra('A');

console.log(shortestDistances);
// Output: { A: 0, B: 2, C: 3, D: 7, E: 6 }