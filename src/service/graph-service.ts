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
    for (const otherVertice of this.vertices.keys()) {
      if (otherVertice !== vertex) {
        await this.addEdge(vertex, otherVertice);
      }
    }
  }

  async addEdge(origin: Location, desnity: Location) {
    if (this.vertices.has(origin) && this.vertices.has(desnity)) {
      const distanceGoing = await calculateDistance(origin.latlng, desnity.latlng);
      const distanceTurn = await calculateDistance(desnity.latlng, origin.latlng);
      this.vertices.get(origin)!.set(desnity, distanceGoing);
      this.vertices.get(desnity)!.set(origin, distanceTurn);
    }
  }

  getEdges(origin: Location): Map<Location, number> | undefined {
    return this.vertices.get(origin);
  }

  getAllVertices(): Location[] {
    return Array.from(this.vertices.keys());
  }
}
