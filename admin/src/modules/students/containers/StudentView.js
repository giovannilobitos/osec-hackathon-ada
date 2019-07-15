import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUsers } from '/modules/users/actions';
import { getExams } from '/modules/exams/actions';

import Component from '../components/StudentView';

const mapStateToProps = function (state, props) {
  const { _id } = props.match.params;

  return {
    _id,
    userDetails: state.users.byId[_id],
    classes: state.classes,
    schools: state.schools,
    exams: state.exams,
  };
};

const mapDispatchToProps = function (dispatch) {
  return (
    bindActionCreators({
      getUsers,
      getExams,
    }, dispatch)
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
