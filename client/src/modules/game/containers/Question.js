import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Component from '../components/Question';
import { submitAnswer } from '/modules/game/actions';

const mapStateToProps = function (state) {
  console.log(state);
  return {
    ...state.core,
    question: state.questions.byId[state.questions.currentQuestionId],
    selectedStudentId: state.game.selectedStudentId,
    selectedExamId: state.exams.selectedExamId,
  };
};

const mapDispatchToProps = function (dispatch) {
  return (
    bindActionCreators({
      submitAnswer,
    }, dispatch)
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
