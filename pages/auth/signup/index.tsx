import { useState, ChangeEvent } from "react";
import Link from "next/link";
import { useRouter, redirect } from "next/navigation";
import { auth } from "@/firebase";
import { createUserWithEmail, signInWithGoogle } from "../../../auth";

import classes from "./signup.module.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

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
      setMessage("User signed up successfully");
      window.location.href = "/home";
    } catch (error) {
      setMessage(`Error signing up: ${error.message}`);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      setMessage("User signed in with Google successfully");
      window.location.href = "/home";
    } catch (error) {
      setMessage(`Error signing in with Google: ${error.message}`);
    }
  };

  return (
    <div className="flex-col flex items-center justify-center h-screen">
      <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 flex flex-col items-center justify-center px-10 py-8  rounded-2xl">
        <h1 className="text-center font-sans mb-10 font-semibold text-[30px] leading-[23px] text-white">
          Sign Up
        </h1>
        <form className="flex flex-col" onSubmit={(e) => e.preventDefault()}>
          <input
            className="text-black mb-6 px-4 py-2 w-72 rounded-md"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
          />
          <input
            className="text-black mb-6 px-4 py-2 w-72 rounded-md"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button
            className="bg-blue-500 rounded-md px-4 py-2 mb-6 text-white"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
          <button className="text-white" onClick={handleGoogleSignIn}>
            Sign Up with Google
          </button>
        </form>
        {message && <p>{message}</p>}
        <p className="text-white">
          Already have an account?{" "}
          <Link
            className="text-white"
            href="/auth/signin"
            style={{ textDecoration: "underline" }}
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
