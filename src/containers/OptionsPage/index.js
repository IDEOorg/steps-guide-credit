import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import MediaQuery from 'react-responsive';
import './index.less';
import { selectOption, markTried, toggleOption } from '../../store/selectedOptions/selectedOptions';
import Option from '../../components/Option';
import OptionsIntro from '../../components/OptionsIntro';
import ActionPlan from '../../components/ActionPlan';
import TriedOptions from '../TriedOptions';
import optionsData from '../../data/options';

class OptionsPage extends Component {
  constructor(props){
     super(props);
  }
  componentWillMount() {
    window.scrollTo(0,0);
  }
  componentDidUpdate() {
    this.scrollOnOptionSelectMobile(this.props.currentOption);
  }
  onScroll() {
    let actionPlans = this.actionSection.children;
    let height = Math.max(document.documentElement.clientHeight, window.innerHeight);
    let currentOptionHeight = -1;
    let currentOption = null;
    for(let i = 0; i < actionPlans.length; i++) {
      let actionPlanHeight = actionPlans[i].getBoundingClientRect().top;
      if(actionPlanHeight >= 0 && actionPlanHeight <= (height / 4) && actionPlanHeight > currentOptionHeight) {
        currentOptionHeight = actionPlanHeight;
        currentOption = actionPlans[i].dataset.option;
      }
    }
    if(currentOption !== null && currentOption !== this.props.currentOption) {
      this.props.toggleOption(currentOption);
    }
  }
  scrollOnOptionSelect(id) {
    if(id !== this.props.currentOption) {
      let actionPlans = this.actionSection.children;
      for(let i = 0; i < actionPlans.length; i++) {
        if(actionPlans[i].dataset.option === id) {
          this.actionSection.scrollTop += actionPlans[i].getBoundingClientRect().top - 20 - 50;
          return;
        }
      }
    }
  }
  scrollOnOptionSelectMobile(id) {
    let options = document.getElementsByClassName('option_box_mobile');
    for(let i = 0; i < options.length; i++) {
      if(options[i].dataset.option === id) {
        window.scrollBy(0, options[i].getBoundingClientRect().top - 50); // 50 is header height
        break;
      }
    }
  }
  render() {
    const currentOption = this.props.currentOption;
    const filteredOptions = this.props.options.filter((option) => !option.tried);

    let optionsWithActions = null;
    if(filteredOptions.length) {
      optionsWithActions = filteredOptions.map((option) => {
        let id = option.id;
        let optionId = id;
        let actions = optionsData[id]["actions"];
        return {
          optionId,
          actions
        };
      });
    }
    else {
      const triedEverythingId = "10";
      optionsWithActions = [
        {
          optionId: triedEverythingId,
          actions: optionsData[triedEverythingId]["actions"]
        }
      ];
    }

    // desktop
    let options = null;
    if(filteredOptions.length) {
      options = optionsWithActions.map((optionAndAction, i) => {
        let id = optionAndAction.optionId;
        return (<Option key={id}
          selected={id === currentOption}
          order={i + 1} text={optionsData[id]["text"]}
          onLinkClick={() => {this.props.markTried(id);}}
          linkText={"I've already tried this."}
          onSelect={() => {this.scrollOnOptionSelect(id); this.props.onSelect(id);}}/>);
      });
    }

    const actionPlans = optionsWithActions.map((optionAndAction) => {
      return (
        <ActionPlan
          key={optionAndAction.optionId}
          id={optionAndAction.optionId}
          isCurrentOption={currentOption === optionAndAction.optionId}
          headline={optionsData[optionAndAction.optionId]["text"]}
          actions={optionAndAction.actions}/>);
    });
    // mobile
    const optionsActionsOutputMobile = optionsWithActions.map((optionAndAction, i) => {
      let id = optionAndAction.optionId;
      let optionBox = null;
      if(filteredOptions.length) {
        optionBox = (<div data-option={id} className="option_box_mobile">
          <Option key={id}
            selected={id === currentOption}
            order={i + 1} text={optionsData[id]["text"]}
            onLinkClick={() => {this.props.markTried(id);}}
            linkText={"I've already tried this."}
            onSelect={() => {
              this.props.onSelect(id);
              this.scrollOnOptionSelectMobile(id);
            }}/>
        </div>);
      }
      return (
        <div key={id}>
          {optionBox}
          <div className="action_plan_mobile">
            <ActionPlan
              key={optionAndAction.optionId}
              id={optionAndAction.optionId}
              isCurrentOption={currentOption === optionAndAction.optionId}
              headline={optionsData[optionAndAction.optionId]["text"]}
              actions={optionAndAction.actions}/>
          </div>
        </div>
      );
    });

    return (
      <div className="options_container">
        <MediaQuery query="(min-width: 600px)">
          <div className="options_page">
            <div className="options_section">
              <OptionsIntro goBack={this.props.goBack} />
              {options}
              <TriedOptions />
            </div>
            <div
              className="actions_section"
              ref={(actionSection) => {this.actionSection = actionSection;}}
              onScroll={() => {this.onScroll();}}>
              {actionPlans}
            </div>
          </div>
        </MediaQuery>
        <MediaQuery query="(max-width: 600px)">
          <div className="options_page">
            <OptionsIntro goBack={this.props.goBack} />
            { optionsActionsOutputMobile }
            <TriedOptions />
          </div>
        </MediaQuery>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    options: state.selectedOptions.options,
    currentOption: state.selectedOptions.currentOption
  };
}

function mapDispatchToProps(dispatch) {
  return {
    goBack: () => dispatch(push('/')),
    onSelect: (id) => dispatch(selectOption(id)),
    markTried: (id) => dispatch(markTried(id)),
    toggleOption: (id) => dispatch(toggleOption(id))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OptionsPage);

OptionsPage.propTypes = {
  currentOption: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    tried: PropTypes.bool.isRequired
    })
  ),
  toggleOption: PropTypes.func.isRequired,
  onSelect: PropTypes.func,
  goBack: PropTypes.func.isRequired,
  markTried: PropTypes.func,
};

OptionsPage.displayName = 'Options Page';
