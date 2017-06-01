import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route } from 'react-router';
import App from '../containers/App';
import ProblemsPage from '../containers/ProblemsPage';
import StatementsPage from '../containers/StatementsPage';
import OptionsPage from '../containers/OptionsPage';

const Routes = (props) => {
  return (
    <Router history={props.history}>
      <Route component={App}>
        <Route path="/" component={ProblemsPage} />
        <Route path="/statements/:statement/options" component={OptionsPage} />
        <Route path="/statements/:statement" component={StatementsPage} />
        <Route path="/options" component={OptionsPage} />
      </Route>
    </Router>
  );
};

export default Routes;

Routes.propTypes = {
  history: PropTypes.string.isRequired
};
