import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export interface MapMarker {
  id: string;
  type: 'FARMER' | 'EQUIPMENT' | 'DRIVER';
  title: string;
  subtitle?: string;
  lat: number;
  lng: number;
  price?: string;
  status?: string;
  category?: string;
}

interface MapComponentProps {
  center?: [number, number];
  zoom?: number;
  markers?: MapMarker[];
  showRoute?: boolean;
  routeCoordinates?: [number, number][];
  height?: string;
  interactive?: boolean;
  onMarkerClick?: (marker: MapMarker) => void;
}

export const MapComponent: React.FC<MapComponentProps> = ({
  center = [26.8124, 75.5488], // Bagru / Jaipur Rural center
  zoom = 13,
  markers = [],
  showRoute = false,
  routeCoordinates = [
    [26.8124, 75.5488], // Vikram Equipment Hub
    [26.8140, 75.5505], // Driver En Route
    [26.8190, 75.5560], // Farmer Field
  ],
  height = '420px',
  interactive = true,
  onMarkerClick,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center,
        zoom,
        zoomControl: interactive,
        dragging: interactive,
        scrollWheelZoom: interactive ? 'center' : false,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors | AgriShare GIS',
        maxZoom: 18,
      }).addTo(map);

      const layerGroup = L.layerGroup().addTo(map);
      layerGroupRef.current = layerGroup;
      mapInstanceRef.current = map;
    }

    return () => {
      // Map cleanup on unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update markers and route when props change
  useEffect(() => {
    const map = mapInstanceRef.current;
    const layerGroup = layerGroupRef.current;
    if (!map || !layerGroup) return;

    layerGroup.clearLayers();

    // Render Markers
    markers.forEach((m) => {
      let iconHtml = '';
      if (m.type === 'FARMER') {
        iconHtml = `
          <div style="background-color: #16a34a; color: white; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.3); border: 2.5px solid white;">
            🌾
          </div>`;
      } else if (m.type === 'EQUIPMENT') {
        iconHtml = `
          <div style="background-color: #2563eb; color: white; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.3); border: 2.5px solid white;">
            🚜
          </div>`;
      } else {
        // DRIVER
        iconHtml = `
          <div style="position: relative;">
            <div style="position: absolute; -webkit-animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite; width: 38px; height: 38px; border-radius: 50%; background-color: #f59e0b; opacity: 0.5;"></div>
            <div style="background-color: #d97706; color: white; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.3); border: 2.5px solid white; position: relative;">
              🚚
            </div>
          </div>`;
      }

      const customIcon = L.divIcon({
        html: iconHtml,
        className: 'custom-leaflet-marker',
        iconSize: [34, 34],
        iconAnchor: [17, 17],
      });

      const marker = L.marker([m.lat, m.lng], { icon: customIcon }).addTo(layerGroup);

      const popupContent = `
        <div style="font-family: sans-serif; padding: 4px; min-width: 150px;">
          <div style="font-weight: bold; font-size: 13px; color: #0f172a;">${m.title}</div>
          ${m.subtitle ? `<div style="font-size: 11px; color: #475569; margin-top: 2px;">${m.subtitle}</div>` : ''}
          ${m.price ? `<div style="font-size: 12px; font-weight: 600; color: #16a34a; margin-top: 4px;">${m.price}</div>` : ''}
          ${m.status ? `<div style="font-size: 10px; color: #2563eb; font-weight: 500;">Status: ${m.status}</div>` : ''}
        </div>
      `;
      marker.bindPopup(popupContent);

      if (onMarkerClick) {
        marker.on('click', () => onMarkerClick(m));
      }
    });

    // Render Route if enabled
    if (showRoute && routeCoordinates && routeCoordinates.length > 1) {
      const polyline = L.polyline(routeCoordinates, {
        color: '#16a34a',
        weight: 5,
        opacity: 0.85,
        dashArray: '8, 8',
      }).addTo(layerGroup);

      map.fitBounds(polyline.getBounds(), { padding: [40, 40] });
    }
  }, [markers, showRoute, routeCoordinates, onMarkerClick]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200 shadow-sm" style={{ height }}>
      <div ref={mapContainerRef} className="w-full h-full" />
      {/* Legend Overlay */}
      <div className="absolute top-3 right-3 z-20 bg-white/90 backdrop-blur-md px-3 py-2 rounded-xl shadow-md border border-slate-200 text-[11px] font-medium text-slate-700 space-y-1">
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
          <span>Farmer Field</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
          <span>Machinery Hub</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
          <span>Live Driver GPS</span>
        </div>
      </div>
    </div>
  );
};
