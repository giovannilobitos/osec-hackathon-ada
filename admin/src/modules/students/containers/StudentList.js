import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUsers } from '/modules/users/actions';
import { getClasses } from '/modules/classes/actions';

import Component from '../components/StudentList';

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
      getClasses,
    }, dispatch)
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
