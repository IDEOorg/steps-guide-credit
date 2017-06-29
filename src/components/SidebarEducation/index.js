import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import './index.less';

const SidebarEducation = (props) => {
  return (
    <div className="sidebar_education_box">
      <img className="sidebar_icon" src={props.sidebarImg} />
      <div className="sidebar_content" dangerouslySetInnerHTML={ {"__html": marked(props.sidebarDescription)} } />
    </div>
  );
};

export default SidebarEducation;

SidebarEducation.propTypes = {
  goBack: PropTypes.func.isRequired,
  goBackText: PropTypes.string.isRequired,
  headlineText: PropTypes.string.isRequired,
};

SidebarEducation.displayName = 'SidebarEducation';
