import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createUser } from '/modules/users/actions';

import Component from '../components/AdminAdd';

const mapStateToProps = function (state) {
  return {
    ...state.core,
  };
};

const mapDispatchToProps = function (dispatch) {
  return (
    bindActionCreators({
      createUser,
    }, dispatch)
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
