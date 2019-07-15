import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import EnterPassCode from '/modules/game/containers/EnterPassCode';
import Question from '/modules/game/containers/Question';
import Result from '/modules/game/containers/Result';

export default function Game(props) {
  if (!props.selectedStudentId) {
    return (
      <EnterPassCode />
    )
  }

  if (props.isDone) {
    return (
      <Result />
    )
  }

  return (
    <div>
      <Question currentQuestionId={props.currentQuestionId} key={props.currentQuestionId}/>
    </div>
  )
}
