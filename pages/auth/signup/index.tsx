import { useState, ChangeEvent, useEffect } from "react";
import Link from "next/link";
import { useRouter, redirect } from "next/navigation";
import { auth } from "@/firebase";
import { createUserWithEmail, signInWithGoogle } from "../../../auth";

import classes from "./signup.module.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState<null | any>(null);

  const router = useRouter();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user && user.uid) {
        window.location.href = "/homepage";
      }
    });
  }, [user]);

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
      window.location.href = "/homepage";
    } catch (error) {
      setMessage(`Error signing up: ${error}`);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      setMessage("User signed in with Google successfully");
      window.location.href = "/homepage";
    } catch (error) {
      setMessage(`Error signing in with Google: ${error}`);
    }
  };

  return (
    <div className="flex-row flex items-center justify-center h-screen w-screen">
      <div
        className=" flex-row w-full md:w-1/2 h-full items-center justify-center  md:flex hidden"
        style={{
          backgroundImage:
            "url('https://images.rawpixel.com/image_1300/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcGYtbWlzYzE0LWFkajAwODU1LWFkai1hXzEuanBn.jpg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-white font-mono text-2xl font-extrabold">
            Metridash is live!
          </h1>
        </div>
      </div>
      <div className=" bg-gradient-to-t from-[#0C0C0C] to-[#090947] flex flex-col items-center justify-center h-full md:px-28 px-10 w-full md:w-1/2">
        <h1 className="text-center font-sans mb-10 font-semibold text-[30px] leading-[23px] text-white self-start">
          👋 Create Account
        </h1>
        <form
          className="flex flex-col w-full "
          onSubmit={(e) => e.preventDefault()}
        >
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
        {message && <p className="text-white">{message}</p>}
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
