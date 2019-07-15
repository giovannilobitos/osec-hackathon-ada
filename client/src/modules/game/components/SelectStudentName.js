import React, { useState, useCallback } from 'react';
import { useFetchDataIds } from '/lib/hooks';
import {
  message,
} from 'antd';

export default function SelectStudentName (props) {
  const { selectedClassId, selectedGender } = props;
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [studentIds, isFetchingStudents] = useFetchDataIds(() => {
    if (!selectedClassId) {
      setSelectedStudentId('');
      return;
    }
    return props.getUsers({ role: 'student', class_id: selectedClassId, gender: selectedGender });
  }, [selectedClassId, selectedGender]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      await props.createExam({ student_id: selectedStudentId });
      props.selectStudentId(selectedStudentId);
    } catch(error) {
      message.error(error.message);
      setIsSubmitting(false);
    }
  }, [selectedStudentId]);
  return (
    <main className="wrap select-gender">
      <h1 className="title welcomeMessage">Who are you?</h1>
      <div>
        <div className="nameOptions">
          {
            studentIds && (
              studentIds.map(_id => {
                const isSelected = _id === selectedStudentId;
                return  (
                  <button className={`${isSelected ? 'Checked' : ''}`} key={_id} value={_id} onClick={() => { setSelectedStudentId(_id) }}>{(props.users.byId[_id] || {}).name || _id}</button>
                )
              })
            )
          }
        </div>
      </div>
      <div className="action">
        <button className="nextButton" onClick={handleSubmit} disabled={!selectedClassId || !selectedStudentId || isSubmitting}>Start Game</button>
      </div>
    </main>
  )
}
