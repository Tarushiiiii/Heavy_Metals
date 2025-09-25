import { APIProvider, Map as GoogleMap, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import { useState, useEffect } from "react";

function getColor(risk) {
    if (risk > 80) return "red";
    if (risk > 40) return "yellow";
    return "green";
}

function RiskMap({ riskZones, apiKey }) {
    if (!apiKey) {
        return <div>Error: Google Maps API key is missing.</div>;
    }
    return (
        <APIProvider apiKey={apiKey}>
            <GoogleMap defaultCenter={{ lat: 28.61, lng: 77.21 }} defaultZoom={10} style={{ height: "500px" }}>
                {riskZones.map(zone => (
                    <AdvancedMarker key={zone.id} position={{ lat: zone.lat, lng: zone.lng }}>
                        <Pin background={getColor(zone.risk)} />
                    </AdvancedMarker>
                ))}
            </GoogleMap>
        </APIProvider>
    );
}

export default function App() {
    const [reports, setReports] = useState([]);
    useEffect(() => {
        async function fetchRiskData() {
            return [
                { id: 1, lat: 28.61, lng: 77.23, risk: 90, date: "2025-09-25" },
                { id: 2, lat: 28.62, lng: 77.21, risk: 50, date: "2025-09-24" },
                { id: 3, lat: 28.6, lng: 77.2, risk: 20, date: "2025-09-23" }
            ];
        }
        fetchRiskData().then(setReports);
    }, []);
    const riskZones = [...reports].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
    const googleMapsApiKey = import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY;
    return <RiskMap riskZones={riskZones} apiKey={googleMapsApiKey} />;
}
