import { getSession, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import Dashboard from "../components/Dashboard";
import Loader from "../components/Loader";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/signin");
    },
  });

  // Loading animation...
  if (status === "loading") {
    return <Loader />;
  }

  return (
    <div className="">
      <Head>
        <title>Spotify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Dashboard />
    </div>
  );
}

// Eliminates Loading
// export async function getServerSideProps(ctx) {
//   return {
//     props: {
//       session: await getSession(ctx),
//     },
//   };
// }
