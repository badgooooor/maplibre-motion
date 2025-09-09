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

export type MotionRouteLayerOptions = {
  id: string;
  map: Map,
  route: Coordinate[],
  layer: MotionRouteLayer,
  beforeId?: string
}
