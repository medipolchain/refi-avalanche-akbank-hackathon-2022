import { useRouter } from "next/router";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import { Web3Provider } from "../components/web3/providers";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <div>
      <Web3Provider>
        <Component {...pageProps} />
      </Web3Provider>
    </div>
  );
}
