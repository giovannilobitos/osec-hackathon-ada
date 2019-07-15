import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getSchools } from '/modules/schools/actions';

import Component from '../components/SchoolList';

const mapStateToProps = function (state) {
  return {
    ...state.core,
    schools: state.schools,
  };
};

const mapDispatchToProps = function (dispatch) {
  return (
    bindActionCreators({
      getSchools,
    }, dispatch)
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
