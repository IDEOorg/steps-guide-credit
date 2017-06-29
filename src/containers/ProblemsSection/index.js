import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import './index.less';
import Card from '../../components/Card';
import ProgressBar from '../../components/ProgressBar';
import { generateCards } from '../../store/cards/cards';

const ProblemsSection = (props) => {
  const problems = props.problems.map((problem) => {
    return (
      <Card
        key={problem.id}
        id={problem.id}
        text={problem.text}
        hideIcon={true}
        onSelect={() => {
          props.onSelect(problem.url);
        }}/>
    );
  });
  return (
    <div className="problems_page">
      <ProgressBar count={1} instructionText="Step 1: Choose your most pressing problem" />
      <div className="problems_section">
        {problems}
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    problems: state.problems
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSelect: (url) => {
      dispatch(generateCards(url));
      dispatch(push('/statements/' + url));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProblemsSection);

ProblemsSection.propTypes = {
  problems: PropTypes.arrayOf(PropTypes.instanceOf(Card)).isRequired,
  onSelect: PropTypes.func.isRequired,
};

ProblemsSection.displayName = 'ProblemsSection';
