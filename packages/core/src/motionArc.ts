import { GeoJSONSource } from 'maplibre-gl'
import { createEmptyGeoJSONLineString, interpolateArcCoordinates } from './utils'
import { Position } from 'geojson'
import { MotionArcOptions } from './types'

/**
 * Crete an animated arc route on a MapLibre GL map
 */
export const addMotionArc = ({
  id,
  map,
  startCoordinate,
  endCoordinate,
  layer,
  beforeId,
  distance = 0.05,
  delay = 100,
  arcHeightPercentage = 0.4
}: MotionArcOptions) => {
  const geoJSON = createEmptyGeoJSONLineString()
  const interpolatedRouteCoordinates = interpolateArcCoordinates(startCoordinate, endCoordinate, distance, arcHeightPercentage)
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

  setTimeout(animate, delay)
}