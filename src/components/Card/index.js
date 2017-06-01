import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './index.less';

const Card = (props) => {
  let choicesBox = null;

  if(props.choices) {
    let choices = Object.keys(props.choices).map((choiceId) => {
      return (
        <div key={choiceId}
          className={
            classNames({
              card_choice: true,
              card_choice_selected: choiceId === props.selectedChoice,
              card_choice_unselected: choiceId !== props.selectedChoice
            })}
          onClick={() => props.onChoiceSelect(props.id, choiceId)}>
          <h6>{props.choices[choiceId].text}</h6>
        </div>
      );
    });
    choicesBox = (
      <div className="choices_box">
        {choices}
      </div>
    );
  }
  let cardBoxClass = null;
  let cardClass = null;
  if(props.selected) {
    cardBoxClass = "card_selected";
    if(props.choices) {
      cardClass = "card_with_choices";
    }
  }
  else {
    cardBoxClass = "card_unselected";
  }

  return (
    <div className={classNames("card_box", cardBoxClass)}>
      <div className={classNames("card", cardClass)}
        style={{position: 'relative'}}
        onClick={() => {
          props.onSelect();
        }}
      >
        <img className={"card_add_icon"} src={require('../../assets/card-add-icon.svg')} />
        <h2>{props.text}</h2>
      </div>
      {choicesBox}
    </div>
  );
};

export default Card;

Card.propTypes = {
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onChoiceSelect: PropTypes.func,
  selectedChoice: PropTypes.string,
  choices: PropTypes.objectOf(PropTypes.objectOf(PropTypes.shape({
    text: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string)
  })))
};

Card.displayName = 'Card';
