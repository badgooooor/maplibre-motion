import { Position } from 'geojson'
import { LayerSpecification, Map } from 'maplibre-gl'

export type Coordinate = {
  lat: number
  lng: number
}

export type RouteGeoJSON = {
  type: 'Feature'
  properties: Record<string, unknown>
  geometry: {
    type: 'LineString'
    coordinates: Position[]
  }
}

export type FeatureCollectionGeoJSON = {
  type: 'FeatureCollection'
  features: RouteGeoJSON[]
}

export type MotionRouteLayer = Omit<LayerSpecification, 'id' | 'source' | 'type'>

/**
 * Configuration options for creating an animated motion route on a MapLibre GL map.
 * 
 * @example
 * ```typescript
 * const options: MotionRouteLayerOptions = {
 *   id: 'my-route',
 *   map: mapInstance,
 *   route: [
 *     { lat: 40.7128, lng: -74.0060 },
 *     { lat: 40.7589, lng: -73.9851 }
 *   ],
 *   layer: {
 *     paint: {
 *       'line-color': '#ff0000',
 *       'line-width': 4
 *     }
 *   },
 *   distance: 0.01
 * }
 * ```
 */
export type MotionRouteOptions = {
  /** Unique identifier for the route source and layer */
  id: string
  /** MapLibre GL Map instance where the route will be displayed */
  map: Map
  /** Array of coordinate points defining the route path */
  route: Coordinate[]
  /** Layer configuration (excluding id, source, and type which are handled automatically) */
  layer: MotionRouteLayer
  /** Optional ID of an existing layer to insert this route before */
  beforeId?: string
  /** Distance in kilometers between interpolated points for smoother animation with unit of kilometers (default: 0.05) */
  distance?: number
}
