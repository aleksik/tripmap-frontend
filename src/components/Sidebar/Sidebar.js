import React from 'react';

const Sidebar = props => (
  <ul className="Places">
    {props.places.map(place => (
      <li className="Places-Item" key={place._id}>
        <h4>{place.name}</h4>
      </li>
    ))}
  </ul>
);

export default Sidebar;