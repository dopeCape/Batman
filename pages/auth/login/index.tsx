import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import React from "react";
import Link from "next/link";
import { FaTwitter } from 'react-icons/fa';
import { BsLinkedin,BsFacebook } from 'react-icons/bs';
import { GrGoogle, } from 'react-icons/gr';
import Image from "next/image";
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}

const Login = ({ providers }: any) => {
  return (
    <main className="bg-gray-50 dark:bg-gray-900 flex min-h-screen flex-col items-center justify-center p-24">
      <div className="px-14 py-8 bg-gray-800 rounded-lg	">
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-[25px]">Login</h1>
          <div className="w-full rounded-lg">
            <form action="#" className="space-y-4">
              <div className="mt-1 text-sm">
                <label htmlFor="username" className="block text-gray-500 mb-1">Username</label>
                <input type="text" name="username" id="username" className="w-full rounded-md border-gray-500 border px-4 py-3 bg-gray-900 text-gray-200 focus:border-purple-500 focus:outline-none" />
              </div>
              <div className="mt-1 text-sm">
                <label htmlFor="password" className="block text-gray-500 mb-1">Password</label>
                <input type="password" name="password" id="password" className="w-full rounded-md border-gray-500 border px-4 py-3 bg-gray-900 text-gray-200 focus:border-purple-500 focus:outline-none" />
              </div>
              <div className="flex items-center justify-between gap-x-5">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
                    />
                  </div>
                  <div className="text-sm ml-1">
                    <label
                      htmlFor="remember"
                      className="text-gray-400 dark:text-gray-400"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline  text-gray-200"
                >
                  Forgot password?
                </a>
              </div>
              
              <button
                // type="submit"
                className="bg-violet-400 w-full py-2 rounded-lg text-black font-bold "
                onClick={() => signIn("credentials", { callbackUrl: "/" })}
              >
                Sign in
              </button>
              <div className="flex items-center justify-center gap-x-5">
                  <div className="bg-gray-600 h-[1px] w-8"></div>
                  <p>Login with social accounts</p>
                  <div className="bg-gray-600 h-[1px] w-8"></div>
              </div>
              <div className="flex gap-x-10 justify-center">
              <GrGoogle className="w-5 h-5 text-white" />
              <BsLinkedin className="w-5 h-5 text-white" />
              <BsFacebook className="w-5 h-5 text-white" />
              <FaTwitter className="w-5 h-5 text-white" />
              </div>
              <div className="flex gap-x-1 justify-center">
              <p className="text-gray-400">Don't have an account?</p>
                <Link
                  href="/"
                  className="font-semibold hover:underline"
                >
                  Sign up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
