import React from "react";
import ReactDOMServer from 'react-dom/server';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRoute, faRoad, faMountain, faUser, faBed, faMonument, faStar } from '@fortawesome/free-solid-svg-icons';

import styles from "./map_styles.json";
import test_data from "./test_data.json";
import { PointsLayer, PolyLineLayer, WMSLayer } from "./Layers";

import "./map.sass";


// environment variables
const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const GOOGLE_MAPS_ENDPOINT = process.env.REACT_APP_GOOGLE_MAPS_API_ENDPOINT;
const ELEVATIONS_WMS_ENDPOINT = process.env.REACT_APP_ELEVACIONES_WMS_ENDPOINT;
const STJAMES_WMS_ENDPOINT = process.env.REACT_APP_SANTIAGO_WMS_ENDPOINT;

const MAP_CENTER = [36.160417, -1.998637];


let helmetContext = {};

// map layers
let routeLayer, pointsOfInterestLayer, accommodationsLayer, usersLayer;
let santiagoWMS, elevationWMS;

// icons
let accommodationIcon, poiIcon, userIcon;


function Map(props) {
    let map;


    const loadRoute = function(route) {
        // creating WMS layers. order here is critical to determine the superposition of layers
        elevationWMS = new WMSLayer(ELEVATIONS_WMS_ENDPOINT, 'EL.GridCoverage',
            'Elevaciones', 'image/png', map, 0.775, true);
        santiagoWMS = new WMSLayer(STJAMES_WMS_ENDPOINT, props.way,
            props.way_style, 'image/png', map, 1.0, true);

        if (route == null) return;

        routeLayer = new PolyLineLayer(route.route_polyline, '#FBBF24', map, true);

        pointsOfInterestLayer = new PointsLayer(route.points_of_interest, poiIcon, map,
            infoCallback,
            true);

        accommodationsLayer = new PointsLayer(route.accommodations, accommodationIcon, map,
            infoCallback, true);
        
        if (props.users) usersLayer = new PointsLayer(props.users, userIcon, map, null, true);
    };

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
        if (layer == null) return;

        let active = e.target.checked;
        if (active) layer.show();
        else layer.hide();
    };

    const infoCallback = function(p) {
        const filledStar = ReactDOMServer.renderToStaticMarkup(<FontAwesomeIcon icon={faStar} className="filled" />);
        const emptyStar = ReactDOMServer.renderToStaticMarkup(<FontAwesomeIcon icon={faStar} />);
        
        let ratingHTML = "";
        for (let i = 0; i < 5; i++) {
            if (i < Math.round(p.rating)) ratingHTML += filledStar;
            else ratingHTML += emptyStar;
        }

        let accomodationImage = "";
        if (p.photos && p.photos.length > 0) {
            accomodationImage += `<img class="accommodation-img" src="https://maps.googleapis.com/maps/api/place/photo?maxwidth=800` + 
                `&photoreference=${p.photos[0].photoReference}&key=${GOOGLE_MAPS_API_KEY}" alt="Pic From Google"></img>`;
        }

        return `<div class="infowindow-content"><h2 id="firstHeading" class="first-heading">${p.name}</h2>` +
        `<div class="body-content"><p>Valoración: ${ratingHTML}</p>${accomodationImage}</div>`;
    }

    /*
        Entrypoint of the map functionality.

        The map is created with custom styles and behaviour and all of our custom layers
        with additional functionality are created.
    */
    const initMap = function() {
        console.log('init_map');
        console.log(test_data.route.route_stages[0]);
        map = new window.google.maps.Map(document.getElementById("google-map"), {
                center: new window.google.maps.LatLng(MAP_CENTER[0], MAP_CENTER[1]), zoom: 7,
                mapTypeId: window.google.maps.MapTypeId.ROADMAP,  zoomControl: true,
                mapTypeControl: false, scaleControl: false, streetViewControl: false,
                rotateControl: false, fullscreenControl: false, draggable: true,
                gestureHandling: "cooperative"
        });

        accommodationIcon = {url: "icons/accommodation.png", scaledSize: new window.google.maps.Size(50, 50)};
        poiIcon = {url: "icons/poi.png", scaledSize: new window.google.maps.Size(50, 50)};
        userIcon = {url: "icons/user.png", scaledSize: new window.google.maps.Size(50, 50)};

    };

    // add the initMap function to window so it can be called after the google maps script is loaded
    window.initMap = initMap;

    return (
        <HelmetProvider context={helmetContext}>
            <section id="map-wrapper">
                <div id="google-map"></div>
                <div id="layer-buttons">
                    <h3>Lista de capas</h3>
                    <ul>
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
                            <input id="route-ckb" type="checkbox" defaultChecked={true} onChange={(e) => onLayerChange(routeLayer, e)}></input>
                            <p>Ruta del día</p>
                            <FontAwesomeIcon icon={faRoute} />
                        </li>
                        <li>
                            <input id="poi-ckb" type="checkbox" defaultChecked={true} onChange={(e) => onLayerChange(pointsOfInterestLayer, e)}></input>
                            <p>Puntos de interés</p>
                            <FontAwesomeIcon icon={faMonument} />
                        </li>
                        <li>
                            <input id="accomodations-ckb" type="checkbox" defaultChecked={true} onChange={(e) => onLayerChange(accommodationsLayer, e)}></input>
                            <p>Alojamientos</p>
                            <FontAwesomeIcon icon={faBed} />
                        </li>
                        <li>
                            <input id="users-ckb" type="checkbox" onChange={(e) => onLayerChange(usersLayer, e)}></input>
                            <p>Usuarios cercanos</p>
                            <FontAwesomeIcon icon={faUser} />
                        </li>
                    </ul>
                </div>

                <div id="terrain-legend">
                    <h3>Elevaciones <span>(m)</span></h3>
                    <img src="elevations.png" />
                </div>

                <Helmet>
                    <script
                        type="text/javascript"
                        charset="UTF-8"
                        async={true}
                        defer={true}
                        src={`${GOOGLE_MAPS_ENDPOINT}?key=${GOOGLE_MAPS_API_KEY}&callback=initMap&libraries=geometry`}
                    />
                </Helmet>
            </section>
        </HelmetProvider>
    );
}

export default Map;