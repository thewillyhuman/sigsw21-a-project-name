const GOOGLE_MAPS_TILE_SIZE = 256;

class WMSLayer {

    constructor(base_url, layers, styles, file_format, map, opacity, active) {
        this.base_url = base_url;
        this.layers = layers;
        this.styles = styles;
        this.file_format = file_format;
        this.map = map;
        this.active = active;
        this.opacity = opacity;
        
        if (this.active) this.initOverlay();
    }
    
    getTile(coordinates, zoom) {
        let proj = this.map.getProjection(); 
        let zfactor = Math.pow(2, zoom); 
        let top = proj.fromPointToLatLng(new window.google.maps.Point(coordinates.x * 256 / zfactor, coordinates.y * 256 / zfactor) ); 
        let bot = proj.fromPointToLatLng(new window.google.maps.Point((coordinates.x + 1) * 256 / zfactor, (coordinates.y + 1) * 256 / zfactor)); 
        let bbox = top.lng() + "," + bot.lat() + "," + bot.lng() + "," + top.lat();
        
        return `${this.base_url}?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&SRS=EPSG%3A4326&` + 
            `WIDTH=${GOOGLE_MAPS_TILE_SIZE}&HEIGHT=${GOOGLE_MAPS_TILE_SIZE}&FORMAT=${this.file_format}` + 
            `&TRANSPARENT=TRUE&LAYERS=${this.layers}&STYLES=${this.styles}&BBOX=${bbox}`;
    }

    changeLayers(newLayers, newStyles) {
        if (newLayers.length !== newStyles.length) {
            console.error("Length of layers and styles array must be the same");
            return;
        }

        this.layers = newLayers;
        this.styles = newStyles;
    }

    initOverlay() {
        let overlayOptions = {
          getTileUrl: this.getTile.bind(this),
          tileSize: new window.google.maps.Size(GOOGLE_MAPS_TILE_SIZE, GOOGLE_MAPS_TILE_SIZE)
        };

        let overlayWMS = new window.google.maps.ImageMapType(overlayOptions);
        overlayWMS.setOpacity(this.opacity);

        this.map.overlayMapTypes.push(overlayWMS);
    }
}

class PointsLayer {}

class PolyLineLayer {}

export {WMSLayer, PointsLayer, PolyLineLayer};