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
  let sidebarImg = problemsData[statement].sidebarImg;
  let sidebar = null;
  if(sidebarImg) {
    sidebar = (
    <SidebarEducation
      sidebarImg={require('../../assets/' + sidebarImg)}
      sidebarDescription={problemsData[statement].sidebarDescription}
    />
    );
  }

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
      { sidebar }
      </div>
      <CardsSection url={statement}/>
    </div>
  );
};

function mapStateToProps() {
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
