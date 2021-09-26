const GOOGLE_MAPS_TILE_SIZE = 256;

/*
    This class represents a raster layer obtained from a WMS server.

    It handles the communication with the WMS service and the creation
    of images tiles that can be processed by google maps.

    Parameters
    ----------
    base_url: String
        String with the base url of the WMS service.
    layers: String
        Layers to be loaded from the service, as defined in the GetCapabilities data. Each layer
        must be delimited by a comma.
    styles: String
        Styles to be applied to each layer.
    file_format: String
        File format of the image returned by the service and shown in the map.
    map: google.maps.Map object
        Instance of the map.
    opacity: float
        Float between 0 and 1 with the opacity of the layer.
    defaultActive: boolean
        Whether the layer will be initially shown or hidden.
*/
class WMSLayer {

    constructor(base_url, layers, styles, file_format, map, opacity, defaultActive) {
        this.base_url = base_url;
        this.layers = layers;
        this.styles = styles;
        this.file_format = file_format;
        this.map = map;
        this.opacity = opacity;
        this.overlayWMS = null;

        this.initOverlay();
        if (defaultActive) this.show();
    }
    
    /*
        Returns the layer image for the given tile.

        This function is automatically called by google maps when a new tile
        needs to be loaded.
    */
    getTile(coordinates, zoom) {
        // calculate bounding box of the image given the coordinates and zoom from google maps
        let proj = this.map.getProjection(); 
        let zfactor = Math.pow(2, zoom); 
        let top = proj.fromPointToLatLng(new window.google.maps.Point(coordinates.x * GOOGLE_MAPS_TILE_SIZE / zfactor,
                                         coordinates.y * 256 / zfactor) ); 
        let bot = proj.fromPointToLatLng(new window.google.maps.Point((coordinates.x + 1) * GOOGLE_MAPS_TILE_SIZE / zfactor,
                                         (coordinates.y + 1) * 256 / zfactor)); 
        let bbox = `${top.lng()},${bot.lat()},${bot.lng()},${top.lat()}`;

        // compose url of the wms server to fetch image in the correct bounds for the tile
        return `${this.base_url}?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&SRS=EPSG%3A4326&` + 
            `WIDTH=${GOOGLE_MAPS_TILE_SIZE}&HEIGHT=${GOOGLE_MAPS_TILE_SIZE}&FORMAT=${this.file_format}` + 
            `&TRANSPARENT=TRUE&LAYERS=${this.layers}&STYLES=${this.styles}&BBOX=${bbox}`;
    }

    show = () => this.overlayWMS.setOpacity(this.opacity);
    hide = () => this.overlayWMS.setOpacity(0);

    // Creates the overlay and registers it in the map.
    initOverlay() {
        let overlayOptions = {
            getTileUrl: this.getTile.bind(this),
            tileSize: new window.google.maps.Size(GOOGLE_MAPS_TILE_SIZE, GOOGLE_MAPS_TILE_SIZE)
        };

        this.overlayWMS = new window.google.maps.ImageMapType(overlayOptions);
        this.overlayWMS.setOpacity(this.opacity);

        this.map.overlayMapTypes.push(this.overlayWMS);
    }
}

class PointsLayer {}

class PolyLineLayer {}

export {WMSLayer, PointsLayer, PolyLineLayer};