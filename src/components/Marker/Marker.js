import React from 'react';
import classNames from 'classnames';
import Icon, { ICONS } from '../../components/Icon';

import './Marker.css';



const Marker = props => (
  <div 
    className={classNames(
      'Marker', 
      props.category,
      { 'hover': props.$hover },
      { 'editModeMarker': props.editModeMarker }
    )}
  >
    <Icon icon={ICONS.PLACE} size={24} />
  </div>
    
);

export default Marker;