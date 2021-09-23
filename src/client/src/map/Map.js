import React, { useEffect } from "react";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { WMSLayer, PointsLayer, PolyLineLayer } from "./Layers";
import styles from "./map_styles.json";
import "./map.sass";

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const GOOGLE_MAPS_ENDPOINT = process.env.REACT_APP_GOOGLE_MAPS_API_ENDPOINT;

const helmetContext = {};

let routeLayer, pointsOfInterestLayer, accomodationsLayer;
let santiagoWMS, elevationWMS;

function Map(props) {
    let map;

    useEffect(() => {

    });

    const loadDayRoute = function(_) {
        // TODO: functionality of loading the route of a given day
    };

    const initMap = function() {
        let latitude = 40.160417;
        let longitude = -3.998637;
        map = new window.google.maps.Map(
            document.getElementById("google-map"),
            {
                center: new window.google.maps.LatLng(latitude, longitude),
                zoom: 6,
                mapTypeId: window.google.maps.MapTypeId.ROADMAP,
                zoomControl: true,
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                rotateControl: false,
                fullscreenControl: false,
                draggable: true,
                gestureHandling: "cooperative",
                styles: styles
            }
        );

        // carga de los WMS. el orden es importante para la superposición de capas
        elevationWMS = new WMSLayer(process.env.REACT_APP_ELEVACIONES_WMS_ENDPOINT, 'EL.GridCoverage',
            'EL.GridCoverage.Default', 'image/png', map, 0.35, true);
        santiagoWMS = new WMSLayer(process.env.REACT_APP_SANTIAGO_WMS_ENDPOINT, props.route,
            props.style, 'image/png', map, 1.0, true);
    };

    window.initMap = initMap;

    return (
        <HelmetProvider context={helmetContext}>
            <section id="map-wrapper">
                <div id="google-map"></div>
                <ul id="layer-buttons">
                    <li>
                        <input type="checkbox"></input>
                        <p>Elevaciones</p>
                        <img src="" />
                    </li>
                    <li>
                        <input type="checkbox"></input>
                        <p>Camino</p>
                        <img src="" />
                    </li>
                </ul>

                <Helmet>
                    <script
                        type="text/javascript"
                        charset="UTF-8"
                        async={true}
                        defer={true}
                        src={`${GOOGLE_MAPS_ENDPOINT}?key=${GOOGLE_MAPS_API_KEY}&callback=initMap`}
                    />
                </Helmet>
            </section>
        </HelmetProvider>
    );
}

export default Map;