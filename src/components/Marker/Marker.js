import React from 'react';
import classNames from 'classnames';

import './Marker.css';



const Marker = props => (
  <div 
    className={classNames(
      'Marker', 
      props.category, 
      { 'hover': props.$hover },
      { 'movable': props.movable }
    )}
  />
);

export default Marker;