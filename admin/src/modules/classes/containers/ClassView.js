import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getClasses } from '/modules/classes/actions';

import Component from '../components/ClassView';

const mapStateToProps = function (state, props) {
  const { _id } = props.match.params;

  return {
    _id,
    classDetails: state.classes.byId[_id],
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
