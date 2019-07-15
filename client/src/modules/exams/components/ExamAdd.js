import React, { useState, useCallback } from 'react';

export default function ExamAdd(props) {
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await props.createExam({ name });
    } catch(error) {
      console.log({ error })
    }
  }, [name]);

  return (
    <div>
      Add Exam
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" />
        <button>Submit</button>
      </form>
    </div>
  )
}
