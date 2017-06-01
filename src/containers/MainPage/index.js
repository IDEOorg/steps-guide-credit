import React from 'react';
import './index.less';
import CardsSection from '../CardsSection';
const introImg = require('../../assets/city-scene.svg');

const MainPage = () => {
  return (
    <div className="main_page">
      <div className="intro_main_section">
        <img className="intro_image" src={introImg}/>
        <div className="intro_main_intro">
          <h1 className="intro_headline">I Can't Pay My Rent</h1>
          <p className="intro_tagline">There are still options to explore when you can't pay rent. To get started, choose all the statements on the right that apply to you.</p>
        </div>
      </div>
      <CardsSection />
    </div>
  );
};

export default MainPage;

MainPage.displayName = 'Main Page';
