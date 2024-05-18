import { EndRoute, Location } from "../types/types";
import { DirectedGraph } from "./graph-service";

export async function calculateRouteNearestNeighbors(
  startingPoint: Location,
  locations: Location[]
): Promise<EndRoute> {
  const graph = new DirectedGraph();
  await graph.addVertex(startingPoint);

  for (const location of locations) {
    await graph.addVertex(location);
  }

  const endRoute: EndRoute = { locationOrder: [], totalDistance: 0 };

  let currentPoint = startingPoint;

  for (let i = 0; i < graph.getAllVertices().length; i++) {
    const nearestNeighborWithDistance = graph.getNearestNeighbor(currentPoint, endRoute.locationOrder, startingPoint);

    if (!nearestNeighborWithDistance.vertex) {
      break;
    }

    endRoute.locationOrder.push(nearestNeighborWithDistance.vertex);
    endRoute.totalDistance += nearestNeighborWithDistance.distance;

    currentPoint = nearestNeighborWithDistance.vertex;
  }

  return endRoute;
}
