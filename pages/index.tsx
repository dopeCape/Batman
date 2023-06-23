import Image from "next/image";
import { Inter } from "next/font/google";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data, status } = useSession();
  if (status === "loading") return <h1> loading... please wait</h1>;
  if (status === "authenticated") {
    return (
      <main>
        <div>
          <button onClick={() => signOut()}>sign out</button>
        </div>
      </main>
    );
  }
  return (
    <main>
      <div>
        <button onClick={() => signIn()}>sign in</button>
      </div>
    </main>
  );
}
