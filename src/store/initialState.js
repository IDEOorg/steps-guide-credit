import cardsData from '../data/cards';

const initialState = {
  cards: Object.keys(cardsData).map((id) => {
    return {
      id,
      text: cardsData[id].text,
      selected: false,
      selectedChoice: cardsData[id].choices ? Object.keys(cardsData[id].choices)[0] : null
    };
  }),
  selectedOptions: {
    currentOption: null,
    options: []
  }
};

export default initialState;
