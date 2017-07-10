import React, { Component } from 'react';
import classNames from 'classnames';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'
import { push } from 'react-router-redux'
import GoogleMap from 'google-map-react';

import { getPlaces } from '../../actions/places';
import Sidebar from '../../components/Sidebar';
import PlaceInfo from '../../components/PlaceInfo';
import Marker from '../../components/Marker';

import './Add.css';

export class Add extends Component {

  constructor(props) {
    super(props);

    this.defaultCenter = {
      lat: 37.744392,
      lng: 20.8618543
    }

    this.props.getPlaces();
  }

  onMapReady(mapProps, map) {
    this.map = map;
    this.google = mapProps.google;
  }

  componentDidMount() {
    this.placeInfo.addEventListener('transitionend', this.onTransitionEnd.bind(this));
  }

  componentWillUnmount() {
    this.placeInfo.removeEventListener('transitionend', this.onTransitionEnd.bind(this));
  }

  onTransitionEnd(e) {
    if (e.path[0].classList.contains('App-PlaceInfo')) {
      this.google.maps.event.trigger(this.map, "resize");
    }
  }

  onMarkerClick(key, marker) {
    this.props.onMarkerClick(marker._id);
  }

  render() {

    return (
      <div className="App">

        <div className="App-Map">
          <GoogleMap
            bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
            defaultZoom={14}
            defaultCenter={this.defaultCenter}
            onChildClick={this.onMarkerClick.bind(this)}
            onClick={this.props.onMapClick}
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

            <Route exact lat={37.75} lng={20.8618543} path="/add" children={({match}) => (
              match ? <Marker movable={true} /> : null
            )} />

          </GoogleMap>
        </div>

        <Route path="/place/:id" children={({ match }) => {

          let place;
          if (match) {
            place = this.props.places.find(place => place._id === match.params.id);
          }

          return (
            <div className={classNames('App-PlaceInfo', { 'open': match })} ref={ref => { this.placeInfo = ref; }}>
              <PlaceInfo place={place} />
            </div>
          );
          
        }} />        
        
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state,
  places: state.places.places,
  isRequesting: state.places.isRequesting
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getPlaces,
  onMarkerClick: id => push(`/place/${id}`),
  onPlaceInfoClose: _ => push('/'),
  onMapClick: _ => push('/')
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Add));