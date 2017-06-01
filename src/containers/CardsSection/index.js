import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import './index.less';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { selectCard } from '../../store/cards/cards';
import { generateOptions } from '../../store/selectedOptions/selectedOptions';

const CardsSection = (props) => {
  const cards = props.cards.map((card) => {
    return (
      <Card
        key={card.id}
        id={card.id}
        text={card.text}
        selected={card.selected}
        onSelect={() => {
          props.onSelect(card.id);
        }}/>
    );
  });
  const selectedCards = props.cards
  .filter((card) => card.selected)
  .map((card) => {
    return {
      id: card.id,
    };
  });
  console.log(props);
  return (
    <div className="cards_page">
      <div className="cards_section">
        {cards}
      </div>
      <div className="submit_section">
        <Button
          textStyleClass="show_options_button_text"
          className="show_options_button"
          onClick={() => props.onSubmit(selectedCards, props.url)}>
          Tell me my options
        </Button>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    cards: state.cards
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSelect: (id) => dispatch(selectCard(id)),
    onSubmit: (cards, url) => {
      dispatch(push('/statements/' + url + '/options'));
      dispatch(generateOptions(cards, url));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardsSection);

CardsSection.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.instanceOf(Card)).isRequired,
  onSelect: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  url: PropTypes.string
};

CardsSection.displayName = 'CardsSection';
