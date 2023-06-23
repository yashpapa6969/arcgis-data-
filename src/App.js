import React, { Component } from 'react'
import './App.css';
import {WebMapView} from './components/map.js'
import { RiEarthquakeLine } from 'react-icons/ri';
import { RiFloodLine } from 'react-icons/ri';
import { AiOutlineFire } from 'react-icons/ai';

export default class App extends Component {
  constructor(props){
    super(props)
    this.state={
      data:[
      {
        name: 'fire',
        url: "https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/USA_Wildfires_v1/FeatureServer",
        active: true
      },
      {
        name: 'flood',
        url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/USA_Flood_Hazard_Reduced_Set_gdb/FeatureServer",
        active: true,
      },
      {
        name: 'quake',
        url: "https://services1.arcgis.com/VAI453sU9tG9rSmh/arcgis/rest/services/Major_Earthquakes_features/FeatureServer",
        active: true
      }
    ]
  }
    this.toggled = this.toggled.bind(this)
  }

  toggled(e){
    let id = e.currentTarget.id
    let dataArr = [...this.state.data];

    for(let i = 0; i< dataArr.length; i++){
      if (dataArr[i].name === id){
          dataArr[i].active = !dataArr[i].active
      }
      this.setState({data:dataArr})
    }
    
  }


  render() {

    return (
      <div className="App">
      <header className="App-header"> </header>

  

    <div className="leftMenu">
          <div className="nav">
          <ul className="toggleopts">
            <li id="quake" onClick={this.toggled} className="toggleicon"><RiEarthquakeLine /></li>
            <li id="flood" onClick={this.toggled} className="toggleicon"><RiFloodLine/></li>
            <li id="fire"  onClick={this.toggled} className="toggleicon"><AiOutlineFire/></li>
          </ul>
          </div>  


            <div className="EsriMapContainer">
              <WebMapView data={this.state.data} />
            </div>
      </div>

     
      
    </div>
    )
  }
}
