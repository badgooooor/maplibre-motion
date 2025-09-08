import { LayerSpecification, Map } from 'maplibre-gl'

export type Coordinate = {
  lat: number
  lng: number
}

export type GeoJSONCoordinate = [number, number]

export type RouteGeoJSON = {
  type: 'Feature'
  properties: Record<string, unknown>
  geometry: {
    type: 'LineString'
    coordinates: GeoJSONCoordinate[]
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
