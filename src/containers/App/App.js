import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'

import { getPlaces } from '../../actions/places';
import PlaceInfo from '../../components/PlaceInfo';
import MapView from '../../components/MapView';

import './App.css';

export class App extends Component {

  constructor(props) {
    super(props);
    this.props.getPlaces();
  }

  render() {

    return (
      <div className="App">
        <div className="App-Map">
          <Route path="/" component={MapView} />
        </div>
        <Route path="/place/:id" component={PlaceInfo} />
      </div>

    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getPlaces
}, dispatch);

export default withRouter(connect(
  null,
  mapDispatchToProps
)(App));