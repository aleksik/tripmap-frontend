import React, { Component } from 'react';
import classNames from 'classnames';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'
import { Map, Marker } from 'google-maps-react'
import { push } from 'react-router-redux'

import { getPlaces } from '../../actions/places';
import Sidebar from '../../components/Sidebar';
import PlaceInfo from '../../components/PlaceInfo';

import './App.css';

export class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      openSidebar: false,
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

  toggleSidebar() {
    this.setState({
      openSidebar: !!!this.state.openSidebar
    });
  }

  render() {

    const appClass = classNames('App', {
      'open-sidebar': this.state.openSidebar
    });

    return (
      <div className={appClass}>

        <div className="App-Sidebar">
          <Sidebar places={this.props.places} />
        </div>

        <div className="App-OpenSidebar" onClick={this.toggleSidebar.bind(this)}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className="App-Map">
          <Map
            onReady={this.onMapReady.bind(this)}
            google={window.google}
            containerStyle={{width: '100%', height: '100%'}}
            disableDefaultUI={true}
            onClick={this.props.onMapClick}
            center={{
              lat: 37.744392,
              lng: 20.8618543
            }}
          >
            {this.props.places.map(place => (
              <Marker
                key={place._id}
                title={place.name}
                name={place.name}
                position={place.position}
                onClick={e => this.props.onMarkerClick(place._id)}
              />
            ))}
          </Map>
        </div>

        <Route path="/place/:id" children={({ match }) => {
          return (
            <div className={classNames('App-PlaceInfo', { 'open': match })} ref={ref => { this.placeInfo = ref; }}>
              <PlaceInfo />
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
)(App));