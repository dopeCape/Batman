import { useState } from 'react';
import { useRouter } from 'next/router';
import { signInWithEmail } from '../auth';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignIn = async () => {
    try {
      await signInWithEmail(email, password);
      setMessage('User signed in successfully');
    } catch (error) {
      setMessage(`Error signing in: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={handleEmailChange}
      />
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={handlePasswordChange}
      />
      <button onClick={handleSignIn}>Sign In</button>
      {message && <p>{message}</p>}
      <p>
        Don't have an account?{' '}
        <a href="/signup" style={{ textDecoration: 'underline' }}>
          Sign up
        </a>
      </p>
    </div>
  );
};

export default SignIn;
