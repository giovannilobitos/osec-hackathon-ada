import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getClasses } from '/modules/classes/actions';

import Component from '../components/ClassList';

const mapStateToProps = function (state) {
  return {
    ...state.core,
    classes: state.classes,
    users: state.users,
    schools: state.schools,
  };
};

const mapDispatchToProps = function (dispatch) {
  return (
    bindActionCreators({
      getClasses,
    }, dispatch)
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
