import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import GoogleMap from 'google-map-react';
import { push } from 'react-router-redux'

import Marker from '../../components/Marker';

export class Map extends Component {

  constructor(props) {
    super(props);
    this.defaultCenter = {
      lat: 37.744392,
      lng: 20.8618543
    }
  }

  onMarkerClick(key, marker) {
    this.props.onMarkerClick(marker._id);
  }

  onMapClick({ x, y, lat, lng, event }) {
    this.props.onMapClick();
  }

  render() {
    return (
      <GoogleMap
        bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
        defaultZoom={14}
        defaultCenter={this.defaultCenter}
        onChildClick={this.onMarkerClick.bind(this)}
        onClick={this.onMapClick.bind(this)}
      >
        {this.props.places.map(place => (
          <Marker
            key={place._id}
            lat={place.position.lat}
            lng={place.position.lng}
            {...place}
            onMouseDown={e => console.log(e)}
          />
        ))}
      </GoogleMap>
    );
  }
}

const mapStateToProps = state => ({
  places: state.places.places,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onMarkerClick: id => push(`/place/${id}`),
  onMapClick: _ => push('/')
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);