import React from 'react';
import classNames from 'classnames';

import './ContentPanel.css';

export const ContentPanel = props => (
  <div className={classNames('ContentPanel', props.className)}>
    <div className="ContentPanel-Container">
      {props.children}
    </div>
  </div>
);

export const ContentPanelHeader = props => (
  <div className={classNames('ContentPanel-Header', props.className)}>
    {props.children}
  </div>
);

export const ContentPanelMain = props => (
  <div className={classNames('ContentPanel-Main', props.className)}>
    {props.children}
  </div>
);

export const ContentPanelFooter = props => (
  <div className={classNames('ContentPanel-Footer', props.className)}>
    {props.children}
  </div>
);