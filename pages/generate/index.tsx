import { getSession, useSession } from "next-auth/react";
import React from "react";

export default function Generate() {
  const { data } = useSession();

  return <main></main>;
}

export async function getServerSideProps({ req }: any) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}
