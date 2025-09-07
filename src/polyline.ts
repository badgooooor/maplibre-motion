import maplibregl from 'maplibre-gl';

type Coordinate = {
  lat: number;
  lng: number;
}

type GeoJSONCoordinate = [number, number]

type RouteGeoJSON = {
  type: 'Feature';
  properties: {};
  geometry: {
    type: 'LineString';
    coordinates: GeoJSONCoordinate[];
  };
}

export const createGeoJSONLineString = (coordinates: GeoJSONCoordinate[]): RouteGeoJSON => {
  return {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates
    }
  }
}

export const applyRoute = (map: maplibregl.Map, id: string, route: Coordinate[]) => {
  const geoJSON = createGeoJSONLineString(route.map(coord => [coord.lng, coord.lat]))
  map.addSource(id, {
    type: 'geojson',
    data: geoJSON
  })

  // Add route line layer
  map.addLayer({
    'id': 'route',
    'type': 'line',
    'source': id,
    'layout': {
      'line-join': 'round',
      'line-cap': 'round'
    },
    'paint': {
      'line-color': '#888',
      'line-width': 8
    }
  })
}
