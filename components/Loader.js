import { ThreeBounce } from "better-react-spinkit";
import Image from "next/image";

function Loader() {
  return (
    <div className="h-screen bg-black">
      <div className="pt-40 flex flex-col items-center space-y-4">
        <Image
          src="https://rb.gy/y9mwtb"
          height={250}
          width={600}
          objectFit="contain"
          className="animate-pulse"
        />
        {/* Desktop */}
        <ThreeBounce size={24} color="#15883e" />
        {/* Mobile */}
        {/* <ThreeBounce size={20} color="#15883e" /> */}
      </div>
    </div>
  );
}

export default Loader;
