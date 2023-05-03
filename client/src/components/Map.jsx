import MapMarker from "../assets/map.png"
import React, { useState } from 'react';
import Map, { Marker, Popup, NavigationControl } from 'react-map-gl';

const MapView = () => {

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
        zoom: 6
    });

    const handleViewportChange = (newViewport) => {
        setViewport(newViewport);
    };

    return (
        <Map
            initialViewState={{...viewport}}
            onViewportChange={handleViewportChange}
            style={{ width: '100vw', height: '100vh' }}
            mapStyle="mapbox://styles/wesley254/clezjwl8d002001md18wexpan"
            mapboxAccessToken='pk.eyJ1IjoiZGVubmlzb2JlbCIsImEiOiJjbGg1dmxqYTMwMDBnM2VwaTk2MXNvemh3In0.PCXH5DjguDHHgmaHviCFow'
        >

            {markers.map((marker, index) => (
                <Marker key={index} latitude={marker.latitude} longitude={marker.longitude} anchor="bottom">
                    <img onClick={() => setSelectedMarker(marker)} style={{height:"30px", width:"30px"}} src={MapMarker} alt="mapmarker"/>
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

