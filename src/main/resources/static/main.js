


loadMap()
/*function centerMap(popup){
    var  a = L.DomUtil.create("input")
    a.type = "button"
    a.value = "Center here"
    L.DomEvent.on( a  , "click"  , function (){
        map.panTo(popup.getLatLng());
        popup.remove();
    })
    popup.parent.appendChild(a)

}


function displayControlAddress(popup){
    var a = L.DomUtil.create("input")
    a.type = "button"
    a.value = "show adress and Coordonnate"
    L.DomEvent.on( a  , "click"  , function (){
        let x =popup.getLatLng()
        x.recharge()
        request.getAddress( x  ,
            function (text){
                if ( text === "{\"error\":\"Unable to geocode\"}"){
                    control.onDisplayAdrress(x , "No address found")
                } else {
                    a = JSON.parse(text)
                    let features = a[ "features" ]
                    let b = features[0]
                    let properties= b["properties"]
                    console.log(properties)
                    let geocoding =properties["geocoding"]
                    let label = geocoding["label"]
                    control.onDisplayAdrress(x , label)
                }
            }
        )
    })
    popup.parent.appendChild(a)
}

let popup = L.popup();
popup.parent  = L.DomUtil.create("div")
popup.parent.class = "popus"
centerMap(popup)
displayControlAddress(popup)
function onMapclick(e) {
    popup
        .setLatLng(e.latlng)
        .openOn(map)
        .setContent(popup.parent)
}
map.on('contextmenu', onMapclick);
*/