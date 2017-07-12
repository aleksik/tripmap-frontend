import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'

import { getPlaces } from '../../actions/places';
import PlaceInfo from '../../components/PlaceInfo';
import MapView from '../../components/MapView';
import Navbar from '../../components/Navbar';
import PlaceEdit from '../../components/PlaceEdit';

import './App.css';

export class App extends Component {

  constructor(props) {
    super(props);
    this.props.getPlaces();
  }

  render() {

    return (
      <div className="App">
        <div className="App-Navbar">
          <Navbar />
        </div>
        <div className="App-Map">
          <Route path="/" component={MapView} />
        </div>
        <Route exact path="/place/:id" component={PlaceInfo} />
        <Route exact path="/add" component={PlaceEdit} />
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