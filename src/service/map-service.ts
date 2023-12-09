import { LatLngLiteral, Location } from "../types/types";
import { calculateRouteAStar } from "./a-star-algorithm";

export const setMap = (locations: Location[], startingPoint: LatLngLiteral) => {
  const directionsServiceMapAStar = new google.maps.DirectionsService();
  const directionsRendererMapAStar = new google.maps.DirectionsRenderer();

  const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    center: startingPoint,
    zoom: 13,
  });

  directionsRendererMapAStar.setMap(map);

  async function plotMap(
    originPoint: LatLngLiteral,
    route: LatLngLiteral[],
    directionsService: google.maps.DirectionsService,
    directionsRenderer: google.maps.DirectionsRenderer
  ) {
    const routeWithoutDestination = route.slice(0, route.length - 1);
    const waypoints = routeWithoutDestination.map((loc) => {
      return {
        location: loc,
      };
    });

    const request = {
      origin: originPoint,
      destination: route[route.length - 1],
      waypoints: waypoints,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, function (result, status) {
      if (status === "OK") {
        directionsRenderer.setDirections(result);
      }
    });
  }

  calculateRouteAStar(startingPoint, locations).then((route) => {
    plotMap(
      startingPoint,
      route.locationOrder.map((location) => location.latlng),
      directionsServiceMapAStar,
      directionsRendererMapAStar
    );

    const linkMapGoogle = generateGoogleMapLink(route.locationOrder, startingPoint);

    document.getElementById("map-dist")!.innerHTML = `Distancia total da rota: ${route.totalDistance.toString()}m`;
    document.getElementById("link-map")!.setAttribute("href", linkMapGoogle);
  });
};

export function generateGoogleMapLink(route: Location[], startingPoint: LatLngLiteral): string {
  const destiny = route[route.length - 1];
  const waypoints = route
    .filter((local) => local !== destiny)
    .map((local) => `/${local.latlng.lat},${local.latlng.lng}`)
    .join("");

  const baseGoogleMapsURL = "https://www.google.com/maps/dir/";
  const params = `/data=!4m2!4m1!3e0?entry=ttu`;
  const destinyURL = `/${destiny.latlng.lat},${destiny.latlng.lng}`;
  const directionsURL =
    baseGoogleMapsURL + startingPoint.lat + "," + startingPoint.lng + waypoints + destinyURL + params;
  return directionsURL;
}

export async function calculateDistance(origin: LatLngLiteral, destination: LatLngLiteral): Promise<number> {
  const service = new google.maps.DistanceMatrixService();

  const request = {
    origins: [origin],
    destinations: [destination],
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.METRIC,
    avoidHighways: false,
    avoidTolls: false,
  };

  const response = await service.getDistanceMatrix(request);

  const distance = response.rows[0].elements[0].distance.value;

  return distance;
}
