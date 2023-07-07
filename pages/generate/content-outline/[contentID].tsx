import Image from "next/image";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Content() {
    const router = useRouter()
    const { contentID } = router.query
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Generate {contentID}</p>
    </main>
  );
}
