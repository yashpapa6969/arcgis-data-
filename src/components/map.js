import React from 'react';
import { loadModules } from 'esri-loader';

export class WebMapView extends React.Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.state = {
      map: null,
    }
  }
  

  /*
    when user toggles a layer on and off, compare the new state of the props and if the props are inactive
    remove the layer from this.maps, if the prop has become active, add a new layer to maps with that props url
  */
 componentWillReceiveProps(){
console.log("if a prop has active set to true, this.map will add a layer using prop url")
    loadModules(["esri/layers/FeatureLayer"])
      .then(([FeatureLayer])=>{
        console.log(this.props.data[0].active,this.props.data[1].active,this.props.data[2].active)

        var layers = this.map.layers
        layers.removeAll()
        console.log("layers",layers) 
        
        console.log(this.map) //layers seem to be added but the map isn't changing

        for(let i = 0; i < this.props.data.length; i++){
          if(this.props.data[i].active === true){

            var newlayer = new FeatureLayer({
              url: this.props.data[i].url
            })
            
            this.map.add(newlayer)
          }
        }

  
    })
 
 }


  
 
  componentDidMount() {

    // lazy load the required ArcGIS API for JavaScript modules and CSS
    loadModules(['esri/Map', 'esri/views/MapView',"esri/widgets/Search","esri/layers/FeatureLayer"], { css: true })
    .then(([ArcGISMap, MapView, Search, FeatureLayer]) => {

      const map = new ArcGISMap({
        basemap: 'topo'
      });

      this.view = new MapView({
        container: this.mapRef.current,
        map: map,
        center: [-118, 34],
        zoom: 5
      });

      
      var fires = new FeatureLayer({
        url: this.props.data[0].url
      });
          map.add(fires);

      var floods = new FeatureLayer({
        url:this.props.data[1].url
      })
          map.add(floods);
    

      var quakes = new FeatureLayer({
        url: this.props.data[2].url
      })
          map.add(quakes)

var search = new Search({
        view: this.view
      });

      this.view.ui.add(search, "top-right");
      this.map = map
      console.log(this.map)

    });
  }



  componentWillUnmount() {
    if (this.view) {
      // destroy the map view
      this.view.destroy();
    }
  }

  render() {
    var prevProps = this.props
    return (
      <div className="webmap" ref={this.mapRef} />
    );
  }
}
