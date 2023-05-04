// import MapMarker from "../assets/map.png"
import React, { useEffect, useState, useRef } from 'react';
import Map, { Marker, Popup, NavigationControl } from 'react-map-gl';

const MapView = ({ markers }) => {
    console.log("markers:", markers)
    const MapMarker = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ffffff"%3E%3Cpath d="M12 2C8.13 2 5 5.13 5 9c0 6 7 13 7 13s7-7 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /%3E%3C/svg%3E'

    const selectedMarkerRef = useRef();

    const [selectedMarker, setSelectedMarker] = useState();
    const [viewport, setViewport] = useState({
        // latitude: markers[Math.floor(markers.length / 2)].properties.latitude,
        // longitude: markers[Math.floor(markers.length / 2)].properties.longitude,
        latitude: -1.2717167,
        longitude: 36.8139821,
        zoom: 13
    });

    const handleViewportChange = (newViewport) => {
        setViewport(newViewport);
    };

    const handleSelected = (marker) => {
        setSelectedMarker((prevMarker) => prevMarker === marker ? null : marker);
    };

    const handleClosePopup = () => {
        setSelectedMarker(null);
    };

    useEffect(() => {
        selectedMarkerRef.current = selectedMarker;
        return () => {
            selectedMarkerRef.current = null;
        };
    }, [selectedMarker]);

    const mapKey = JSON.stringify(viewport);

    const Dot = ({ color, label, index }) => (
        <div
            style={{
                position: 'absolute',
                top: `${10 + index * 20}px`,
                left: '10px',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <div
                style={{
                    backgroundColor: color,
                    height: '10px',
                    width: '10px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    color: '#fff',
                    textTransform: 'uppercase',
                    padding: '2px',
                    pointerEvents: 'none',
                }}
            >
                &nbsp;
            </div>
            <div
                style={{
                    marginLeft: '5px',
                    fontSize: '0.6rem',
                    fontWeight: 'bold',
                    color: '#ffd166',
                    textTransform: 'uppercase',
                }}
            >
                {label}
            </div>
        </div>
    );

    return (
        <Map
            key={mapKey}
            initialViewState={{ ...viewport }}
            // viewport={viewport}
            onViewportChange={handleViewportChange}
            style={{ width: '100vw', height: '100vh' }}
            mapStyle="mapbox://styles/wesley254/clezjwl8d002001md18wexpan"
            mapboxAccessToken='pk.eyJ1Ijoid2VzbGV5MjU0IiwiYSI6ImNsMzY2dnA0MDAzem0zZG8wZTFzc3B3eG8ifQ.EVg7Sg3_wpa_QO6EJjj9-g'
        >
            {markers.map((marker, index) => (
                <Marker key={index} latitude={marker.properties.latitude} longitude={marker.properties.longitude} anchor="bottom">
                    <img
                        onClick={() => handleSelected(marker)}
                        style={{
                            height: "30px",
                            width: "30px",
                            cursor: "pointer",
                            backgroundColor: marker.properties.paymentstatus === "paid" ? "green" : marker.properties.paymentstatus === "partially paid" ? "yellow" : "red", borderRadius: "50px"
                        }}
                        src={MapMarker} alt="mapmarker" />
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

            <Dot color="green" label="Paid" index={0} />
            <Dot color="yellow" label="Partially paid" index={1} />
            <Dot color="red" label="Not paid" index={2} />
            <NavigationControl showCompass showZoom position='bottom-left' />
        </Map>
    );
};

export default MapView;