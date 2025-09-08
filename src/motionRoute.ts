import maplibregl, { GeoJSONSource } from 'maplibre-gl';
import { FeatureCollectionGeoJSON, GeoJSONCoordinate, MotionRouteLayer, MotionRouteLayerOptions } from './types';

const createEmptyGeoJSONLineString = (): FeatureCollectionGeoJSON => {
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

export const addMotionRoute = ({
  id,
  map,
  route,
  layer,
  beforeId
}: MotionRouteLayerOptions) => {
  const geoJSON = createEmptyGeoJSONLineString()
  const routeCoordinates = route.map(coord => [coord.lng, coord.lat])

  map.addSource(id, {
    type: 'geojson',
    data: geoJSON
  })

  map.addLayer({
    ...layer,
    type: 'line',
    id,
    source: id
  } as maplibregl.LayerSpecification, beforeId)

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
