import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Component from '../components/Result';

const mapStateToProps = function (state) {
  return {
  };
};

const mapDispatchToProps = function (dispatch) {
  return (
    bindActionCreators({
    }, dispatch)
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
