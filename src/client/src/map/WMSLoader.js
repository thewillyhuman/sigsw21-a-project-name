const GOOGLE_MAPS_TILE_SIZE = 256;

class WMSLoader {

    constructor(base_url, layers, styles, file_format, map) {
        this.base_url = base_url;
        this.layers = layers;
        this.styles = styles;
        this.file_format = file_format;
        this.map = map;
    }
    
    getTile(coordinates, zoom) {
        console.log(this);
        let proj = this.map.getProjection(); 
        let zfactor = Math.pow(2, zoom); 
        let top = proj.fromPointToLatLng(new window.google.maps.Point(coordinates.x * 256 / zfactor, coordinates.y * 256 / zfactor) ); 
        let bot = proj.fromPointToLatLng(new window.google.maps.Point((coordinates.x + 1) * 256 / zfactor, (coordinates.y + 1) * 256 / zfactor)); 
        let bbox = top.lng() + "," + bot.lat() + "," + bot.lng() + "," + top.lat();
        
        let res = `${this.base_url}?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&SRS=EPSG%3A4326&` + 
            `WIDTH=${GOOGLE_MAPS_TILE_SIZE}&HEIGHT=${GOOGLE_MAPS_TILE_SIZE}&FORMAT=${this.file_format}` + 
            `&TRANSPARENT=TRUE &LAYERS=${this.layers}&BBOX=${bbox}`;
        console.log(res);
        return res;
    }
}

export default WMSLoader;