import { Location } from "../types/types";

export default function hasStartingPoint(startingPoint: Location | undefined): boolean {
  return !(
    startingPoint?.latlng.lat === 0 &&
    startingPoint?.latlng.lng === 0 &&
    startingPoint?.endName === ""
  );
}
