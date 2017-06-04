// import optionsData from '../../data/options';

export const GENERATE_OPTIONS = 'GENERATE_OPTIONS';
export const SELECT_OPTION = 'SELECT_OPTION';
export const MARK_TRIED = 'MARK_TRIED';
export const ADD_TRIED_BACK = 'ADD_TRIED_BACK';
export const TOGGLE_OPTION = 'TOGGLE_OPTION';

export function generateOptions(cards, statement) {
  return {
    type: GENERATE_OPTIONS,
    cards,
    statement
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

// function getDistinctOptionsFromCards(cards, statement) {
//   let distinctOptionIds = [];
//   for(let i = 0; i < cards.length; i++) {
//     let cardId = cards[i].id;
//     let optionIds = cardsData[statement]["cards"][cardId].options;
//     for(let j = 0; j < optionIds.length; j++) {
//       let optionId = optionIds[j];
//       if(!distinctOptionIds.includes(optionId)) {
//         distinctOptionIds.push(optionId);
//       }
//     }
//   }
//   return distinctOptionIds;
// }
function getCardFromCards(cards, id) {
  for(let i = 0; i < cards.length; i++) {
    if(cards[i].id === id) {
      return cards[i];
    }
  }
  return null;
}

function addOptionIfUnique(options, id) {
  if(!options.includes(id)) {
    options.push(id);
  }
}

const selectedOptions = (state = {}, action) => {
  switch (action.type) {
    case GENERATE_OPTIONS: {
      let cards = action.cards;
      console.log(cards);
      console.log('HOUSE OF CARDS');
      let distinctOptionIds = [];
      if(getCardFromCards(cards, "1") && (!getCardFromCards(cards, "2") || !getCardFromCards(cards, "4") || !getCardFromCards(cards, "7") || !getCardFromCards(cards, "8"))) {
        addOptionIfUnique(distinctOptionIds, "2");
      }
      else {
        addOptionIfUnique(distinctOptionIds, "1");
      }
      if(getCardFromCards(cards, "2")) {
        addOptionIfUnique(distinctOptionIds, "3");
      }
      if(getCardFromCards(cards, "3")) {
        addOptionIfUnique(distinctOptionIds, "6");
      }
      if(getCardFromCards(cards, "4")) {
        addOptionIfUnique(distinctOptionIds, "4");
      }
      if(getCardFromCards(cards, "5") && (getCardFromCards(cards, "1") || getCardFromCards(cards, "2"))) {
        addOptionIfUnique(distinctOptionIds, "8");
      }
      if(!getCardFromCards(cards, "6")) {
        addOptionIfUnique(distinctOptionIds, "6");
      }
      if(getCardFromCards(cards, "7")) {
        addOptionIfUnique(distinctOptionIds, "5");
      }
      if(getCardFromCards(cards, "8")) {
        addOptionIfUnique(distinctOptionIds, "7");
      }
      console.log('ddd');
      console.log(distinctOptionIds);
      let distinctOptions = distinctOptionIds.map((id) => {
        return {
          id,
          tried: false
        };
      });
      console.log('distinctOptions');
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
