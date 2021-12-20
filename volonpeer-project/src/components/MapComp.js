import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker  } from 'google-maps-react';

const mapStyles = {
  width: '70%',
  height: '40%',
  margin: '0 auto',
  padding: '0',
};

class MapComp extends Component {
  constructor() {
    super();
    this.state = {
      name: "React"
    };
    
  }

  render() {
    return (
        console.log(this.props.lat, this.props.long),
      <div className="">
        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={{
            lat: this.props.lat ,
            lng: this.props.long
          }}
        >
         <Marker
          onClick={this.onMarkerClick}
          name={'This is test name'}
        />
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(MapComp);