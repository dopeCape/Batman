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
      setMessage(`Error signing up: ${message}`);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      setMessage("User signed in with Google successfully");
      window.location.href = "/home";
    } catch (error) {
      setMessage(`Error signing in with Google: ${message}`);
    }
  };

  return (
    <div className="flex-row flex items-center justify-center h-screen">
      <div className="flex w-1/2 h-full"></div>
      <div className=" bg-gradient-to-t from-[#0C0C0C] to-[#090947] flex flex-col items-center justify-center  w-1/2 h-full px-28">
        <h1 className="text-center font-sans mb-10 font-semibold text-[30px] leading-[23px] text-white self-start">
        👋 Create Account
        </h1>
        <form className="flex flex-col w-full " onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-row items-start justify-start self-start mb-2">
            <h1 className="self-start text-white ">📧 Email</h1>
            <h1 className="text-pink text-blue-500">*</h1>
          </div>

          <input
            className="text-black mb-6 px-4 py-2 w-full rounded-md "
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
          />
          <div className="flex flex-row items-start justify-start self-start mb-2">
            <h1 className="self-start text-white">🔑 Password</h1>
            <h1 className="text-pink text-blue-500">*</h1>
          </div>
          <input
            className="text-black mb-6 px-4 py-2 w-full rounded-md"
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
