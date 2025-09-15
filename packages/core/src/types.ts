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

export type MotionComponentLayer = Omit<LayerSpecification, 'id' | 'source' | 'type'>

/**
 * Base configuration options shared by all motion components.
 * 
 * @example
 * ```typescript
 * const baseOptions: MotionComponentOptions = {
 *   id: 'my-component',
 *   map: mapInstance,
 *   layer: {
 *     paint: { 'line-color': '#ff0000', 'line-width': 4 }
 *   },
 *   beforeId: 'existing-layer',
 *   delay: 100
 * };
 * ```
 */
export type MotionComponentOptions = {
  /** Unique identifier for the component's layer and source */
  id: string
  /** MapLibre GL map instance where the component will be rendered */
  map: Map
  /** MapLibre GL layer configuration (excluding id, source, and type which are handled automatically) */
  layer: MotionComponentLayer
  /** Optional layer ID to insert the component before (for layer ordering) */
  beforeId?: string
  /** Delay in milliseconds before starting the animation (default: 0) */
  delay?: number
}

/**
 * Configuration options for creating an animated motion route on a MapLibre GL map.
 * 
 * @example
 * ```typescript
 * const options: MotionRouteOptions = {
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
export type MotionRouteOptions = MotionComponentOptions & {
  /** Array of coordinate points defining the route path */
  route: Coordinate[]
  /** Distance in kilometers between interpolated points for smoother animation with unit of kilometers (default: 0.05) */
  distance?: number
}

/**
 * Configuration options for creating an animated arc route on a MapLibre GL map.
 * 
 * @example
 * ```typescript
 * const arcOptions: MotionArcOptions = {
 *   id: 'flight-arc',
 *   map: mapInstance,
 *   startCoordinate: { lat: 13.6817, lng: 100.7482 }, // Bangkok Airport
 *   endCoordinate: { lat: 35.0, lng: 133.0 }, // Japan's western coast
 *   layer: {
 *     layout: { 'line-join': 'round', 'line-cap': 'round' },
 *     paint: { 'line-color': '#ff6b35', 'line-width': 4 }
 *   },
 *   distance: 50, // 50km between interpolated points
 *   delay: 100, // 100ms delay before animation starts
 *   arcHeightPercentage: 0.4 // Arc height is 40% of straight-line distance
 * };
 * ```
 */
export type MotionArcOptions = MotionComponentOptions & {
  /** Starting coordinate for the arc (latitude and longitude) */
  startCoordinate: Coordinate
  /** Ending coordinate for the arc (latitude and longitude) */
  endCoordinate: Coordinate
  /** 
   * Distance in kilometers between interpolated points along the arc.
   * Smaller values create smoother curves but more points.
   * @default 0.05
   */
  distance?: number
  /** 
   * Height of the arc as a percentage of the straight-line distance.
   * 0.0 = straight line, 0.4 = 40% of distance height, 1.0 = 100% of distance height.
   * @default 0.4
   */
  arcHeightPercentage?: number
}
