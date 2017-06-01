import cardsData from '../../data/cards';

export const GENERATE_OPTIONS = 'GENERATE_OPTIONS';
export const SELECT_OPTION = 'SELECT_OPTION';
export const MARK_TRIED = 'MARK_TRIED';
export const ADD_TRIED_BACK = 'ADD_TRIED_BACK';
export const TOGGLE_OPTION = 'TOGGLE_OPTION';

export function generateOptions(cards) {
  return {
    type: GENERATE_OPTIONS,
    cards
  };
}

export function selectOption(id) {
  return {
    type: SELECT_OPTION,
    id
  };
}

export function markTried(id) {
  return {
    type: MARK_TRIED,
    id
  };
}
export function addTriedBack(id) {
  return {
    type: ADD_TRIED_BACK,
    id
  };
}

export function toggleOption(id) {
  return {
    type: TOGGLE_OPTION,
    id
  };
}

function getDistinctOptionsFromCards(cards) {
  let distinctOptionIds = [];
  for(let i = 0; i < cards.length; i++) {
    let cardId = cards[i].id;
    let selectedChoice = cards[i].selectedChoice;
    let optionIds = null;
    if(selectedChoice) {
      optionIds = cardsData[cardId].choices[selectedChoice].options;
    }
    else {
      optionIds = cardsData[cardId].options;
    }
    for(let j = 0; j < optionIds.length; j++) {
      let optionId = optionIds[j];
      if(!distinctOptionIds.includes(optionId)) {
        distinctOptionIds.push(optionId);
      }
    }
  }
  return distinctOptionIds;
}
function getCardFromCards(cards, id) {
  for(let i = 0; i < cards.length; i++) {
    if(cards[i].id === id) {
      return cards[i];
    }
  }
  return null;
}
const selectedOptions = (state = {}, action) => {
  switch (action.type) {
    case GENERATE_OPTIONS: {
      let cards = action.cards;
      let distinctOptionIds = [];
      if(getCardFromCards(cards, "5") && getCardFromCards(cards, "6")) {
        distinctOptionIds = ["9"];
      }
      else if(getCardFromCards(cards, "1") && getCardFromCards(cards, "6")) {
        distinctOptionIds = ["6", "7", "8", "3", "4"];
      }
      else if(getCardFromCards(cards, "1") && getCardFromCards(cards, "5")) {
        distinctOptionIds = ["4"];
      }
      else if(getCardFromCards(cards, "1")) {
        distinctOptionIds = getDistinctOptionsFromCards([getCardFromCards(cards, "1")]);
      }
      else if(getCardFromCards(cards, "5")) {
        distinctOptionIds = getDistinctOptionsFromCards([getCardFromCards(cards, "5")]);
      }
      else if(getCardFromCards(cards, "6")) {
        distinctOptionIds = getDistinctOptionsFromCards([getCardFromCards(cards, "6")]);
      }
      else {
        distinctOptionIds = getDistinctOptionsFromCards(cards);
        if(distinctOptionIds.length === 0) {
          distinctOptionIds = ["1", "2", "3", "4"];
        }
      }
      let distinctOptions = distinctOptionIds.map((id) => {
        return {
          id,
          tried: false
        };
      });
      return {
        currentOption: distinctOptionIds[0],
        options: distinctOptions
      };
    }
    case SELECT_OPTION: {
      return {
        ...state,
        currentOption: action.id
      };
    }
    case MARK_TRIED: {
      let options = state.options.map((option) => {
        let tried = option.id === action.id ? true : option.tried;
        return {
          id: option.id,
          tried
        };
      });
      let filteredOptions = state.options.filter((option) => {
        return !option.tried;
      });
      let currentOption = null;
      if(action.id !== state.currentOption) {
        currentOption = state.currentOption;
      }
      else if(filteredOptions.length < 2) {
        currentOption = null;
      }
      else {
        for(let i = 0; i < filteredOptions.length; i++) {
          if(action.id === filteredOptions[i].id) {
            if(i < filteredOptions.length - 1) {
              currentOption = filteredOptions[i + 1].id;
            }
            else {
              currentOption = filteredOptions[i - 1].id;
            }
          }
        }
      }
      return {
        currentOption,
        options
      };
    }
    case ADD_TRIED_BACK: {
      let untriedOptions = state.options.filter((option) => !option.tried);
      let options = state.options.map((option) => {
        let tried = option.id === action.id ? false : option.tried;
        return {
          id: option.id,
          tried
        };
      });
      if(untriedOptions.length === 0) {
        return {
          currentOption: action.id,
          options
        };
      }
      else {
        return {
          ...state,
          options
        };
      }

    }
    case TOGGLE_OPTION: {
      return {
        currentOption: action.id,
        options: state.options
      };
    }
    default:
      return state;
  }

};

export default selectedOptions;
