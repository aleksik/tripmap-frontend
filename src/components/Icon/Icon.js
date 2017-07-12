import React from 'react';
import PropTypes from 'prop-types';

export const ICONS = {
  PLACE: 'M512 490c58 0 106-48 106-106s-48-106-106-106-106 48-106 106 48 106 106 106zM512 86c166 0 298 132 298 298 0 224-298 554-298 554s-298-330-298-554c0-166 132-298 298-298z',
  ADD_PLACE: 'M682 426v-84h-128v-128h-84v128h-128v84h128v128h84v-128h128zM512 86c164 0 298 134 298 298 0 224-298 554-298 554s-298-330-298-554c0-164 134-298 298-298z'
}

const Icon = props => {
  const styles = {
    svg: {
      display: 'inline-block',
      verticalAlign: 'middle'
    },
    path: {
      fill: props.color
    }
  };
  return (
    <svg
      style={styles.svg}
      width={`${props.size}px`}
      height={`${props.size}px`}
      viewBox="0 0 1024 1024"
    >
      <path
        style={styles.path}
        d={props.icon}
      ></path>
    </svg>
  );
}

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string
};

Icon.defaultProps = {
  size: 16
};

export default Icon;