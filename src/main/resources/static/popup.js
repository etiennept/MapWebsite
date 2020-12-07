map.popup = L.popup();

map.popup.centerMap = () =>{
    let a = L.DomUtil.create("button")
    a.value = "Center here"
    L.DomEvent.on( a  , "click"  ,  ()=>{
        map.panTo(popup.getLatLng());
        map.popup.remove();
    })
    map.popup.parent.appendChild(a)
}
map.popup.displayControlAddress = () =>  {
    let a = L.DomUtil.create("button")

    a.value = "show adress and Coordonnate"
    L.DomEvent.on( a  , "click"  , ()=>{
        let x = map.popup.getLatLng()

    })
    map.popup.parent.appendChild(a)
}

map.popup.func = ( latlng )=> {
    map.popup.parent = L.DomUtil.create("div")
    map.popup.parent.class = "popus"
    map.popup.centerMap()
    map.popup.displayControlAddress()
    map.popup
        .setLatLng(latlng)
        .openOn(map)
        .setContent(map.popup.parent)

}



