import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login (props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await props.login({ username, password });
    } catch(error) {
      console.log({ error });
      setIsSubmitting(false);
    }
  }, [username, password]);

  return (
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username: </label>
            <input type="text" value={username} onChange={(el) => { setUsername(el.currentTarget.value) }} />
          </div>
          <div>
            <label>Password: </label>
            <input type="password" value={password} onChange={(el) => { setPassword(el.currentTarget.value) }} />
          </div>

          <button disabled={isSubmitting}>Login As Teacher</button>
        </form>

        <Link to="/game">Start Game</Link>
      </div>
  );
}
