import { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { signInWithEmail } from '../../../auth';

import classes from "./signin.module.css";


const SignIn = () => {
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

  const handleSignIn = async () => {
    try {
      await signInWithEmail(email, password);
      setMessage('User signed in successfully');
      router.push('/home')
      
    } catch (error) {
      setMessage(`Error signing in: ${error.message}`);
    }
  };

  
  return (
    <div className={`${classes.sign_in}`}>
      <div className={`${classes.signin__form} bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mx-5 px-10 py-8 rounded-2xl`}>
        <h1 className='text-center font-sans mb-10 font-semibold text-[30px] leading-[23px] text-white'>Sign In</h1>
        <input
          className='text-black mb-6 px-4 py-2 w-72 rounded-md'
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          className='text-black mb-6 px-4 py-2 rounded-md'
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button className='bg-blue-500 rounded-md px-4 py-2 mb-6 text-white' onClick={handleSignIn}>Sign In</button>
        {message && <p>{message}</p>}
        <p className='text-white'>
          Don't have an account?{' '}
          <a className='text-white' href="/auth/signup" style={{ textDecoration: 'underline' }}>
            Sign up
          </a>
        </p>
        </div>
      </div>
  );
};

export default SignIn;
