import { useState, ChangeEvent, useEffect } from "react";
import Link from "next/link";
import { useRouter, redirect } from "next/navigation";
import { auth } from "@/firebase";
import { createUserWithEmail, signInWithGoogle } from "../../../auth";
import checkUser from "../../../utils/checkUser";
import Typewriter from "typewriter-effect";
import classes from "./signup.module.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter();

  const user: any = checkUser();

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
      //window.location.href = "/homepage"
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

  if (user && user.uid) {
    window.location.href = "/homepage";
  }

  return (
    <div className="flex-row flex items-center justify-center h-screen w-full">
      <div
        className="md:flex hidden absolute inset-0 w-full h-full blur-md"
        style={{
          backgroundImage:
            "url('https://c4.wallpaperflare.com/wallpaper/448/699/737/abstract-digital-art-3d-abstract-lines-wallpaper-preview.jpg')",
          backdropFilter: "blur(10px)",
          zIndex: -1,
        }}
      ></div>
      <div className="md:flex hidden w-1/2 h-full flex-col z-10 justify-center">
        <div className="bg-transparent ">
          <h1 className="font-mono text-2xl font-extrabold w-full text-center text-white">
            Metridash: Your Ultimate Content Creation Companion
          </h1>
        </div>
        <div>
          <h1 className="text-white font-mono text-xl font-light w-full text-center">
            <Typewriter
              options={{
                strings: [
                  "Fuel Your Creativity",
                  "Metridash empowers creators with powerful content creation tools, igniting your creative spark like never before.",
                  "Craft, Share, and Thrive",
                  "Unleash your content potential effortlessly with Metridash – from creation to sharing, we've got you covered.",
                  "Join the Creator Revolution",
                  "Ready to revolutionize your content? Join the Metridash community today and watch your creative journey soar.",
                ],
                autoStart: true,
                loop: true,
                deleteSpeed: 2,
                delay: 40,
              }}
            />
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
            className=" mb-6 px-4 py-2 w-full rounded-md "
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
            className=" mb-6 px-4 py-2 w-full rounded-md"
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
