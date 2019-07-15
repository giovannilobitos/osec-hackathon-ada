import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUsers } from '/modules/users/actions';
import { getSchools } from '/modules/schools/actions';

import Component from '../components/TeacherList';

const mapStateToProps = function (state) {
  return {
    ...state.core,
    users: state.users,
    schools: state.schools,
  };
};

const mapDispatchToProps = function (dispatch) {
  return (
    bindActionCreators({
      getUsers,
      getSchools,
    }, dispatch)
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
