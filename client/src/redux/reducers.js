import { combineReducers } from 'redux';
import core from '/modules/core/reducer';
import users from '/modules/users/reducer';
import game from '/modules/game/reducer';
import classes from '/modules/classes/reducer';
import questions from '/modules/questions/reducer';
import exams from '/modules/exams/reducer';

export default combineReducers({
  core,
  users,
  game,
  classes,
  questions,
  exams,
});
