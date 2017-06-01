import React from 'react';
import PropTypes from 'prop-types';
import './index.less';
import Link from '../Link';

const OptionsIntro = (props) => {
  return (
    <div className="options_intro_section">
      <h1 className="options_intro_headline">What can you do?</h1>
      <Link className="options_intro_back" onClick={props.goBack}>Back to statements</Link>
    </div>
  );
};

export default OptionsIntro;

OptionsIntro.propTypes = {
  goBack: PropTypes.func.isRequired,
};

OptionsIntro.displayName = 'OptionsIntro';
