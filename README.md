# maplibre-motion

Maplibre plugin for applying animation.

## Installation

```bash
npm install maplibre-motion
```

## Usage

### addMotionRoute

Creates and animates a motion route on a MapLibre GL map. This function interpolates coordinates along a route path and animates the line drawing progressively.

#### Definition

```typescript
addMotionRoute(options: MotionRouteOptions): void
```

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | ✅ | Unique identifier for the route source and layer |
| `map` | `Map` | ✅ | MapLibre GL Map instance where the route will be displayed |
| `route` | `Coordinate[]` | ✅ | Array of coordinate points defining the route path |
| `layer` | `MotionRouteLayer` | ✅ | Layer configuration (excluding id, source, and type which are handled automatically) |
| `beforeId` | `string` | ❌ | Optional ID of an existing layer to insert this route before |
| `distance` | `number` | ❌ | Distance in kilometers between interpolated points for smoother animation (default: 0.05) |

#### Types

```typescript
type Coordinate = {
  lat: number
  lng: number
}

type MotionRouteLayer = Omit<LayerSpecification, 'id' | 'source' | 'type'>
```

#### Example

```typescript
import { addMotionRoute } from 'maplibre-motion'
import maplibregl from 'maplibre-gl'

// Create a map instance
const map = new maplibregl.Map({
  container: 'map',
  style: 'https://demotiles.maplibre.org/style.json',
  center: [-74.0060, 40.7128],
  zoom: 10
})

// Define route coordinates
const route = [
  { lat: 40.7128, lng: -74.0060 }, // New York
  { lat: 40.7589, lng: -73.9851 }, // Times Square
  { lat: 40.7614, lng: -73.9776 }  // Central Park
]

// Add animated route
addMotionRoute({
  id: 'my-route',
  map: map,
  route: route,
  layer: {
    paint: {
      'line-color': '#ff0000',
      'line-width': 4,
      'line-opacity': 0.8
    }
  },
  distance: 0.01 // 10 meters between interpolated points
})
```

## 