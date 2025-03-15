import { AlgorithmResult, EndRoute, Location } from "../types/types";
import { DirectedGraph } from "./graph-service";

export async function calculateRouteNearestNeighbors(
  startingPoint: Location,
  graph: DirectedGraph
): Promise<AlgorithmResult> {
  const startTime = performance.now();
  const endRoute: EndRoute = { locationOrder: [], totalDistance: 0 };

  let currentPoint = startingPoint;

  for (let i = 0; i < graph.getAllVertices().length; i++) {
    const nearestNeighborWithDistance = graph.getNearestNeighbor(
      currentPoint,
      endRoute.locationOrder,
      startingPoint
    );

    if (!nearestNeighborWithDistance.vertex) {
      break;
    }

    endRoute.locationOrder.push(nearestNeighborWithDistance.vertex);
    endRoute.totalDistance += nearestNeighborWithDistance.distance;

    currentPoint = nearestNeighborWithDistance.vertex;
  }

  const endTime = performance.now();
  const executionTime = endTime - startTime;
  const algorithmResult: AlgorithmResult = { endRoute, executionTime };

  return algorithmResult;
}
