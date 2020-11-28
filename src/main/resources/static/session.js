var markerGroup = L.layerGroup();


var markerControl= {
    "marker" : markerGroup
} ;

map.addControl(L.control.layers(baseMaps, markerControl));


request.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
        var respond = JSON.parse(this.responseText);
        for (i = 0; i < respond.length; i++) {
            var maker = respond[i];
            var properties = maker.properties;
            var text = properties.text;
            var geometry = maker.geometry;
            let coordinates = geometry.coordinates;
            let marker = L.marker({lat: coordinates[0], lng: coordinates[1]})
            marker.new(text) ;
        }
    }
};

request.open("GET", "marker/selectAll");
request.send();

L.marker.new = function ( text ) {
    marker = L.marker(latlng);

        marker.on("click", function () {
            marker.bindPopup(text).openPopup();
            marker.unbindPopup()
        });



    var markerPopup = L.popup();
    marker.on("contextmenu", function () {
        marker.bindPopup(markerPopup).openPopup();
        function markerPopupFonction() {
            var ee = "<div class = popus>" +
                "<input type=\"button\" value=\"show coordinates\"  id = \"showlatlng\"/> " +
                "<input type=\"button\" value=\"update\"  id = \"updateMarker\"/>" +
                "<input type=\"button\" value=\"remove\"  id = \"removeMarker\"/>" + "</div>";
            var tt = "<div class = 'popus'> " + "<input id = \"description\"/>  " +
                "<div ><input type=\"button\" value=\"enter\"  id = \"sumitMarker\"/></div>" +
                "<div> <input type=\"button\" value=\"return\"  id = \"return\"/> </div>" + "</div>";
            markerPopup.setContent(ee);
            document.getElementById("showlatlng").addEventListener("click", function () {
                markerPopup.setContent(latlngtohtml(latlng));
                document.getElementById("return").addEventListener("click", markerPopupFonction)
            });

            document.getElementById("updateMarker").addEventListener("click", function () {
                markerPopup.setContent(tt);
                document.getElementById("description").value = text;
                document.getElementById("sumitMarker").addEventListener("click", function () {
                    var text = document.getElementById("description").value;

                    requestMarker("marker/updatetext", latlng, text);
                    markerPopup.remove();
                    rrr(text) ;
                });
                document.getElementById("return").addEventListener("click", markerPopupFonction)
            });
            document.getElementById("removeMarker").addEventListener("click", function () {
                map.removeLayer(marker);
                markerGroup.removeLayer(marker);
                markerPopup.remove();
                requestMarker("marker/remove", latlng, text)
            });
        }
        markerPopupFonction();
        marker.unbindPopup();

    });
    markerGroup.addLayer(marker);
    return marker ;

}

function requestMarker(url, latlng, text) {
    request.open("POST", url);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify({
            "type": "Feature",
            "properties": {
                "name": text
            },
            "geometry": {
                "type": "Point",
                "coordinates": [latlng.lat, latlng.lng]
            }
        })
    )
}

function addMarker(latlng , text) {
    getMarker(latlng, text) ;
    var request = new XMLHttpRequest() ;
    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log(this.responseText);
        }
    };
    requestMarker("/marker/add", latlng, text)
}


 var   popup = L.popup();
function onMapMarkerClick(e) {

    popup
        .setLatLng(e.latlng)
        .openOn(map);

    function ttt() {
        var ee = "<div class = popus >" +
            "<input type=\"button\" value=\"show coordinates\"  id = \"showlatlng\"/> " +
            "<input type=\"button\" value=\"center here\"  id = \"centerMap\"/>" +
            "<input type=\"button\" value=\"add marker\"  id = \"addMarker\"/>" + "</div>";


        var tt = "<div class = popus>" + "<input  value='\'\  id = \"description\"/>  " +
            "<div> <input type=\"button\" value=\"enter\"  id = \"sumitMarker\"/>" +
            "<input type=\"button\" value=\"return\"  id = \"return\"/> </div>" + "</div>";
        popup.setContent(ee);
        document.getElementById("centerMap").addEventListener("click", function () {
            map.panTo(e.latlng);
            popup.remove();
        });
        document.getElementById("addMarker").addEventListener("click", function () {
            popup.setContent(tt);
            document.getElementById("sumitMarker").addEventListener("click", function () {
                addMarker(e.latlng, document.getElementById("description").value);
                popup.remove();
            });
            document.getElementById("return").addEventListener("click", ttt)
        });
        document.getElementById("showlatlng").addEventListener("click", function () {
            popup.setContent(latlngtohtml(e.latlng));
            document.getElementById("return").addEventListener("click", ttt) ;
        })

    }
    ttt()
}

markerGroup.on("add" , function () {
    map.on('contextmenu', onMapMarkerClick);
}) ;
markerGroup.on("remove" , function () {
    map.on('contextmenu', onMapClick);
});
map.on('contextmenu', onMapClick);