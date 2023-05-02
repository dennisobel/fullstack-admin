import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

import { styled } from "@mui/material/styles";
import { Box, useTheme } from "@mui/material";
import { Icon } from "@mui/material";
import { LocationOn } from "@mui/icons-material";
import Marker from "../assets/map.png"
import ReactDOMServer from 'react-dom/server';

const MapContainer = styled(Box)(({ theme }) => ({
    height: "100vh",
    width: "100vw",
}));

const MarkerIcon = styled(Icon)(({ theme }) => ({
    color: "008080",
}));

const Map = ({ markers }) => {
    const theme = useTheme();
    const mapContainerRef = useRef(null);
    const zoomContainerRef = useRef(null);
    const { NavigationControl } = mapboxgl;

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiZGVubmlzb2JlbCIsImEiOiJjbGg1dmxqYTMwMDBnM2VwaTk2MXNvemh3In0.PCXH5DjguDHHgmaHviCFow'
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [markers[2].lng, markers[2].lat],
            zoom: 3,
        });

        // Add zoom control
        const zoomControl = new mapboxgl.NavigationControl({
            showCompass: false,
        });

        map.addControl(zoomControl, "top-right");
        zoomContainerRef.current.appendChild(map.getContainer().querySelector(".mapboxgl-ctrl-group"));


        const nav = new NavigationControl();
        map.addControl(nav, "top-left");


        const bounds = new mapboxgl.LngLatBounds();

        markers.forEach((marker) => {
            const el = document.createElement("div");
            el.className = "marker";
            el.style.backgroundImage = `url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ffffff"%3E%3Cpath d="M12 2C8.13 2 5 5.13 5 9c0 6 7 13 7 13s7-7 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /%3E%3C/svg%3E')`;
            el.style.backgroundSize = "fixed";
            el.style.backgroundColor = "teal";
            el.style.width = "30px";
            el.style.height = "30px";

            const img = document.createElement('img');
            img.src = 'https://example.com/my-image.jpg';

            const link = document.createElement('a');
            link.href = 'https://example.com/my-link';
            link.textContent = 'My link';

            const content = document.createElement('div');
            content.classList.add('mapboxgl-popup-content');
            content.appendChild(img);
            content.appendChild(link);

            const markerPopup = new mapboxgl.Popup({
                offset: [0, -10],
                className: "custom-popup",
            }).setDOMContent(
                content
            );

            new mapboxgl.Marker(el)
                .setLngLat([marker.lng, marker.lat])
                .setPopup(markerPopup)
                .addTo(map);

            bounds.extend([marker.lng, marker.lat]);
        });

        map.on("load", () => {
            map.fitBounds(bounds, { padding: 25 });
        });

        const maxBounds = new mapboxgl.LngLatBounds();
        maxBounds.extend([bounds.getWest(), bounds.getSouth()]);
        maxBounds.extend([bounds.getEast(), bounds.getNorth()]);
        // map.setMaxBounds(maxBounds);
        return () => map.remove();
    }, [markers]);

    return (
        <MapContainer ref={mapContainerRef}>
            <div className="map-controls">
                <MarkerIcon theme={theme}>
                    <LocationOn />
                </MarkerIcon>
                <div className="zoom-controls">
                    <div ref={zoomContainerRef} className="mapboxgl-ctrl-top-left" />
                </div>
            </div>
        </MapContainer>
    );
};

export default Map;
