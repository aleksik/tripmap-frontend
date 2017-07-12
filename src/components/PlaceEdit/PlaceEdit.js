import React, { Component } from 'react';
import Autogrow from 'textarea-autogrow';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { ContentPanel, ContentPanelHeader, ContentPanelMain, ContentPanelFooter } from '../../components/ContentPanel';
import Icon, { ICONS } from '../../components/Icon';
import { setEditModeMarker } from '../../actions/map';

import './PlaceEdit.css';


export class PlaceEdit extends Component {

  constructor(props) {
    super(props);

    this.descriptionTextarea = null;
    this.growingDescriptionTextarea = null;
  }

  componentDidMount() {
    this.growingDescriptionTextarea = new Autogrow(this.descriptionTextarea);
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
              size="24"
              onClick={this.props.close}
            />
          </h1>
        </ContentPanelHeader>
        <ContentPanelMain>
        
          <h2>Place details</h2>

          <div className="Form-Input">
            <label htmlFor="place-name">Name</label>
            <input type="text" name="name" id="place-name" />
          </div>

          <div className="Form-Input">
            <label htmlFor="place-description">Description</label>
            <textarea name="description" id="place-description" rows="3" 
              ref={ref => { this.descriptionTextarea = ref; }} />
          </div>

          <div className="Form-Input">
            <label htmlFor="place-category">Category</label>
            <select name="category" id="place-category">
              <option value="hotel">Hotel</option>
              <option value="restaurant">Restaurant</option>
              <option value="beach">Beach</option>
            </select>
          </div>

          <h2>Location</h2>

          <div className="Form-Row -stretch">

            <div className="Form-Input">
              <label htmlFor="place-lat">Latitude</label>
              <input type="number" readOnly name="lat" id="place-lat" value={this.props.editModeMarker && this.props.editModeMarker.lat} />
              <div className="Form-Input-Helper">
                Click on the map to set location.
              </div>
            </div>

            <div className="Form-Input">
              <label htmlFor="place-lng">Longitude</label>
              <input type="number" readOnly name="lng" id="place-lng" value={this.props.editModeMarker && this.props.editModeMarker.lng} />
            </div>
          
          </div>
        
        </ContentPanelMain>
        <ContentPanelFooter>
          <div className="Form-Row -alignRight">
            <button className="Button Button--primary">Save</button>
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
    dispatch(push(`/`));
    dispatch(setEditModeMarker(null));
  },
}, dispatch);


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaceEdit);