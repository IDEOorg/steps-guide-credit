import React from 'react';
import PropTypes from 'prop-types';
import './index.less';

const FullPageBox = (props) => {
  return (
    <div className="full_page_box">
      <p className="full_page_text">
        { props.textBegin }
      </p>
      <div className="full_page_img">
        <img src={props.img}/>
      </div>
      <p className="full_page_text">
        {props.textEnd}
      </p>
    </div>
  );
};

export default FullPageBox;

FullPageBox.propTypes = {
  textBegin: PropTypes.string.isRequired,
  img: PropTypes.string,
  textEnd: PropTypes.string
};

FullPageBox.displayName = 'FullPageBox';
