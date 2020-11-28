L.Control.LeftTopControl = L.Control.extend({
    htmlnode : L.DomUtil.create('div') ,
    onAdd:  (map) => {
        this.htmlnode.id = "contain"
        return this.htmlnode
    },

    onRemove:  (map) =>{
        L.DomUtil.remove(this.htmlnode)
    },
    onDisplayAddress :  ( latlng , address) =>{
        this.onRemoveView()
        displayAddress(this.htmlnode , latlng , address )
    },
    onRemoveView :() => {
        this.htmlnode.innerHTML= ""
    }

});
L.control.leftTopControl= function(opts) {
    return new L.Control.LeftTopControl(opts);
}
L.Control.MapControl  = L.Control.extend({
    onAdd(map){

    } ,
    onRemove(map){

    }
})


function displayAddress( parent , latlng , address ){
    var htmlCoordinnate = L.DomUtil.create('span')
    htmlCoordinnate.innerHTML = latlng.lat +" , "+ latlng.lng
    parent.appendChild(htmlCoordinnate)
    var htmlAddress = L.DomUtil.create('span')
    htmlAddress.innerHTML = address
    parent.appendChild(htmlAddress)
    var button = L.DomUtil.create("input")
    button.type='button'
    button.value='exit'
    button.id = 'exit'
    L.DomEvent.on( button ,  "click" ,  function (   ){
        parent.innerHTML = ""
    })
    parent.appendChild(button)
}
