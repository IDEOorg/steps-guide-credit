// import cardsData from '../data/cards';
import problemsData from '../data/problems';

const initialState = {
  cards: [],
  problems: Object.keys(problemsData).map((id) => {
    return {
      id,
      text: problemsData[id].text,
      url: problemsData[id].url
    };
  }),
  selectedOptions: {
    currentOption: null,
    options: []
  }
};

export default initialState;
