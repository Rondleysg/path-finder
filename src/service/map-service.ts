import { mapStyle } from "../styles/mapStyle";
import { LatLngLiteral, Location, TabsMap } from "../types/types";
import { calculateRouteAStar } from "./a-star-algorithm";
import { calculateRouteNearestNeighbors } from "./k-nearest-neighbors-algorithm";

export const setMap = async (locations: Location[], startingPoint: Location, algorithm: TabsMap) => {
  console.log("Setting map:", algorithm);

  const directionsServiceMap = new google.maps.DirectionsService();
  const directionsRendererMap = new google.maps.DirectionsRenderer();

  const map = new google.maps.Map(document.getElementById(`map-${algorithm}`) as HTMLElement, {
    center: startingPoint.latlng,
    zoom: 13,
    styles: mapStyle,
  });

  directionsRendererMap.setMap(map);
  directionsRendererMap.setOptions({
    polylineOptions: {
      strokeColor: "#E81CFF",
      strokeWeight: 4,
      icons: [
        {
          icon: {
            path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
            fillColor: "#E81CFF",
            fillOpacity: 0.5,
          }
        }
      ],
    },
  });

  async function plotMap(
    originPoint: google.maps.LatLngLiteral,
    route: google.maps.LatLngLiteral[],
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

    try {
      await directionsService.route(request, function (result, status) {
        if (status === "OK") {
          directionsRenderer.setDirections(result);
        }
      });
    } catch (error) {
      console.error("Error plotting map:", error);
    }
  }

  try {
    if (algorithm === "a-star") {
      const route = await calculateRouteAStar(startingPoint, locations);
      plotMap(
        startingPoint.latlng,
        route.locationOrder.map((location) => location.latlng),
        directionsServiceMap,
        directionsRendererMap
      );

      const linkMapGoogle = generateGoogleMapLink(route.locationOrder, startingPoint.latlng);

      document.getElementById(
        "map-dist"
      )!.innerHTML = `Total route distance: ${route.totalDistance.toString()}m`;
      const linkMap = document.getElementById("link-map")!;
      linkMap.setAttribute("href", linkMapGoogle);
      linkMap.innerHTML = "Link to Google Maps";
      document.getElementById("link-map")!.setAttribute("href", linkMapGoogle);
      return map;
    }

    const routeNearestNeighbors = await calculateRouteNearestNeighbors(startingPoint, locations);

    plotMap(
      startingPoint.latlng,
      routeNearestNeighbors.locationOrder.map((location) => location.latlng),
      directionsServiceMap,
      directionsRendererMap
    );

    const linkMapGoogle = generateGoogleMapLink(routeNearestNeighbors.locationOrder, startingPoint.latlng);

    document.getElementById(
      "map-dist"
    )!.innerHTML = `Total route distance: ${routeNearestNeighbors.totalDistance.toString()}m`;

    const linkMap = document.getElementById("link-map")!;

    linkMap.setAttribute("href", linkMapGoogle);
    linkMap.innerHTML = "Link to Google Maps";
    document.getElementById("link-map")!.setAttribute("href", linkMapGoogle);
  } catch (error) {
    console.error("Error calculating route:", error);
  }

  return map;
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

  try {
    const response = await service.getDistanceMatrix(request);

    if (response.rows.length > 0 && response.rows[0].elements.length > 0) {
      return response.rows[0].elements[0].distance.value;
    } else {
      throw new Error("No distance information available.");
    }
  } catch (error) {
    console.error("Error calculating distance:", error);
    throw error;
  }
}

export async function getLatLngFromAddress(fullAddress: string): Promise<LatLngLiteral | string> {
  const geoCoderService = new google.maps.Geocoder();

  const request = {
    address: fullAddress,
  };

  try {
    const { results } = await geoCoderService.geocode(request);

    if (results && results.length > 0) {
      const lat = results[0].geometry.location.lat();
      const lng = results[0].geometry.location.lng();

      return { lat, lng };
    } else {
      return "Unable to get coordinates for the provided address. Empty results.";
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.code === google.maps.GeocoderStatus.ZERO_RESULTS) {
      return "Unable to get coordinates for the provided address. No results.";
    }

    return `Error geocoding the address: ${error}`;
  }
}

export async function getAddressFromLatLng(
  latLng: LatLngLiteral
): Promise<google.maps.GeocoderResult | string> {
  const geoCoderService = new google.maps.Geocoder();

  const request = {
    location: latLng,
  };

  try {
    const { results } = await geoCoderService.geocode(request);

    if (results && results.length > 0) {
      const address = results[0];
      return address;
    } else {
      return "Unable to get coordinates for the provided address. Empty results.";
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.code === google.maps.GeocoderStatus.ZERO_RESULTS) {
      return "Unable to get coordinates for the provided address. No results.";
    }

    return `Error geocoding the address: ${error}`;
  }
}
