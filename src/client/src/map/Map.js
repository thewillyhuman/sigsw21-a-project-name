import React, { useEffect } from "react";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import WMSLoader from "./WMSLoader";
import "./map.sass";

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const GOOGLE_MAPS_ENDPOINT = process.env.REACT_APP_GOOGLE_MAPS_API_ENDPOINT;
const SUPPORTED_ROUTES = ['camino_frances', 'caminos_galicia', 'caminos_turonensis'];
const STYLES = ['cs.frances', 'cs.galicia', 'cs.turonensis']

const helmetContext = {};

function Map() {
    let map;

    useEffect(() => {

    });

    const loadDayRoute = function(day) {
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
            mapTypeId: window.google.maps.MapTypeId.TERRAIN,
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false,
            scrollwheel: false,
            draggable: true,
            gestureHandling: "cooperative"
            }
        );

        console.log(process.env);
        let santiagoWMS = new WMSLoader(process.env.REACT_APP_SANTIAGO_WMS_ENDPOINT, SUPPORTED_ROUTES, STYLES, 'image/png', map);
        
      	let overlayOptions = {
            getTileUrl: santiagoWMS.getTile.bind(santiagoWMS),
            tileSize: new window.google.maps.Size(256, 256)
        };
        
        let overlayWMS = new window.google.maps.ImageMapType(overlayOptions);
        map.overlayMapTypes.push(overlayWMS);
    };
    window.initMap = initMap;

    return (
        <HelmetProvider context={helmetContext}>
            <section id="map-wrapper">
                <div id="google-map"></div>

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