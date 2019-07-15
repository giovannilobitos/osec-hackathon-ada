import { combineReducers } from 'redux';
import core from '/modules/core/reducer';
import users from '/modules/users/reducer';
import schools from '/modules/schools/reducer';
import classes from '/modules/classes/reducer';
import exams from '/modules/exams/reducer';

export default combineReducers({
  core,
  users,
  schools,
  classes,
  exams,
});
