import maplibregl, { GeoJSONSource } from 'maplibre-gl';
import { Position } from 'geojson';
import { FeatureCollectionGeoJSON, MotionRouteLayerOptions } from './types';
import { interpolateCoordinates } from './utils';

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
  const interpolatedRouteCoordinates = interpolateCoordinates(route, 0.05)
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
    if (index < interpolatedRouteCoordinates.length) {
      geoJSON.features[0].geometry.coordinates = interpolatedRouteCoordinates.slice(0, index + 1) as Position[]
      (map.getSource(id) as GeoJSONSource)?.setData(geoJSON)
      index++
      requestAnimationFrame(animate)
    }
  }

  animate()
}
