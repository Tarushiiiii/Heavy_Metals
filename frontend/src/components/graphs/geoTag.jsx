import React from "react";
import {
  GoogleMap,
  Circle,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const statusColors = {
  Alert: "orange",
  Critical: "#ff5c5c",
  Safe: "#52d17a",
};

export const HeatMap = ({ data = [], center = { lat: 28.7041, lng: 77.1025 }, zoom = 10 }) => {
  const googleMapsApiKey = import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY;

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey,
  });

  const displayData = data || [];

  const [hovered, setHovered] = React.useState(null);
  const [address, setAddress] = React.useState("Loading...");

  // FREE Reverse Geocoding (NO billing required)
  const fetchAddress = async (lat, lng) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      const data = await res.json();
      setAddress(data.display_name || "Address not available");
    } catch (err) {
      setAddress("Address not available");
    }
  };

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={zoom}>
      {displayData.slice(0, 200).map((item, idx) => {
        const lat = Number(item.lat ?? item.latitude ?? 28.7041);
        const lng = Number(item.lng ?? item.longitude ?? 77.1025);
        return (
          <Circle
            key={`${lat}-${lng}-${idx}`}
            center={{ lat, lng }}
            radius={700}
            options={{
              strokeColor: statusColors[item.status] || "gray",
              strokeOpacity: 1,
              strokeWeight: 2,
              fillColor: statusColors[item.status] || "gray",
              fillOpacity: 0.5,
            }}
            onMouseOver={() => {
              setHovered({ ...item, lat, lng });
              fetchAddress(lat, lng);
            }}
            onMouseOut={() => {
              setHovered(null);
              setAddress("Loading...");
            }}
          />
        );
      })}

      {hovered && (
        <InfoWindow
          position={{ lat: hovered.lat, lng: hovered.lng }}
          onCloseClick={() => setHovered(null)}
        >
          <div style={{ maxWidth: "250px" }}>
            <strong>Location:</strong> <br />
            {address}
            <br />
            <br />
            <strong>HPI:</strong> {hovered.hpi} <br />
            <strong>Risk:</strong>{" "}
            <span
              style={{
                color: statusColors[hovered.status] || "gray",
                fontWeight: "bold",
              }}
            >
              {hovered.status}
            </span>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};
