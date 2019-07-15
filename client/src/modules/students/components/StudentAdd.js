import React, { useState, useCallback } from 'react';

export default function StudentAdd(props) {
  window.props = props;
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await props.createUser({ username: name, teacher_id: props.mainUser._id });
      props.history.push('/students/list');
    } catch(error) {
      console.log({ error })
    }
  }, [name]);

  return (
    <div>
      Add Student
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" onChange={(el) => { setName(el.currentTarget.value) }} />
        <button>Submit</button>
      </form>
    </div>
  )
}
