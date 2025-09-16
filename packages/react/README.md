# @maplibre-motion/react

React wrapper for MapLibre Motion - animated route visualization on MapLibre GL maps.

## Installation

```bash
npm install @maplibre-motion/react react-map-gl/maplibre
```

## Usage

### MotionRoute

React component for creating animated route visualization on MapLibre GL maps.

#### Definition

```tsx
MotionRoute(props: MotionRouteProps): JSX.Element
```

#### Types

```typescript
type Coordinate = {
  lat: number
  lng: number
}

type MotionRouteProps = {
  id: string
  route: Coordinate[]
  layer: MotionRouteLayer
  beforeId?: string
  distance?: number
  delay?: number
}
```

#### Parameters

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | ✅ | Unique identifier for the route |
| `route` | `Coordinate[]` | ✅ | Array of coordinate points |
| `layer` | `MotionRouteLayer` | ✅ | MapLibre layer configuration |
| `beforeId` | `string` | ❌ | Insert before existing layer |
| `distance` | `number` | ❌ | Interpolation distance in km (default: 0.05) |
| `delay` | `number` | ❌ | Animation delay in ms (default: 100) |

#### Example

```tsx
import { Map } from 'react-map-gl/maplibre'
import { MotionRoute } from '@maplibre-motion/react'

const Component = () => {
    const route = [
        { lat: 40.7128, lng: -74.0060 },
        { lat: 40.7589, lng: -73.9851 }
    ]

    return <Map>
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
}
```

### MotionArc

React component for creating animated arc visualization on MapLibre GL maps.

#### Definition

```tsx
MotionArc(props: MotionArcProps): JSX.Element
```

#### Types

```typescript
type MotionArcProps = {
  id: string
  startCoordinate: Coordinate
  endCoordinate: Coordinate
  layer: MotionArcLayer
  beforeId?: string
  distance?: number
  delay?: number
  arcHeightPercentage?: number
}
```

#### Parameters

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | ✅ | Unique identifier for the arc |
| `startCoordinate` | `Coordinate` | ✅ | Starting coordinate point |
| `endCoordinate` | `Coordinate` | ✅ | Ending coordinate point |
| `layer` | `MotionArcLayer` | ✅ | MapLibre layer configuration |
| `beforeId` | `string` | ❌ | Insert before existing layer |
| `distance` | `number` | ❌ | Interpolation distance in km (default: 0.05) |
| `delay` | `number` | ❌ | Animation delay in ms (default: 100) |
| `arcHeightPercentage` | `number` | ❌ | Arc height as percentage of straight-line distance (default: 0.4) |

#### Example

```tsx
import { Map } from 'react-map-gl/maplibre'
import { MotionArc } from '@maplibre-motion/react'

const Component = () => {
    return <Map>
        <MotionArc
            id="my-arc"
            startCoordinate={{ lat: 13.6817, lng: 100.7482 }}
            endCoordinate={{ lat: 35.0, lng: 133.0 }}
            layer={{
                paint: {
                    'line-color': '#ff6b35',
                    'line-width': 4
                }
            }}
        />
    </Map>
}
```
