export type Coordinate = {
  lat: number;
  lng: number;
}


export type GeoJSONCoordinate = [number, number]

export type RouteGeoJSON = {
  type: 'Feature';
  properties: {};
  geometry: {
    type: 'LineString';
    coordinates: GeoJSONCoordinate[];
  };
}

export type FeatureCollectionGeoJSON = {
  type: 'FeatureCollection';
  features: RouteGeoJSON[];
}
