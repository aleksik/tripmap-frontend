import React, { Component } from 'react';
import Autogrow from 'textarea-autogrow';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { createPlace } from '../../actions/places';
import { ContentPanel, ContentPanelHeader, ContentPanelMain, ContentPanelFooter } from '../../components/ContentPanel';
import Icon, { ICONS } from '../../components/Icon';
import { setEditModeMarker } from '../../actions/map';

import './PlaceEdit.css';

export class PlaceEdit extends Component {

  constructor(props) {
    super(props);

    this.state = {
      place: {
        name: '',
        description: '',
        category: '',
        position: {
          lat: '',
          lng: ''
        }
      }
    }

    this.descriptionInput = null;
    this.growingDescriptionInput = null;
  }

  componentDidMount() {
    this.growingDescriptionInput = new Autogrow(this.descriptionInput);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.editModeMarker) {
      const newState = { ...this.state };
      newState.place.position = nextProps.editModeMarker;
      this.setState(newState);
    }
  }

  onInputChange(e) {
    const newState = { ...this.state.place };
    newState[e.target.name] = e.target.value;
    this.setState({ place: newState });
  }

  onPosInputChange(e) {
    const newState = { ...this.state.place };
    newState.position[e.target.name] = e.target.value;
    this.setState({ place: newState });
  }

  submit(e) {
    const { place } = this.state;
    if (place.position.lat && place.position.lng) {
      this.props.createPlace(place).then(_ => this.props.close());
    }
  }

  render() {

    if (!this.props.isAuthenticated) return null;

    return (
      <ContentPanel>
        <ContentPanelHeader>
          <h1>
            New place
            <Icon 
              icon={ICONS.CROSS}
              color="#FFFFFF"
              size={24}
              onClick={this.props.close}
            />
          </h1>
        </ContentPanelHeader>
        <ContentPanelMain>
        
          <h2>Place details</h2>

          <div className="Form-Input">
            <label htmlFor="place-name">Name</label>
            <input
              type="text"
              name="name"
              id="place-name"
              value={this.state.place.name}
              onChange={this.onInputChange.bind(this)}
            />
          </div>

          <div className="Form-Input">
            <label htmlFor="place-description">Description</label>
            <textarea 
              name="description"
              id="place-description"
              rows="3"
              value={this.state.place.description}
              ref={ ref => { this.descriptionInput = ref; } }
              onChange={this.onInputChange.bind(this)}
            />
          </div>

          <div className="Form-Input">
            <label htmlFor="place-category">Category</label>
            <select
              required
              name="category" 
              id="place-category"
              value={this.state.category}
              onChange={this.onInputChange.bind(this)}
            >
              <option value="" disabled>Choose</option>
              <option value="hotel">Hotel</option>
              <option value="restaurant">Restaurant</option>
              <option value="beach">Beach</option>
            </select>
          </div>

          <h2>Location</h2>

          <div className="Form-Row -stretch">

            <div className="Form-Input">
              <label htmlFor="place-lat">Latitude</label>
              <input 
                readOnly
                type="number"
                name="lat" 
                id="place-lat" 
                value={this.state.place.position.lat}
                onChange={this.onPosInputChange.bind(this)}
              />
              <div className="Form-Input-Helper">
                Click on the map to set location.
              </div>
            </div>

            <div className="Form-Input">
              <label htmlFor="place-lng">Longitude</label>
              <input 
                readOnly
                type="number" 
                name="lng" 
                id="place-lng"
                value={this.state.place.position.lng}
                onChange={this.onPosInputChange.bind(this)}
              />
            </div>
          
          </div>
        
        </ContentPanelMain>
        <ContentPanelFooter>
          <div className="Form-Row -alignRight">
            <button className="Button Button--primary" onClick={this.submit.bind(this)}>Save</button>
            <button className="Button" onClick={this.props.close}>Cancel</button>
          </div>
        </ContentPanelFooter>
      </ContentPanel>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
  place: state.places.places.find(place => place._id === state.places.activePlace) || {},
  editModeMarker: state.map.editModeMarker
});

const mapDispatchToProps = dispatch => bindActionCreators({
  close: () => {
    dispatch(setEditModeMarker(null));
    return push(`/`)
  },
  createPlace
}, dispatch);


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaceEdit);