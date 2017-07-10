import React from 'react';
import './index.less';
import ProblemsSection from '../ProblemsSection';
const introImg = require('../../assets/credit-icon.gif');

const ProblemsPage = () => {
  return (
    <div className="main_page">
      <div className="intro_main_section">
        <img className="intro_image" src={introImg}/>
        <div className="intro_main_intro">
          <h1 className="intro_headline">My Credit is Keeping Me from My Goal</h1>
          <p className="intro_tagline">If you're having a hard time qualifying for a loan or getting an apartment you want, you can take steps to improve your credit. Let's take a look at what's possible.</p>
        </div>
      </div>
      <ProblemsSection />
    </div>
  );
};

export default ProblemsPage;

ProblemsPage.displayName = 'Problems Page';
