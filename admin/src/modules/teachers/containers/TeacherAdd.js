import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createUser } from '/modules/users/actions';
import { getSchools } from '/modules/schools/actions';

import Component from '../components/TeacherAdd';

const mapStateToProps = function (state) {
  return {
    ...state.core,
    schools: state.schools,
  };
};

const mapDispatchToProps = function (dispatch) {
  return (
    bindActionCreators({
      createUser,
      getSchools,
    }, dispatch)
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
