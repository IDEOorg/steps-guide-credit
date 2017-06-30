import React from 'react';
import PropTypes from 'prop-types';
import './index.less';

const AddendumBox = (props) => {
  return (
    <div className="addendum_box">
      <div className="addendum_text_box">
        <p className="addendum_headline">
          { props.headline }
        </p>
        <p className="addendum_text">
          {props.text}
        </p>
      </div>
    </div>
  );
};

export default AddendumBox;

AddendumBox.propTypes = {
  text: PropTypes.string.isRequired,
  headline: PropTypes.string
};

AddendumBox.displayName = 'AddendumBox';
