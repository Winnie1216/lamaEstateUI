import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "./map.scss";
import "leaflet/dist/leaflet.css";
import Pin from "../pin/pin";
import L from "leaflet"; // 导入 L

function Map({ items }) {
  const center = [-34.4278, 150.8931]; // Wollongong center coordinates
  const zoom = 7; // 调整这个值来控制缩放级别，值越小地图越远

  // Custom component to fit bounds
  function FitBounds({ items }) {
    const map = useMap();

    if (items.length) {
      const bounds = new L.LatLngBounds(
        items.map((item) => [item.latitude, item.longitude])
      );
      map.fitBounds(bounds);
    }

    return null;
  }

  return (
    <MapContainer
      className="map"
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {items.map((item) => (
        <Pin key={item.id} item={item} />
      ))}
      <FitBounds items={items} />
    </MapContainer>
  );
}

export default Map;
