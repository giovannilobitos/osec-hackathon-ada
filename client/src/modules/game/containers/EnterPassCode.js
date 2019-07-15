import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUsers } from '/modules/users/actions';
import { selectStudentId } from '../actions';
import { getClasses } from '/modules/classes/actions';
import Component from '../components/EnterPassCode';
import { createExam } from '/modules/exams/actions';

const mapStateToProps = function (state) {
  return {
    ...state.core,
    users: state.users,
    classes: state.classes,
  };
};

const mapDispatchToProps = function (dispatch) {
  return (
    bindActionCreators({
      getUsers,
      selectStudentId,
      getClasses,
      createExam,
    }, dispatch)
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
