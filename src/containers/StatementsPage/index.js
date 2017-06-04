import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import './index.less';
import CardsSection from '../CardsSection';
import OptionsIntro from '../../components/OptionsIntro';
import SidebarEducation from '../../components/SidebarEducation';
import problemsData from '../../data/problems';

const StatementsPage = (props) => {
  let statement = props.params.statement;
  let sidebarImg = require('../../assets/' + problemsData[statement].sidebarImg);
  return (
    <div className="main_page">
      <div className="intro_main_section">
        <OptionsIntro
          headlineText={problemsData[statement].text}
          goBackText="Choose another problem"
          goBack={() => {
            props.goBack();
          }}
        />
        <SidebarEducation
          sidebarImg={sidebarImg}
          sidebarDescription={problemsData[statement].sidebarDescription}
          sidebarBullets={problemsData[statement].sidebarBullets}
          />
      </div>
      <CardsSection url={statement}/>
    </div>
  );
};

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    goBack: () => {
      console.log('hey');
      return dispatch(push('/'));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatementsPage);

StatementsPage.displayName = 'StatementsPage';
