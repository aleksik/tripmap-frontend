import React, { Component } from 'react';
import { connect } from 'react-redux'

import './PlaceInfo.css';

export const PlaceInfo = ({ place }) => {
  if (!place) return null;
  return (
    <div className="PlaceInfo">
      <div className="PlaceInfo-Content">
        <h1>{place.name}</h1>
        <div className="PlaceInfo--Description">
          {place.description}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  place: state.places.places.find(place => place._id === state.places.activePlace)
});

export default connect(
  mapStateToProps
)(PlaceInfo);