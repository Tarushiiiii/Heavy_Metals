import React from "react";
import {
  GoogleMap,
  Circle,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";

import { handleDownloadReport } from "../../utils/functions/userNavs";
import { getLocationName } from "../../utils/functions/utility";

const containerStyle = { width: "100%", height: "550px", borderRadius: "12px" };

const statusColors = {
  Alert: "#f59e0b",
  Critical: "#ef4444",
  Safe: "#10b981",
};

export const EnhancedGeoTag = ({ data = [], center = { lat: 28.7041, lng: 77.1025 }, zoom = 10 }) => {
  const googleMapsApiKey = import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY;

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey,
  });

  const displayData = Array.isArray(data) ? data.slice(0, 50) : [];

  const [hovered, setHovered] = React.useState(null);

  const handleButtonFixedClick = (e, reportData) => {
    e.stopPropagation();
    handleDownloadReport(reportData);
  };

  // ================== MAP RENDER ==================
  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={zoom}>
      {displayData.map((item, idx) => {
        const lat = Number(item.lat ?? item.latitude ?? item.Lat ?? item.LATITUDE ?? item.Latitude);
        const lng = Number(item.lng ?? item.longitude ?? item.Lng ?? item.LONGITUDE ?? item.Longitude);

        if (isNaN(lat) || isNaN(lng) || (lat === 0 && lng === 0)) {
          return null;
        }

        const statusKey = item.status
          ? item.status.charAt(0).toUpperCase() + item.status.slice(1).toLowerCase()
          : "Safe";
        const color = statusColors[statusKey] || statusColors.Safe;
        const locationName = getLocationName(item);

        return (
          <React.Fragment key={item.sample_id || item.id || `${lat}-${lng}-${idx}`}>
            {/* Outer Risk Radius Zone */}
            <Circle
              center={{ lat, lng }}
              radius={800}
              options={{
                strokeColor: color,
                strokeOpacity: 0.8,
                strokeWeight: 1.5,
                fillColor: color,
                fillOpacity: 0.25,
              }}
              onMouseOver={() => setHovered({ ...item, lat, lng, locationName, statusKey, color })}
              onClick={() => setHovered({ ...item, lat, lng, locationName, statusKey, color })}
            />

            {/* Inner Center Point Pin Dot */}
            <Circle
              center={{ lat, lng }}
              radius={100}
              options={{
                strokeColor: "#ffffff",
                strokeOpacity: 1,
                strokeWeight: 2,
                fillColor: color,
                fillOpacity: 1,
              }}
              onMouseOver={() => setHovered({ ...item, lat, lng, locationName, statusKey, color })}
              onClick={() => setHovered({ ...item, lat, lng, locationName, statusKey, color })}
            />
          </React.Fragment>
        );
      })}

      {hovered && (
        <InfoWindow
          position={{ lat: hovered.lat, lng: hovered.lng }}
          onCloseClick={() => setHovered(null)}
        >
          <div style={{ padding: "6px", maxWidth: "260px", fontFamily: "sans-serif" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
              <strong style={{ fontSize: "14px", color: "#1f2937" }}>{hovered.locationName}</strong>
              <span
                style={{
                  backgroundColor: hovered.color,
                  color: "#ffffff",
                  fontSize: "11px",
                  fontWeight: "bold",
                  padding: "2px 8px",
                  borderRadius: "12px",
                }}
              >
                {hovered.statusKey}
              </span>
            </div>

            {hovered.sample_id && (
              <div style={{ fontSize: "11px", color: "#6b7280", marginBottom: "4px" }}>
                Sample ID: {hovered.sample_id}
              </div>
            )}

            <div style={{ fontSize: "12px", color: "#374151", lineHeight: "1.5", marginBottom: "10px" }}>
              {hovered.hpi !== undefined && <div><strong>HPI Value:</strong> {hovered.hpi}</div>}
              {hovered.ci !== undefined && <div><strong>Composite Index:</strong> {hovered.ci}</div>}
              {hovered.metal && <div><strong>Dominant Metal:</strong> {hovered.metal}</div>}
              {/* {hovered.ml && <div style={{ marginTop: "4px", fontSize: "11px", color: "#4b5563" }}><strong>Analysis:</strong> {hovered.ml}</div>}
              {hovered.cause && <div style={{ marginTop: "2px", fontSize: "11px", color: "#4b5563" }}><strong>Root Cause:</strong> {hovered.cause}</div>} */}
            </div>

            <button
              style={{
                width: "100%",
                backgroundColor: "#0d9488",
                color: "white",
                padding: "6px 12px",
                borderRadius: "6px",
                border: "none",
                fontSize: "12px",
                fontWeight: "600",
                cursor: "pointer",
              }}
              onClick={(e) => handleButtonFixedClick(e, hovered)}
            >
              📄 Download PDF Report
            </button>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : null;
};

