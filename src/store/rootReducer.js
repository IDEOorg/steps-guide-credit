import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import cards from './cards/cards';
import problems from './problems/problems';
import selectedOptions from './selectedOptions/selectedOptions';

const rootReducer = combineReducers({
  cards,
  problems,
  routing: routerReducer,
  selectedOptions
});

export default rootReducer;
