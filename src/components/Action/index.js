import React from 'react';
import PropTypes from 'prop-types';
import './index.less';

const Action = (props) => {
  if(!props.img) {
    return (
      <div className="action">
        <div className="action_form">
          {props.children}
        </div>
      </div>
    )
  }
  return (
    <div className="action">
      <div className="action_capsule">
        <div className="action_img">
          <img src={props.img}/>
        </div>
        <div className="action_content">
          <h3 className="action_headline">{props.headline}</h3>
          <p className="action_text">{props.text}</p>
          <div className="action_form">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Action;

Action.propTypes = {
  img: PropTypes.string.isRequired,
  headline: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  children: PropTypes.element
};

Action.displayName = 'Action';
