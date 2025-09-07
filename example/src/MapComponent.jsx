import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const center = [100.5516076004593, 13.728959280625702] // [longitude, latitude]
const zoom = 15

const MapComponent = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);

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
          }
        });

        map.current.on('click', (e) => {
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
