import React, { useEffect, useState, useRef } from 'react';
import Map, { Marker, Popup, NavigationControl, Source, Layer } from 'react-map-gl';
import ReactMapGL from 'react-map-gl';
// import { interpolateOranges } from 'd3-scale-chromatic';
import { interpolateOranges, interpolateGreens, interpolateReds, interpolateYlOrRd } from 'd3-scale-chromatic';
import { useSelector } from 'react-redux';

const Dot = ({ color, label, index, onClick }) => {
    const [animationStyle, setAnimationStyle] = useState({});

    useEffect(() => {
        setAnimationStyle({ animation: 'blink 2s infinite' });
    }, []);

    return (
        <div
            style={{
                position: "absolute",
                top: `${10 + index * 20}px`,
                left: "10px",
                display: "flex",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    backgroundColor: color,
                    height: "10px",
                    width: "10px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.8rem",
                    fontWeight: "bold",
                    color: "#fff",
                    textTransform: "uppercase",
                    padding: "5px",
                }}
            >
                &nbsp;
            </div>
            <div
                className="label"
                style={{
                    ...animationStyle,
                    marginLeft: "5px",
                    fontSize: "0.6rem",
                    fontWeight: "bold",
                    color: "#ffd166",
                    textTransform: "uppercase",
                }}
            >
                {label}
            </div>
        </div>
    );
};

const MapView = ({ markers }) => {
    const mapType = useSelector(state => state.global.mapType)
    const MapMarker = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ffffff"%3E%3Cpath d="M12 2C8.13 2 5 5.13 5 9c0 6 7 13 7 13s7-7 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /%3E%3C/svg%3E'
    const selectedMarkerRef = useRef();
    const [selectedMarker, setSelectedMarker] = useState();
    const [viewport, setViewport] = useState({
        latitude: -1.2717167,
        longitude: 36.8139821,
        zoom: 13
    });

    const handleViewportChange = (newViewport) => {
        setViewport(newViewport);
    };

    const handleSelected = (marker) => {
        setSelectedMarker((prevMarker) => prevMarker === marker ? null : marker);
        // setSelectedMarker(marker)
    };

    const handleClosePopup = () => {
        setSelectedMarker(null);
    };

    useEffect(() => {
        selectedMarkerRef.current = selectedMarker;
    }, [selectedMarker]);

    const mapKey = JSON.stringify(viewport);

    const dots = [
        { color: "green", label: "Paid", value: "Paid" },
        { color: "yellow", label: "Partially paid", value: "Partially paid" },
        { color: "red", label: "Not paid", value: "Not paid" },
    ];

    const getHeatmapColor = (value) => {
        const scale = interpolateOranges;
        return scale(value);
    };

    const paidColor = (value) => {
        const scale = interpolateGreens;
        return scale(value);
    };

    const notPaidColor = (value) => {
        const scale = interpolateReds;
        return scale(value);
    };

    const partiallyPaidColor = (value) => {
        const scale = interpolateYlOrRd;
        return scale(value);
    };

    const colorScale = {
        paid: '#4CAF50',
        partiallyPaid: '#FFC107',
        notPaid: '#F44336',
    };

    const heatmapLayer = {
        id: 'heatmap-layer',
        type: 'heatmap',
        source: {
            type: 'geojson',
            data: markers
        },
        paint: {
            'heatmap-opacity': 0.8,
            'heatmap-radius': 15,
            'heatmap-weight': [
                'interpolate',
                ['linear'],
                // ['get', 'density'],
                ['to-number', ['get', 'paymentstatus']],
                0, 0,
                1, 1
            ],
            'heatmap-color': [
                'interpolate',
                ['linear'],
                ['heatmap-density'],
                0, 'rgba(0, 0, 255, 0)',
                0.2, notPaidColor(0.2),
                0.4, partiallyPaidColor(0.4),
                0.6, paidColor(0.6),
                // 0.2,
                // colorScale.notPaid,
                // 0.4,
                // colorScale.partiallyPaid,
                // 0.6,
                // colorScale.paid,
                0.8, getHeatmapColor(0.8)
            ]
        }
    };

    const handleMarkerClick = (marker) => {
        setSelectedMarker(marker);
        handleSelected(marker);
    };

    const circlePaint = {
        'circle-radius': 10,
        'circle-color': [
            'match',
            ['get', 'paymentstatus'],
            'paid', 'green',
            'partially paid', 'yellow',
            'red'
        ],
        // 'cursor':'pointer'
    };

    return (
        <ReactMapGL
            key={mapKey}
            initialViewState={{ ...viewport }}
            onViewportChange={handleViewportChange}
            style={{ width: '100vw', height: '100vh' }}
            mapStyle="mapbox://styles/wesley254/clezjwl8d002001md18wexpan"
            mapboxAccessToken='pk.eyJ1Ijoid2VzbGV5MjU0IiwiYSI6ImNsMzY2dnA0MDAzem0zZG8wZTFzc3B3eG8ifQ.EVg7Sg3_wpa_QO6EJjj9-g'
        >
            {mapType === "Markers" ? (markers.map((marker, index) => (
                <Marker key={index} latitude={marker.properties.latitude} longitude={marker.properties.longitude} anchor="bottom">
                    <img
                        onClick={() => { handleSelected(marker); }}
                        style={{
                            height: "30px",
                            width: "30px",
                            cursor: "pointer",
                            backgroundColor: marker.properties.paymentstatus === "paid" ? "green" : marker.properties.paymentstatus === "partially paid" ? "yellow" : "red", borderRadius: "50px"
                        }}
                        src={MapMarker} alt="mapmarker" />
                </Marker>
            ))) : mapType === "Clusters" ? (<Source type="geojson" data={{ type: 'FeatureCollection', features: markers }}>
                <Layer style={{ cursor: 'pointer' }}  {...heatmapLayer} onClick={(e) => {
                    const marker = e.features[0];
                    handleSelected(marker)
                }} interactive={true} />
            </Source>) : (<></>)}

            {selectedMarker && (

                <Popup
                    latitude={selectedMarker.properties.latitude}
                    longitude={selectedMarker.properties.longitude}
                    anchor="top-left"
                    onClose={handleClosePopup}
                    closeButton={true}
                    closeOnClick={false}
                >
                    <div id="defaultModal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                        <div class="relative w-full max-w-2xl max-h-full">

                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                                    <h6 class="text-xl font-semibold text-gray-900 dark:text-white">
                                        {selectedMarker.properties.description}
                                    </h6>
                                    <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                                        <svg aria-hidden="true" class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
                                        </svg>

                                        <span class="sr-only">Directions</span>
                                    </button>
                                </div>
                                <div class="p-6 space-y-6">
                                    <h5 class="text-xl font-semibold text-gray-900 dark:text-white">
                                        Sub County
                                    </h5>
                                    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                        {selectedMarker.properties.subcounty}
                                    </p>
                                    <h5 class="text-xl font-semibold text-gray-900 dark:text-white">
                                        Ward
                                    </h5>
                                    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                        {selectedMarker.properties.ward}
                                    </p>
                                    <h5 class="text-xl font-semibold text-gray-900 dark:text-white">
                                        Street
                                    </h5>
                                    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                        {selectedMarker.properties.streetname}
                                    </p>
                                    <h5 class="text-xl font-semibold text-gray-900 dark:text-white">
                                        Building
                                    </h5>
                                    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                        {selectedMarker.properties.buildingnumber}
                                    </p>
                                    <h5 class="text-xl font-semibold text-gray-900 dark:text-white">
                                        Structure
                                    </h5>
                                    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                        {selectedMarker.properties.typeofstructure}
                                    </p>
                                    <h5 class="text-xl font-semibold text-gray-900 dark:text-white">
                                        Payment Status
                                    </h5>
                                    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                        {selectedMarker.properties.paymentstatus}
                                    </p>
                                </div>

                                {/* <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                                    <button data-modal-hide="defaultModal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Get Direction</button>
                                    <button data-modal-hide="defaultModal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline</button>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </Popup>
            )}

            <NavigationControl showCompass showZoom position='bottom-left' />
            {dots.map((dot, index) => (
                <Dot
                    key={index}
                    index={index}
                    color={dot.color}
                    label={dot.label}
                />
            ))}
        </ReactMapGL>
    );
};

export default MapView;