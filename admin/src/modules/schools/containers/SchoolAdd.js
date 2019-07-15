import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSchool } from '/modules/schools/actions';

import Component from '../components/SchoolAdd';

const mapStateToProps = function (state) {
  return {
    ...state.core,
  };
};

const mapDispatchToProps = function (dispatch) {
  return (
    bindActionCreators({
      createSchool,
    }, dispatch)
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
