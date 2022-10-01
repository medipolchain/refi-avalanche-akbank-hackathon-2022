import Head from "next/head";
import { Layout } from "antd";
import WelcomeBox from "../components/homeWelcomeBox";
import { axiosClient } from "../utils/axiosClient";
const { Content } = Layout;
export default function Home({ data }) {
  return (
    <>
      <div className="home">
        <Head>
          <title>MedipalDao</title>
          <meta name="description" content="HorseAround" />
          <link rel="icon" href="/favicon.png" />
        </Head>
        <Content className="container mx-auto">
          <WelcomeBox />
        </Content>
      </div>
    </>
  );
}
export async function getServerSideProps(context) {
  const data1 = await axiosClient.get(
    "https://jsonplaceholder.typicode.com/todos"
  );
  console.log("test", data1.data);
  const data = {};
  return {
    props: {
      data: data1.data,
    },
  };
}
