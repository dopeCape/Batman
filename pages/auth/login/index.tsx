import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import React from "react";
import Link from "next/link";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}

const Login = ({ providers }: any) => {
  return (
    <main className="bg-gray-50 dark:bg-gray-900 flex min-h-screen flex-col items-center justify-center">
      <div className="px-6 py-8">
        <div className="flex flex-col items-center">
          <h1>Metridash</h1>
          <div className="w-full rounded-lg">
            <h1 className="text-xl font-bold mb-5 leading-tight text-gray-900 text-center">
              Sign in to your account
            </h1>
            <form action="#" className="space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-mono text-gray-900"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="username"
                  className="bg-gray border border-gray-300 text-gray-900 rounded-lg focus:border-primary-600 block w-full p-2.5"
                ></input>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-mono text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="********"
                  className="bg-gray border border-gray-300 text-gray-900 rounded-lg focus:border-primary-600 block w-full p-2.5"
                ></input>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
                    />
                    <label
                      htmlFor="remember"
                      className="text-gray-500 ml-2 dark:text-gray-300"
                    >
                      remember me
                    </label>
                  </div>
                  <div className="ml-3"></div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline "
                >
                  Forgot password?
                </a>
              </div>
              <button
                // type="submit"
                className="w-full border-black border-2 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                onClick={() => signIn("credentials", { callbackUrl: "/" })}
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 ">
                Don’t have an account yet?{" "}
                <Link
                  href="/"
                  className="font-medium text-primary-600 hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </form>
            {Object.values(providers).length > 0 && (
              <div className="flex flex-col items-center pt-2">
                <div>
                  <p className="text-xs font-light text-gray-500 ">
                    Other Sign in Options
                  </p>
                </div>
                {Object.values(providers).map((provider: any) => (
                  <div key={provider.name}>
                    <button
                      className="text-sm font-light text-gray-500 "
                      onClick={() => signIn(provider.id)}
                    >
                      Sign in with {provider.name}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
