

let eeetttt=(event) => {
    let latlng = event.target.getCenterLatLng( )
    event.target.ZoomCenterCookie(latlng)
    event.target.changeUrl( latlng)
    event.target.popup.removeFrom(event.target )
}

map.on("zoomend", eeetttt);
map.on("moveend", eeetttt) ;
map.on("baselayerchange", (data) => {
    data.target.baseLayer = data.name
    localStorage.setItem("baselayer", data.name)
    data.target.changeUrl( data.target.getCenterLatLng( )  )
});
/*map.leftControlfunc( ) */
map.on('contextmenu', (e)=>{
    e.target.popup.func(e.latlng)
});