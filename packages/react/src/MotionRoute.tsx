import { addMotionRoute, MotionRouteOptions } from "@maplibre-motion/core"
import { memo, useEffect } from "react"
import { useMap } from "react-map-gl/maplibre"

type MotionRouteProps = Omit<MotionRouteOptions, 'map'>

export const MotionRoute = memo((props: MotionRouteProps) => {
  const { current: mapRef } = useMap()

  if (!mapRef) {
    return null
  }

  useEffect(() => {
    const map = mapRef.getMap()
    if (!map) return

    map.on('load', () => {
      addMotionRoute({
        ...props,
        map: map as any
      })
    })

    return () => {
      if (map.getSource(props.id)) {
        if (map.getLayer(props.id)) {
          map.removeLayer(props.id)
        }
        map.removeSource(props.id)
      }
    }
  }, [mapRef, props.id, props.route, props.layer])

  return null
})

MotionRoute.displayName = 'MotionRoute'
