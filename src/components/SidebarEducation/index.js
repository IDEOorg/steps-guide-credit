import React from 'react';
import PropTypes from 'prop-types';
import './index.less';

const SidebarEducation = (props) => {
  const sidebarBullets = props.sidebarBullets.map((sidebarBullet, i) => {
    return (
      <li key={i}>
        { sidebarBullet }
      </li>
    );
  });
  return (
    <div className="sidebar_education_box">
      <img className="sidebar_icon" src={props.sidebarImg} />
      <p className="sidebar_description">{props.sidebarDescription}</p>
      <ul className="sidebar_bullets">
        { sidebarBullets }
      </ul>
      <p className="dont_worry_tag">Dont worry-you still have options.</p>
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
