import { addMotionArc, MotionArcOptions } from "@maplibre-motion/core"
import { memo, useEffect } from "react"
import { useMap } from "react-map-gl/maplibre"

type MotionArcRouteProps = Omit<MotionArcOptions, 'map'>

export const MotionArc = memo((props: MotionArcRouteProps) => {
  const { current: mapRef } = useMap()

  if (!mapRef) {
    return null
  }

  useEffect(() => {
    const map = mapRef.getMap()
    if (!map) return

    map.on('load', () => {
      addMotionArc({
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
  }, [mapRef, props.id, props.startCoordinate, props.endCoordinate, props.layer])

  return null
})

MotionArc.displayName = 'MotionArc'
