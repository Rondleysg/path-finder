import { AlgorithmResult, EndRoute, Location } from "../types/types";
import { DirectedGraph } from "./graph-service";

interface State {
  current: Location;
  visited: Location[];
  cost: number;
  path: Location[];
  f: number;
}

export async function calculateRouteAStar(
  startingPoint: Location,
  locations: Location[],
  graph: DirectedGraph
): Promise<AlgorithmResult> {
  const startTime = performance.now();
  const openList: State[] = [];

  const initialState: State = {
    current: startingPoint,
    visited: [startingPoint],
    cost: 0,
    path: [startingPoint],
    f: heuristic(startingPoint, locations, graph),
  };

  openList.push(initialState);
  let bestSolution: State | null = null;

  while (openList.length > 0) {
    openList.sort((a, b) => a.f - b.f);
    const currentState = openList.shift();
    if (!currentState) break;

    if (currentState.visited.length === locations.length + 1) {
      bestSolution = currentState;
      break;
    }

    const remainingLocations = locations.filter((loc) => !currentState.visited.includes(loc));

    for (const nextLoc of remainingLocations) {
      const stepCost = graph.getDistanceBetweenVertices(currentState.current, nextLoc);
      if (stepCost === Infinity) continue;

      const newCost = currentState.cost + stepCost;
      const newPath = [...currentState.path, nextLoc];
      const newVisited = [...currentState.visited, nextLoc];

      const h = heuristic(
        nextLoc,
        locations.filter((loc) => !newVisited.includes(loc)),
        graph
      );

      const newState: State = {
        current: nextLoc,
        visited: newVisited,
        cost: newCost,
        path: newPath,
        f: newCost + h,
      };

      openList.push(newState);
    }
  }

  let endRoute: EndRoute = { locationOrder: [], totalDistance: Infinity };

  if (bestSolution) {
    endRoute = {
      locationOrder: bestSolution.path.slice(1),
      totalDistance: bestSolution.cost,
    };
  }

  const endTime = performance.now();
  const executionTime = endTime - startTime;
  const algorithmResult: AlgorithmResult = { endRoute, executionTime };

  return algorithmResult;
}

function heuristic(current: Location, remaining: Location[], graph: DirectedGraph): number {
  if (remaining.length === 0) return 0;
  let minDist = Infinity;
  for (const loc of remaining) {
    const dist = graph.getDistanceBetweenVertices(current, loc);
    if (dist < minDist) {
      minDist = dist;
    }
  }
  return minDist;
}
