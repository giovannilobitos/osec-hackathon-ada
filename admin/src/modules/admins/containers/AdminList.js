import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUsers } from '/modules/users/actions';

import Component from '../components/AdminList';

const mapStateToProps = function (state) {
  return {
    ...state.core,
    users: state.users,
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
