import { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { createUserWithEmail, signInWithGoogle } from '../../../auth';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSignUp = async () => {
    try {
      await createUserWithEmail(email, password);
      setMessage('User signed up successfully');
    } catch (error) {
      setMessage(`Error signing up: ${error.message}`);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      setMessage('User signed in with Google successfully');
    } catch (error) {
      setMessage(`Error signing in with Google: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <input
        className='text-black'
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={handleEmailChange}
      />
      <input
        className='text-black'
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={handlePasswordChange}
      />
      <button onClick={handleSignUp}>Sign Up</button>
      <button onClick={handleGoogleSignIn}>Sign Up with Google</button>
      {message && <p>{message}</p>}
      <p>
        Already have an account?{' '}
        <a href="/signin" style={{ textDecoration: 'underline' }}>
          Sign in
        </a>
      </p>
    </div>
  );
};

export default SignUp;
