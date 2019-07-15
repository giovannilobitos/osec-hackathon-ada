import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createClass } from '/modules/classes/actions';
import { getSchools } from '/modules/schools/actions';
import { getUsers } from '/modules/users/actions';
import Component from '../components/ClassAdd';

const mapStateToProps = function (state) {
  return {
    ...state.core,
    schools: state.schools,
    users: state.users,
  };
};

const mapDispatchToProps = function (dispatch) {
  return (
    bindActionCreators({
      createClass,
      getSchools,
      getUsers,
    }, dispatch)
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
