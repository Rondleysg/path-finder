import { Location } from "../types/types";
import { DirectedGraph } from "./graph-service";

export function calculateRouteDijkstra(
  graph: DirectedGraph,
  origin: Location,
  destiny: Location
): Location[] {
  const minimumVerticesDistance: Map<Location, number> = new Map();
  const verticesVisited: Set<Location> = new Set();
  const predecessorVertex: Map<Location, Location> = new Map();

  for (const vertex of graph.getAllVertices()) {
    minimumVerticesDistance.set(vertex, vertex === origin ? 0 : Infinity);
  }

  for (let i = 0; i < graph.getAllVertices().length; i++) {
    const smallestVertexCurrent = getVertexWithLowestCost(minimumVerticesDistance, verticesVisited);
    verticesVisited.add(smallestVertexCurrent);

    const edges = graph.getEdges(smallestVertexCurrent);

    edges!.forEach((distance, vertex) => {
      const totalDistance = minimumVerticesDistance.get(smallestVertexCurrent)! + distance;
      if (totalDistance < minimumVerticesDistance.get(vertex)!) {
        minimumVerticesDistance.set(vertex, totalDistance);
        predecessorVertex.set(vertex, smallestVertexCurrent);
      }
    });
  }

  const shortestPath: Location[] = [];
  let vertex = destiny;

  while (vertex) {
    shortestPath.unshift(vertex);
    vertex = predecessorVertex.get(vertex)!;
  }

  return shortestPath;
}

function getVertexWithLowestCost(cost: Map<Location, number>, visited: Set<Location>): Location {
  let smallestVertex: Location | null = null;
  let smallestCost = Infinity;

  for (const [vertex, currentCost] of cost.entries()) {
    if (currentCost <= smallestCost && !visited.has(vertex)) {
      smallestVertex = vertex;
      smallestCost = currentCost;
    }
  }

  return smallestVertex!;
}
