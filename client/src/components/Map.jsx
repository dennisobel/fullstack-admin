// import MapMarker from "../assets/map.png"
import React, { useState } from 'react';
import Map, { Marker, Popup, NavigationControl } from 'react-map-gl';

const MapView = () => {
    const MapMarker = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ffffff"%3E%3Cpath d="M12 2C8.13 2 5 5.13 5 9c0 6 7 13 7 13s7-7 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /%3E%3C/svg%3E'

    const markers = [
        { latitude: -1.2865303324119353, longitude: 36.82099936425639, label: 'Nairobi City Centre' },
        { latitude: -1.2784, longitude: 36.8169, label: 'Kenyatta International Convention Centre' },
        { latitude: -1.2854, longitude: 36.8211, label: 'University of Nairobi' },
        { latitude: -1.2866, longitude: 36.8266, label: 'Nairobi National Museum' },
    ];

    const [selectedMarker, setSelectedMarker] = useState(null);
    const [viewport, setViewport] = useState({
        latitude: -1.2921,
        longitude: 36.8268,
        zoom: 10
    });

    const handleViewportChange = (newViewport) => {
        setViewport(newViewport);
    };

    // mapStyle="mapbox://styles/mapbox/streets-v9"
    //         mapboxAccessToken='pk.eyJ1IjoiZGVubmlzb2JlbCIsImEiOiJjbGg1dmxqYTMwMDBnM2VwaTk2MXNvemh3In0.PCXH5DjguDHHgmaHviCFow'

    return (
        <Map
            initialViewState={{ ...viewport }}
            onViewportChange={handleViewportChange}
            style={{ width: '100vw', height: '100vh' }}
            mapStyle="mapbox://styles/wesley254/clezjwl8d002001md18wexpan"
            mapboxAccessToken='pk.eyJ1Ijoid2VzbGV5MjU0IiwiYSI6ImNsMzY2dnA0MDAzem0zZG8wZTFzc3B3eG8ifQ.EVg7Sg3_wpa_QO6EJjj9-g'
        >

            {markers.map((marker, index) => (
                <Marker key={index} latitude={marker.latitude} longitude={marker.longitude} anchor="bottom">
                    <img onClick={() => setSelectedMarker(marker)} style={{ height: "30px", width: "30px", cursor: "pointer" }} src={MapMarker} alt="mapmarker" />
                </Marker>
            ))}
            {selectedMarker && (
                <Popup
                    latitude={selectedMarker.latitude}
                    longitude={selectedMarker.longitude}
                    onClose={() => setSelectedMarker(null)}
                    anchor="bottom"
                >
                    <div>
                        <h3>{selectedMarker.label}</h3>
                        {/* <p>{selectedMarker.description}</p> */}
                    </div>
                </Popup>
            )}
            <NavigationControl showCompass showZoom position='top-left' />

        </Map>
    );
};

export default MapView;

