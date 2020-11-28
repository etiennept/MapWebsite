

function coor (float, int){
    return parseFloat(float.toString().match( "[0-9]+[.][0-9]{" + int.toString() + "}")[0])
}
function getLng ( int  ){
    return   (int + 180) % 360 - 180
}
function getLaglng (laglng, int){
    return {lat: coor(laglng.lat, int), lng: coor(getLng(laglng.lng), int)}
}


function loadMap(){
    let urlhash = window.location.hash
    let zoom = localStorage.getItem("zoom")
    let lat = localStorage.getItem("centerlat")
    let lng = localStorage.getItem("centerlng")
    let slayer = localStorage.getItem("baselayer")
    let map
    if ("" !== urlhash ) {
        let b = window.location.hash.split("/");
        if (b.length === 4) {
            let c = b[0].split("=")
            map = onmap(parseInt(c[1]), parseFloat(b[1]), parseFloat(b[2]), b[3])
        }else  {
            throw Error("eeeee")
        }
    } else if (zoom != null && lat  != null && lng  != null && slayer !=null  ) {
        map = onmap(zoom,
            parseFloat(lat),
            parseFloat(lng),
            slayer
        )
    }else {

        map = onmap(1, 23.9, 30.9, "Openstreetmap")
    }

    map.getCenterR = ()=> {
        let zoom = map.getZoom( )
        let center = map.getCenter()
        if (zoom <= 1) {
            return getLaglng(center, 0)
        } else if (zoom === 2) {
            return getLaglng(center, 1)
        } else if (zoom <= 4) {
            return getLaglng(center, 2)
        } else if (zoom <= 8) {
            return getLaglng(center, 3)
        } else if (zoom <= 16) {
            return getLaglng(center, 4)
        } else if (zoom <= 19) {
            return getLaglng(center, 5)
        }else {
            throw Error("eeeeeee")
        }
    }
    map.changeUrl = () => {
        let a = map.getCenterR()
        window.location.hash = "map=" + map.getZoom().toString() + "/" +  a.lat + "/" + a.lng  + "/" +map.baseLayer;
        history.pushState(null, null, window.location)
    }
    map.ZoomCenterCookie=()=>{
        localStorage.setItem("zoom", map.getZoom().toString() )
        localStorage.setItem("centerlat", map .getCenterR().lat.toString())
        localStorage.setItem("centerlng", map.getCenterR().lng.toString())
    }
    let eeetttt=(e) => {
        e.target.ZoomCenterCookie()
        e.target.changeUrl()
    }

    /*map.addControl(L.control.leftTopControl({ position: 'topleft' }))
    map.addControl(L.control.zoom( {  position: 'bottomright'}))*/

    map.on("zoomend", eeetttt );
    map.on("moveend", eeetttt) ;
    map.on("baselayerchange", (data) => {
        this.baseLayer = data.name
        localStorage.setItem("baselayer", data.name)
        changeUrl()
    });
    return map
}


function onmap(zoom, lat, lng, layer){

    let baseMaps = {
        "Openstreetmap" :  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }),
        "Openstreetmap-fr": L.tileLayer("https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png", {
            maxZoom: 19,
        })
    };
    let map = L.map('map', {
        center: {lat: lat, lng: lng},
        zoom: zoom,
        layers: baseMaps[layer]
    });
    map.baseLayer = layer
    map.addControl(L.control.layers(baseMaps));
    return map
}






