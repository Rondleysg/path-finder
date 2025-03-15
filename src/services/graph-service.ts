import { Location } from "../types/types";
import { calculateDistance } from "./map-service";

export class DirectedGraph {
  private vertices: Map<Location, Map<Location, number>>;

  constructor() {
    this.vertices = new Map<Location, Map<Location, number>>();
  }

  async addVertex(vertex: Location) {
    if (!this.vertices.has(vertex)) {
      this.vertices.set(vertex, new Map<Location, number>());
      await this.connectAllVertices(vertex);
    }
  }
  
  private async connectAllVertices(vertex: Location) {
    for (const otherVertex of this.vertices.keys()) {
      if (otherVertex !== vertex) {
        await this.addEdge(vertex, otherVertex);
      }
    }
  }

  async addEdge(origin: Location, destination: Location) {
    if (this.vertices.has(origin) && this.vertices.has(destination)) {
      const distanceGoing = await calculateDistance(origin.latlng, destination.latlng);
      const distanceTurn = await calculateDistance(destination.latlng, origin.latlng);
      this.vertices.get(origin)!.set(destination, distanceGoing);
      this.vertices.get(destination)!.set(origin, distanceTurn);
    }
  }

  getEdges(origin: Location): Map<Location, number> | undefined {
    return this.vertices.get(origin);
  }

  getAllVertices(): Location[] {
    return Array.from(this.vertices.keys());
  }

  getNearestNeighbor(
    origin: Location,
    visited: Location[],
    startingPoint: Location
  ): { vertex: Location | null; distance: number } {
    const edges = this.getEdges(origin);
    if (!edges) return { vertex: null, distance: Infinity };

    let nearestVertex: Location | null = null;
    let minDistance = Infinity;

    for (const [vertex, distance] of edges) {
      if (visited.includes(vertex) || vertex === startingPoint) continue;
      if (distance < minDistance) {
        nearestVertex = vertex;
        minDistance = distance;
      }
    }

    return { vertex: nearestVertex, distance: minDistance };
  }

  getDistanceBetweenVertices(origin: Location, destination: Location): number {
    const edges = this.getEdges(origin);
    if (!edges) return Infinity;

    return edges.get(destination) || Infinity;
  }
}
