import { EndRoute, Location } from "../types/types";
import { calculateRouteDijkstra } from "./dijkstra-algorithm";
import { DirectedGraph } from "./graph-service";

export async function calculateRouteAStar(startingPoint: Location, locations: Location[]): Promise<EndRoute> {
  const graph = new DirectedGraph();
  await graph.addVertex(startingPoint);

  for (const location of locations) {
    await graph.addVertex(location);
  }

  let distanceShorter = Infinity;
  const endRoute: EndRoute = { locationOrder: [], totalDistance: 0 };
  const possibleRoutes = getPossibleRoutes(locations);

  for (const route of possibleRoutes) {
    let totalDistance = 0;

    const startingPointToFirstPointOfRoute = graph.getDistanceBetweenVertices(startingPoint, route[0]);
    totalDistance += startingPointToFirstPointOfRoute;

    for (let i = 0; i < route.length - 1; i++) {
      const origin = route[i];
      const destiny = route[i + 1];
      const bestRouteBetweenLocations = await calculateRouteDijkstra(graph, origin, destiny);
      for (let j = 0; j < bestRouteBetweenLocations.length - 1; j++) {
        totalDistance += graph.getEdges(bestRouteBetweenLocations[j])!.get(bestRouteBetweenLocations[j + 1])!;
      }
    }

    if (totalDistance < distanceShorter) {
      distanceShorter = totalDistance;
      endRoute.locationOrder = route;
      endRoute.totalDistance = distanceShorter;
    }
  }

  return endRoute;
}

// Permutation
function getPossibleRoutes(locations: Location[]): Location[][] {
  if (locations.length === 0) {
    return [[]];
  }

  const first = locations[0];
  const rest = locations.slice(1);
  const perms = getPossibleRoutes(rest);
  const result: Location[][] = [];

  for (const perm of perms) {
    for (let i = 0; i <= perm.length; i++) {
      const newPermutation = perm.slice();
      newPermutation.splice(i, 0, first);
      result.push(newPermutation);
    }
  }

  return result;
}
