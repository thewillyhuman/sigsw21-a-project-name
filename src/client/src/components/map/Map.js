import React from "react";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRoute, faRoad, faMountain, faUser, faBed, faMonument } from '@fortawesome/free-solid-svg-icons';

import styles from "./map_styles.json";
import { WMSLayer } from "./Layers";

import "./map.sass";


// environment variables
const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const GOOGLE_MAPS_ENDPOINT = process.env.REACT_APP_GOOGLE_MAPS_API_ENDPOINT;
const ELEVATIONS_WMS_ENDPOINT = process.env.REACT_APP_ELEVACIONES_WMS_ENDPOINT;
const STJAMES_WMS_ENDPOINT = process.env.REACT_APP_SANTIAGO_WMS_ENDPOINT;

const MAP_CENTER = [33.160417, -3.998637];


let helmetContext = {};

// map layers
let routeLayer, pointsOfInterestLayer, accomodationsLayer;
let santiagoWMS, elevationWMS;


function Map(props) {
    let map;

    /*
        Hides or shows a layer depending on the new state.

        This function is meant to be called when the user selects or
        deselects a layer from the map. The state of the layer is retrieved
        from the event and the layer is hidden or shown.

        Parameters
        ----------
        layer -> Layer object that will be hidden or shown.
        e -> Event that triggered the callback.
    */
    const onLayerChange = function(layer, e) {
        let active = e.target.checked;

        if (active) layer.show();
        else layer.hide();
    };

    /*
        Entrypoint of the map functionality.

        The map is created with custom styles and behaviour and all of our custom layers
        with additional functionality are created.
    */
    const initMap = function() {
        map = new window.google.maps.Map(document.getElementById("google-map"), {
                center: new window.google.maps.LatLng(MAP_CENTER[0], MAP_CENTER[1]), zoom: 6.8,
                mapTypeId: window.google.maps.MapTypeId.ROADMAP,  zoomControl: true,
                mapTypeControl: false, scaleControl: false, streetViewControl: false,
                rotateControl: false, fullscreenControl: false, draggable: true,
                gestureHandling: "cooperative", styles: styles
        });
    
        // creating WMS layers. order here is critical to determine the superposition of layers
        elevationWMS = new WMSLayer(ELEVATIONS_WMS_ENDPOINT, 'EL.GridCoverage',
            'Elevaciones', 'image/png', map, 0.475, true);
        santiagoWMS = new WMSLayer(STJAMES_WMS_ENDPOINT, props.route,
            props.route_style, 'image/png', map, 1.0, true);
    };

    // add the initMap function to window so it can be called after the google maps script is loaded
    window.initMap = initMap;

    return (
        <HelmetProvider context={helmetContext}>
            <section id="map-wrapper">
                <div id="google-map"></div>
                <ul id="layer-buttons">
                    <li>
                        <input id="elevation-ckb" type="checkbox" defaultChecked={true}  onChange={(e) => onLayerChange(elevationWMS, e)}></input>
                        <p>Elevaciones</p>
                        <FontAwesomeIcon icon={faMountain} />
                    </li>
                    <li>
                        <input id="way-ckb" type="checkbox" defaultChecked={true} onChange={(e) => onLayerChange(santiagoWMS, e)}></input>
                        <p>Camino</p>
                        <FontAwesomeIcon icon={faRoad} />
                    </li>
                    <li>
                        <input id="way-ckb" type="checkbox"></input>
                        <p>Ruta del día</p>
                        <FontAwesomeIcon icon={faRoute} />
                    </li>
                    <li>
                        <input id="way-ckb" type="checkbox"></input>
                        <p>Puntos de interés</p>
                        <FontAwesomeIcon icon={faMonument} />
                    </li>
                    <li>
                        <input id="way-ckb" type="checkbox"></input>
                        <p>Alojamientos</p>
                        <FontAwesomeIcon icon={faBed} />
                    </li>
                    <li>
                        <input id="way-ckb" type="checkbox"></input>
                        <p>Usuarios</p>
                        <FontAwesomeIcon icon={faUser} />
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