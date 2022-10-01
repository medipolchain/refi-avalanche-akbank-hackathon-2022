import { useRouter } from "next/router";
import { Layout } from "antd";
import "antd/dist/antd.css";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import { Web3Provider } from "../components/web3/providers";
import Header from "../components/header";
import Footer from "../components/footer";
const { Content } = Layout;
export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <div>
      <Web3Provider>
        <Layout>
          <Header page={router.pathname !== "/"} />
          <Component {...pageProps} />
          <Footer />
        </Layout>
      </Web3Provider>
    </div>
  );
}
