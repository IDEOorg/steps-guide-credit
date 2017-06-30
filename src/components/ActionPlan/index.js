import React from 'react';
import PropTypes from 'prop-types';
import Action from '../Action';
import Button from '../Button';
import ZipcodeBox from '../ZipcodeBox';
import CriteriaBox from '../CriteriaBox';
import AddendumBox from '../AddendumBox';
import FullPageBox from '../FullPageBox';
import UrlImage from '../UrlImage';
import classNames from 'classnames';
import './index.less';

const ActionPlan = (props) => {
  console.log(props);
  let actionItem;
  let actions = props.actions.map((action) => {
    if(action.link) {
      console.log(action);
      actionItem = (
        <Button
          onClick={() => { window.open(action.link.url); }}
          textStyleClass="action_button_text"
          className="action_button">
        <UrlImage />
        {action.link.text}
      </Button>);
    }
    else if(action.criteria) {
      actionItem = (<CriteriaBox criteria={action.criteria.criteria}>
        <Button
          onClick={() => { window.open(action.criteria.link.url); }}
          textStyleClass="action_button_text"
          className="action_button">
          <UrlImage />
          {action.criteria.link.text}
        </Button>
      </CriteriaBox>);
    }
    else if(action.zipcode) {
      actionItem = (<ZipcodeBox
        urlStart={action.zipcode.link.urlTemplateStart}
        urlEnd={action.zipcode.link.urlTemplateEnd}
        buttonText={action.zipcode.link.text}/>);
    }
    else if(action.addendum) {
      actionItem = (<AddendumBox
        text={action.addendum.addendumText}
        headline={action.addendum.addendumHeadline}
        />
      );
    }
    else if(action.fullPage) {
      actionItem = (<FullPageBox
        textBegin={action.fullPage.textBegin}
        textEnd={action.fullPage.textEnd}
        img={action.fullPage.img ? require('../../assets/' + action.fullPage.img) : null}
      />)
    }
    else {
      actionItem = null;
    }
    return (<Action key={action.id}
        img={action.img ? require('../../assets/' + action.img) : null}
        headline={action.headline}
        text={action.text}>
        {actionItem}
      </Action>);
  });
  return (
    <div className={
        classNames(
          {
            action_plan: true,
            inactive_action: !props.isCurrentOption
          }
        )}
      data-option={props.id}>
      <div className="actions_headline_section">
        <h1 className="actions_option_headline">
          {props.headline}
        </h1>
      </div>
      {actions}
    </div>
  );
};

export default ActionPlan;

ActionPlan.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    img: PropTypes.string,
    headline: PropTypes.string,
    text: PropTypes.string
  })),
  headline: PropTypes.string,
  id: PropTypes.string,
  isCurrentOption: PropTypes.bool
};

ActionPlan.displayName = 'ActionPlan';
