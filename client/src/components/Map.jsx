// import MapMarker from "../assets/map.png"
import React, { useEffect, useState, useRef } from 'react';
import Map, { Marker, Popup, NavigationControl } from 'react-map-gl';

const MapView = ({ markers }) => {
    const MapMarker = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ffffff"%3E%3Cpath d="M12 2C8.13 2 5 5.13 5 9c0 6 7 13 7 13s7-7 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /%3E%3C/svg%3E'

    const selectedMarkerRef = useRef();

    const [selectedMarker, setSelectedMarker] = useState();
    const [popupOpen, setPopupOpen] = useState(false);
    const [viewport, setViewport] = useState({
        latitude: markers[Math.floor(markers.length / 2)].properties.latitude,
        longitude: markers[Math.floor(markers.length / 2)].properties.longitude,
        zoom: 13
    });

    const handleViewportChange = (newViewport) => {
        setViewport(newViewport);
    };

    const handleSelected = (marker) => {
        console.log('marker clicked:', marker);
        setSelectedMarker((prevMarker) => prevMarker === marker ? null : marker);
        setPopupOpen(true);
    };

    const handleClosePopup = () => {
        setSelectedMarker(null);
        setPopupOpen(false);
    };

    useEffect(() => {
        selectedMarkerRef.current = selectedMarker;
        console.log('selectedMarker:', selectedMarker);
        console.log('selectedMarkerRef:', selectedMarkerRef.current);
        return () => {
            selectedMarkerRef.current = null;
        };
    }, [selectedMarker]);


    return (
        <Map
            initialViewState={{ ...viewport }}
            onViewportChange={handleViewportChange}
            style={{ width: '100vw', height: '100vh' }}
            mapStyle="mapbox://styles/wesley254/clezjwl8d002001md18wexpan"
            mapboxAccessToken='pk.eyJ1Ijoid2VzbGV5MjU0IiwiYSI6ImNsMzY2dnA0MDAzem0zZG8wZTFzc3B3eG8ifQ.EVg7Sg3_wpa_QO6EJjj9-g'
        >
            {markers.map((marker, index) => (
                <Marker key={index} latitude={marker.properties.latitude} longitude={marker.properties.longitude} anchor="bottom">
                    <img onClick={() => handleSelected(marker)} style={{ height: "30px", width: "30px", cursor: "pointer", backgroundColor:"teal", borderRadius:"50px" }} src={MapMarker} alt="mapmarker" />
                </Marker>
            ))}

            {selectedMarkerRef.current && (
                <Popup
                    latitude={selectedMarkerRef.current.latitude + 0.01}
                    longitude={selectedMarkerRef.current.longitude + 0.01}
                    anchor="top-left"
                    onClose={handleClosePopup}
                >
                    <div>
                        <h3>{selectedMarkerRef.current.label}</h3>
                    </div>
                </Popup>
            )}
            <NavigationControl showCompass showZoom position='top-left' />
        </Map>
    );
};

export default MapView;