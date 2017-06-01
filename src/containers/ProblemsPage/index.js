import React from 'react';
import './index.less';
import ProblemsSection from '../ProblemsSection';
const introImg = require('../../assets/city-scene.svg');

const ProblemsPage = () => {
  return (
    <div className="main_page">
      <div className="intro_main_section">
        <img className="intro_image" src={introImg}/>
        <div className="intro_main_intro">
          <h1 className="intro_headline">I Got Denied</h1>
          <p className="intro_tagline">If you're having a hard time qualifying for a loan or getting an apartment you want, your credit could be to blame. But it's within your power to build your credit profile and unlock financial possibilities.</p>
        </div>
      </div>
      <ProblemsSection />
    </div>
  );
};

export default ProblemsPage;

ProblemsPage.displayName = 'Problems Page';
