import maplibregl, { GeoJSONSource } from 'maplibre-gl';

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

type FeatureCollectionGeoJSON = {
  type: 'FeatureCollection';
  features: RouteGeoJSON[];
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

export const addMotionRoute = (map: maplibregl.Map, id: string, route: Coordinate[]) => {
  let geoJSON = createEmptyGeoJSONLineString()
  const routeCoordinates = route.map(coord => [coord.lng, coord.lat])

  map.addSource(id, {
    type: 'geojson',
    data: geoJSON
  })

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

  let index = 0
  function animate() {
    if (index < route.length) {
      geoJSON.features[0].geometry.coordinates = routeCoordinates.slice(0, index + 1) as GeoJSONCoordinate[]
      (map.getSource(id) as GeoJSONSource)?.setData(geoJSON)
      index++
      requestAnimationFrame(animate)
    }
  }

  animate()
}
