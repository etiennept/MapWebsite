L.Control.MapControl  = L.Control.extend({
    onAdd(map){

    } ,
    onRemove(map){

    }
})
L.Control.LeftTopControl = L.Control.extend({
    onAdd: (map) => {
        this.htmlNode = L.DomUtil.create('div')
        this.htmlNode.id = "contain"
        this.htmlNode.rrr = () =>{
            console.log("eeeee")
        }
        this.resulse = L.DomUtil.create('div')
        this.resulse.new=() =>{ this.resulse.innerHTML = ""}
        this.resulse.quit=() =>{
            let quit = L.DomUtil.create('button'  )
            quit.text = "quit "
            L.DomEvent.on( quit , "click"  , () =>{
                this.resulse.new()
            })
            this.resulse.appendChild(quit)
        }
        let field = L.DomUtil.create('div')
        let input = L.DomUtil.create('input')
        let buttonField = L.DomUtil.create('button')
        field.appendChild(input)
        field.appendChild(buttonField)
        this.htmlNode.appendChild(field)
        this.htmlNode.appendChild(resulse)
        input.event=()=>{  }
        buttonField.event =()=>{ }
        L.DomEvent.on( input , "keypress"  , (event) => {
           if(event.key === "Enter" ) {
               event.target.event( )
           }
        } )
        L.DomEvent.on( buttonField , "click"  , ( event ) =>{
           event .target.event()
        })
        if(map.data !==null ){

        }
        return this.htmlNode
    },
    onRemove:(map) =>{
        L.DomUtil.remove(this.htmlNode)
    } ,
    onDisplay(map){

    }
})

map.topLeftControl = new L.Control.LeftTopControl({ position: 'topleft' })
map.addControl(map.topLeftControl)
map.addControl(L.control.zoom( {  position: 'topright'}))
