# @maplibre-motion/react

React wrapper for MapLibre Motion - animated route visualization on MapLibre GL maps.

## Installation

```bash
npm install @maplibre-motion/react @maplibre-motion/core
```

## Usage

```tsx
import { Map } from 'react-map-gl/maplibre'
import { MotionRoute } from '@maplibre-motion/react'

const route = [
  { lat: 40.7128, lng: -74.0060 },
  { lat: 40.7589, lng: -73.9851 }
]

<Map>
  <MotionRoute
    id="my-route"
    route={route}
    layer={{
      paint: {
        'line-color': '#ff0000',
        'line-width': 4
      }
    }}
  />
</Map>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | ✅ | Unique identifier for the route |
| `route` | `Coordinate[]` | ✅ | Array of coordinate points |
| `layer` | `MotionRouteLayer` | ✅ | MapLibre layer configuration |
| `beforeId` | `string` | ❌ | Insert before existing layer |
| `distance` | `number` | ❌ | Interpolation distance in km (default: 0.05) |
| `delay` | `number` | ❌ | Animation delay in ms (default: 100) |
