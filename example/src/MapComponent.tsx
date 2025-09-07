import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import { applyRoute } from '../../src/polyline';
import 'maplibre-gl/dist/maplibre-gl.css';

interface Coordinate {
  lat: number;
  lng: number;
}

interface RouteGeoJSON {
  type: 'Feature';
  properties: Record<string, never>;
  geometry: {
    type: 'LineString';
    coordinates: [number, number][];
  };
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
  }
];

// Convert route coordinates to GeoJSON format (longitude, latitude)
const routeGeoJSON: RouteGeoJSON = {
  type: 'Feature',
  properties: {},
  geometry: {
    type: 'LineString',
    coordinates: routeCoordinates.map(point => [point.lng, point.lat])
  }
};

const MapComponent = (): JSX.Element => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);

  const [route, setRoute] = useState<Coordinate[]>([]);

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
            
            applyRoute(map.current, 'test-route', routeCoordinates);
          }
        });

        map.current.on('click', (e: maplibregl.MapMouseEvent) => {
          console.log('MapComponent: Click on coordinates:', e.lngLat.lat, e.lngLat.lng);
          setRoute(prevRoute => {
            const newRoute: Coordinate[] = [...prevRoute, { lat: e.lngLat.lat, lng: e.lngLat.lng }];
            console.log('MapComponent: New route:', newRoute);
            return newRoute;
          });
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
