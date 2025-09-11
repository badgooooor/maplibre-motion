import { lineString } from "@turf/helpers"
import { length } from "@turf/length"
import { along } from "@turf/along"
import { Coordinate } from "./types"
import { Position } from "geojson"

export const toGeoJSONCoordinates = (coordinates: Coordinate[]): Position[] => {
  return coordinates.map(coord => [coord.lng, coord.lat])
}

export const interpolateCoordinates = (coordinates: Coordinate[], distance: number): Position[] => {
  const route = lineString(toGeoJSONCoordinates(coordinates))
  const routeLength = length(route)
  const interpolatedCoordinates: Position[] = []
  for (let i = 0; i < routeLength; i += distance) {
    const interpolatedPoint = along(route, i)
    const [lng, lat] = interpolatedPoint.geometry.coordinates
    interpolatedCoordinates.push([lng, lat])
  }
  return interpolatedCoordinates
}
