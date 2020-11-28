request = new XMLHttpRequest() ;

request.get = function(url , response ){
    this.onreadystatechange = function(){
        if (this.readyState === 4 && this.status === 200) {
            response(this.responseText)
        }
    }
    this.open("get", url);
    this.send()
}
request.post = function (url, value , response ,  header  ){
    this.onreadystatechange = function(){
        if (this.readyState === 4 && this.status === 200) {
            response(this.responseText)
        }
    }
    this.open("post", url);
    this.setRequestHeader( header.name , header.value );
    this.send(value)
}
request.getAddress = function (latlng , func ){
    var e = "https://nominatim.openstreetmap.org/reverse?format=geocodejson&lat=" + latlng.lat.toString() + "&lon=" + latlng.lng.toString()
    this.get(e  , func )
}