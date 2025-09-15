import React, { useRef } from 'react';
import Map, { MapRef, MapLayerMouseEvent } from 'react-map-gl/maplibre';
import { MotionRoute, MotionArc } from '@maplibre-motion/react';

interface Coordinate {
  lat: number;
  lng: number;
}

// Start point: Bangkok Airport (BKK) - already correct
// End point: Western coast of Japan's Honshu island (not Tokyo Haneda)
const startPoint: Coordinate = { lat: 13.681749553296001, lng: 100.74822444888923 }; // BKK Airport
const endPoint: Coordinate = { lat: 35.54844717789857, lng: 139.78513343125474 }; // Western coast of Honshu, Japan

// Center map between BKK and Japan's western coast
const center: [number, number] = [116.5, 24.5]; // [longitude, latitude] - between BKK and Japan's western coast
const zoom = 4; // Wider view to show both points

const routeCoordinates: Coordinate[] = [
  {
      "lat": 13.727646066443867,
      "lng": 100.55793761373866
  },
  {
      "lat": 13.725665808934693,
      "lng": 100.55798052908187
  },
  {
      "lat": 13.725895102764795,
      "lng": 100.55963276983562
  },
  {
      "lat": 13.72760437698436,
      "lng": 100.55986880422842
  },
  {
      "lat": 13.732502837753472,
      "lng": 100.55939673544276
  },
  {
      "lat": 13.732669592063687,
      "lng": 100.55886029363933
  },
  {
      "lat": 13.732690436343589,
      "lng": 100.55789469839334
  },
  {
    "lat": 13.732971833948724,
    "lng": 100.55736898542551
  },
  {
    "lat": 13.733430407099249,
    "lng": 100.55704712034327
  },
  {
    "lat": 13.73343040709858,
    "lng": 100.55499254823269
  },
  {
    "lat": 13.733363885824332,
    "lng": 100.55345568247816
  },
  {
    "lat": 13.733619010725704,
    "lng": 100.55319031951848
  },
  {
    "lat": 13.733395986815765,
    "lng": 100.55280870749698
  },
  {
    "lat": 13.733251322545158,
    "lng": 100.55227817371048
  },
  {
    "lat": 13.7328424320485,
    "lng": 100.55220433903793
  },
  {
    "lat": 13.72753747804424,
    "lng": 100.55272440390081
  },
  {
    "lat": 13.727712342374616,
    "lng": 100.55723981750663
  }
];

const MapComponent = (): React.JSX.Element => {
  const mapRef = useRef<MapRef>(null);

  const mapStyle = {
    version: 8 as const,
    sources: {
      'osm': {
        type: 'raster' as const,
        tiles: [
          'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
        ],
        tileSize: 256,
        attribution: '© OpenStreetMap contributors'
      }
    },
    layers: [
      {
        id: 'osm',
        type: 'raster' as const,
        source: 'osm'
      }
    ]
  };

  const handleMapLoad = () => {
    // Map loaded successfully
  };

  const handleMapClick = (event: MapLayerMouseEvent) => {
    const { lngLat } = event;
    console.log('Clicked coordinates:', {
      lat: lngLat.lat,
      lng: lngLat.lng
    });
    
    // You can also show an alert or update state with the coordinates
    console.log(`Clicked at: ${lngLat.lat.toFixed(6)}, ${lngLat.lng.toFixed(6)}`);
  };

  return (
    <Map
      ref={mapRef}
      mapStyle={mapStyle}
      initialViewState={{
        longitude: center[0],
        latitude: center[1],
        zoom: zoom
      }}
      style={{ 
        width: '100%', 
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: '#f0f0f0'
      }}
      attributionControl={false}
      onLoad={handleMapLoad}
      onClick={handleMapClick}
    >
      <MotionRoute
        id="test-route"
        route={routeCoordinates}
        layer={{
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#888',
            'line-width': 8
          }
        }}
      />
      <MotionArc
        id="bkk-hnd-arc"
        startCoordinate={startPoint}
        endCoordinate={endPoint}
        layer={{
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#ff6b35',
            'line-width': 4,
            'line-opacity': 0.8
          }
        }}
        distance={20}
        arcHeightPercentage={0.4}
      />
    </Map>
  );
};

export default MapComponent;
