import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { } from '../actions';

import Component from '../components/ExamList';

const mapStateToProps = function (state) {
  return {
    ...state.core,
  };
};

const mapDispatchToProps = function (dispatch) {
  return (
    bindActionCreators({
    }, dispatch)
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
