import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createUser } from '/modules/users/actions';
import { getClasses } from '/modules/classes/actions';

import Component from '../components/StudentAdd';

const mapStateToProps = function (state) {
  return {
    ...state.core,
    classes: state.classes,
  };
};

const mapDispatchToProps = function (dispatch) {
  return (
    bindActionCreators({
      createUser,
      getClasses,
    }, dispatch)
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
