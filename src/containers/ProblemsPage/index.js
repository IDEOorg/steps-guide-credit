import React from 'react';
import './index.less';
import ProblemsSection from '../ProblemsSection';
const introImg = require('../../assets/credit-icon.gif');

class ProblemsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {lang: 'es'};
  }
  render() {
    let headline = null;
    let sidebarText = null;
    if(this.state.lang === 'en') {
      headline = "My Credit is Keeping Me from My Goal";
      sidebarText = "If you're having a hard time qualifying for a loan or getting an apartment you want, you can take steps to improve your credit. Let's take a look at what's possible.";
    }
    if(this.state.lang === 'es') {
      headline = "Mi crédito me aleja de mis metas financieras";
      sidebarText = "Si se le hace difícil calificar por un préstamo u obtener el apartamento que desea, puede tomar pasos para mejorar su puntaje de crédito. Veamos lo que es posible."
    }
    return (
      <div className="main_page">
        <div style={{position: "absolute", left: "130px"}}>
          <p onClick={() => {this.setState({lang: 'en'})}} style={this.state.lang === 'en' ? {float: "left", margin: "15px", color: 'gray'} : {float: "left", margin: "15px", color: "rgb(84, 149, 249)", cursor: "pointer"}}>English</p>
          <p onClick={() => {this.setState({lang: 'es'})}} style={this.state.lang === 'es' ? {float: "left", margin: "15px", color: 'gray'} : {float: "left", margin: "15px", color: "rgb(84, 149, 249)", cursor: "pointer"}}>Español</p>
        </div>
        <div className="intro_main_section">
          <img className="intro_image" src={introImg}/>
          <div className="intro_main_intro">
            <h1 className="intro_headline">{ headline }</h1>
            <p className="intro_tagline">{ sidebarText }</p>
          </div>
        </div>
        <ProblemsSection />
      </div>
    );
  }
}

export default ProblemsPage;

ProblemsPage.displayName = 'Problems Page';
