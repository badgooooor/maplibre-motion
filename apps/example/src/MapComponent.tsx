import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import { addMotionRoute } from '@maplibre-motion/core';

interface Coordinate {
  lat: number;
  lng: number;
}

const center: [number, number] = [100.5516076004593, 13.728959280625702]; // [longitude, latitude]
const zoom = 15;

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

const MapComponent = (): JSX.Element => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (map.current) return;


    const initMap = () => {
      if (!mapContainer.current) {
        return;
      }

      try {        
        map.current = new maplibregl.Map({
          container: mapContainer.current,
          style: {
            version: 8,
            sources: {
              'osm': {
                type: 'raster',
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
                type: 'raster',
                source: 'osm'
              }
            ]
          },
          center,
          zoom
        });

        // Add event listeners
        map.current.on('load', () => {
          if (map.current) {
            map.current.resize();
            
            addMotionRoute({
              map: map.current,
              id: 'test-route',
              route: routeCoordinates,
              layer: {
                layout: {
                  'line-join': 'round',
                  'line-cap': 'round'
                },
                paint: {
                  'line-color': '#888',
                  'line-width': 8
                }
              }
            });
          }
        });

        map.current.on('click', (e: maplibregl.MapMouseEvent) => {
          console.log('MapComponent: Click on coordinates:', e.lngLat.lat, e.lngLat.lng);
        });

        map.current.on('error', (e) => {
          console.error('MapComponent: Map error:', e);
        });
  
        map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

      } catch (error) {
        console.error('MapComponent: Error initializing map:', error);
      }
    };

    // Use requestAnimationFrame to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      requestAnimationFrame(initMap);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (map.current) {
        console.log('MapComponent: Cleaning up map');
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return (
    <div 
      ref={mapContainer}
      style={{ 
        width: '100%', 
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: '#f0f0f0' // Temporary background to see if container is visible
      }} 
    />
  );
};

export default MapComponent;
