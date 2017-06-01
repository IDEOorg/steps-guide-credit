import cardsData from '../../data/cards';
export const SELECT_CARD = 'SELECT_CARD';
export const GENERATE_CARDS = 'GENERATE_CARDS';

export function selectCard(id) {
  return {
    type: SELECT_CARD,
    id
  };
}

export function generateCards(problemId) {
  return {
    type: GENERATE_CARDS,
    problemId
  };
}

const cards = (state = [], action) => {
  switch (action.type) {
    case SELECT_CARD:
      return state.map((c) => {
        if (c.id !== action.id) {
          return c;
        }

        return {
          ...c,
          selected: !c.selected
        };
      });
    case GENERATE_CARDS: {
      let cards = cardsData[action.problemId];
      if(cards) {
        return Object.keys(cards["cards"]).map((key) => {
          return {
            id: key,
            selected: false,
            text: cards["cards"][key]["text"]
          };
        });
      }
      return [];  
    }
    default:
      return state;
  }
};

export default cards;
