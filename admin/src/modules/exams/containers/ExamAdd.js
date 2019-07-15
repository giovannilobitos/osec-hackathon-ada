import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createExam } from '../actions';

import Component from '../components/ExamAdd';

const mapStateToProps = function (state) {
  return {
    ...state.core,
  };
};

const mapDispatchToProps = function (dispatch) {
  return (
    bindActionCreators({
      createExam,
    }, dispatch)
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
