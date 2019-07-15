import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUsers } from '/modules/users/actions';

import Component from '../components/Game';

const mapStateToProps = function (state) {
  return {
    ...state.core,
    ...state.game,
    // questions: state.questions,
    initialQuestionId: state.questions.initialQuestionId,
    currentQuestionId: state.questions.currentQuestionId,
  };
};

const mapDispatchToProps = function (dispatch) {
  return (
    bindActionCreators({
      getUsers,
    }, dispatch)
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
