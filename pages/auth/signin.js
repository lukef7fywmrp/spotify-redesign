import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import Loader from "../../components/Loader";

function Signin({ providers }) {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session]);

  if (session) return <Loader />;

  return (
    <div className="grid bg-black h-screen place-items-center">
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        src="https://rb.gy/y9mwtb"
        height={250}
        width={600}
        objectFit="contain"
        className="animate-pulse"
      />
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="text-white p-5 rounded-full font-semibold bg-[#1db954]"
            onClick={() => signIn(provider.id)}
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Signin;

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
