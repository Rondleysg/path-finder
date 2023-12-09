import { Location } from "../types/types";
import { DirectedGraph } from "./graph-service";

export async function calculateRouteDijkstra(
  graph: DirectedGraph,
  origin: Location,
  destiny: Location
): Promise<Location[]> {
  const minimumVerticesDistance: Map<Location, number> = new Map();
  const verticesVisited: Set<Location> = new Set();
  const predecessorVertex: Map<Location, Location> = new Map();

  for (const vertex of graph.getAllVertices()) {
    minimumVerticesDistance.set(vertex, vertex === origin ? 0 : Infinity);
  }

  for (let i = 0; i < graph.getAllVertices().length; i++) {
    const smallestVerticeCurrent = getVerticeWithLowestCost(minimumVerticesDistance, verticesVisited);
    verticesVisited.add(smallestVerticeCurrent);

    const edges = graph.getEdges(smallestVerticeCurrent);

    edges!.forEach((distance, vertex) => {
      const totalDistance = minimumVerticesDistance.get(smallestVerticeCurrent)! + distance;
      if (totalDistance < minimumVerticesDistance.get(vertex)!) {
        minimumVerticesDistance.set(vertex, totalDistance);
        predecessorVertex.set(vertex, smallestVerticeCurrent);
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

function getVerticeWithLowestCost(cost: Map<Location, number>, visited: Set<Location>): Location {
  let smallestVertex: Location | null = null;
  let smallestCost = Infinity;

  for (const [vertice, currentCost] of cost.entries()) {
    if (currentCost <= smallestCost && !visited.has(vertice)) {
      smallestVertex = vertice;
      smallestCost = currentCost;
    }
  }

  return smallestVertex!;
}
