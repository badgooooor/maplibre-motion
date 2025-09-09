import maplibregl, { GeoJSONSource } from 'maplibre-gl';
import { Position } from 'geojson';
import { FeatureCollectionGeoJSON, MotionRouteOptions } from './types';
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

/**
 * Creates and animates a motion route on a MapLibre GL map.
 * 
 * @param options - Configuration options for the motion route
 * @param options.id - Unique identifier for the route source and layer
 * @param options.map - MapLibre GL Map instance where the route will be displayed
 * @param options.route - Array of coordinate points defining the route path
 * @param options.layer - Layer configuration (excluding id, source, and type)
 * @param options.beforeId - Optional ID of an existing layer to insert this route before
 * @param options.distance - Distance in kilometers between interpolated points (default: 0.05)
 */
export const addMotionRoute = ({
  id,
  map,
  route,
  layer,
  beforeId,
  distance = 0.05
}: MotionRouteOptions) => {
  const geoJSON = createEmptyGeoJSONLineString()
  const interpolatedRouteCoordinates = interpolateCoordinates(route, distance)
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
