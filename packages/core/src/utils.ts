import { lineString, point } from "@turf/helpers"
import { length } from "@turf/length"
import { along } from "@turf/along"
import lineDistance from "@turf/line-distance"
import { Coordinate, FeatureCollectionGeoJSON } from "./types"
import { Position } from "geojson"

// Helper functions to convert degrees to radians and vice versa
const toRad = (deg: number) => deg * Math.PI / 180

const toDeg = (rad: number) => rad * 180 / Math.PI

export const createEmptyGeoJSONLineString = (): FeatureCollectionGeoJSON => {
  return {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: []
        }
      }
    ]
  }
}

export const toGeoJSONCoordinates = (coordinates: Coordinate[]): Position[] => {
  return coordinates.map(coord => [coord.lng, coord.lat])
}

// Interpolate coordinates along a route
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

// Interpolate coordinates along an arc with a quadratic Bézier curve
export const interpolateArcCoordinates = (startCoordinate: Coordinate, endCoordinate: Coordinate, distance: number, arcHeightPercentage: number = 0.4): Position[] => {
  const startPoint = point([startCoordinate.lng, startCoordinate.lat])
  const endPoint = point([endCoordinate.lng, endCoordinate.lat])
  const straightLine = lineString([startPoint.geometry.coordinates, endPoint.geometry.coordinates])
  const straightDistance = lineDistance(straightLine, 'kilometers')
  
  const midLat = (startCoordinate.lat + endCoordinate.lat) / 2
  const midLng = (startCoordinate.lng + endCoordinate.lng) / 2
  
  const deltaLng = toRad(endCoordinate.lng - startCoordinate.lng)
  const startLatRad = toRad(startCoordinate.lat)
  const endLatRad = toRad(endCoordinate.lat)
  
  const y = Math.sin(deltaLng) * Math.cos(endLatRad)
  const x = Math.cos(startLatRad) * Math.sin(endLatRad) - Math.sin(startLatRad) * Math.cos(endLatRad) * Math.cos(deltaLng)
  const bearing = Math.atan2(y, x)
  
  const perpendicularBearing = bearing + Math.PI / 2
  
  const arcHeight = straightDistance * arcHeightPercentage
  
  const earthRadius = 6371 // Earth radius in kilometers
  const offsetDistance = arcHeight
  
  const controlLat = midLat + (offsetDistance / earthRadius) * Math.cos(perpendicularBearing) * (180 / Math.PI)
  const controlLng = midLng + (offsetDistance / earthRadius) * Math.sin(perpendicularBearing) * (180 / Math.PI) / Math.cos(toRad(midLat))
  
  const interpolatedCoordinates: Position[] = []
  const numPoints = Math.ceil(straightDistance / distance)
  
  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints
    
    // Quadratic Bézier curve: B(t) = (1-t)²P₀ + 2(1-t)tP₁ + t²P₂
    // where P₀ = start, P₁ = control, P₂ = end
    const lat = Math.pow(1 - t, 2) * startCoordinate.lat + 
                2 * (1 - t) * t * controlLat + 
                Math.pow(t, 2) * endCoordinate.lat
    
    const lng = Math.pow(1 - t, 2) * startCoordinate.lng + 
                2 * (1 - t) * t * controlLng + 
                Math.pow(t, 2) * endCoordinate.lng
    
    interpolatedCoordinates.push([lng, lat])
  }
  
  return interpolatedCoordinates
}
