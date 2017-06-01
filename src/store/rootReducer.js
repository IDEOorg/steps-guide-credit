import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import cards from './cards/cards';
import selectedOptions from './selectedOptions/selectedOptions';

const rootReducer = combineReducers({
  cards,
  routing: routerReducer,
  selectedOptions
});

export default rootReducer;
