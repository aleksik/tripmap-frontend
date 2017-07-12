import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import GoogleMap from 'google-map-react';
import { push } from 'react-router-redux';

import { setEditModeMarker } from '../../actions/map';
import Marker from '../../components/Marker';

export class Map extends Component {
  
  onMarkerClick(key, marker) {
    if (!this.props.editMode) {
      this.props.onMarkerClick(marker._id);
    }
  }

  onMapClick({ x, y, lat, lng, event }) {
    if (this.props.editMode) {
      return this.props.setEditModeMarker({
        lat, lng
      });
    }
    this.props.onMapClick();
  }

  render() {
    return (
      <GoogleMap
        bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
        defaultZoom={14}
        hoverDistance={this.props.editMode ? 0 : 30}
        defaultCenter={this.props.defaultCenter}
        onChildClick={this.onMarkerClick.bind(this)}
        onClick={this.onMapClick.bind(this)}
      >
        {!this.props.editMode && this.props.places.map(place => (
          <Marker
            key={place._id}
            lat={place.position.lat}
            lng={place.position.lng}
            {...place}
          />
        ))}
        {this.props.editMode && this.props.editModeMarker && (
          <Marker editModeMarker
            lat={this.props.editModeMarker.lat}
            lng={this.props.editModeMarker.lng}
          />
        )}
      </GoogleMap>
    );
  }
}

const mapStateToProps = state => {
  return {
    defaultCenter: state.map.defaultCenter,
    editMode: state.map.editMode,
    editModeMarker: state.map.editModeMarker,
    places: state.places.places
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  onMarkerClick: id => push(`/place/${id}`),
  onMapClick: _ => push('/'),
  setEditModeMarker: position => setEditModeMarker(position)
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);