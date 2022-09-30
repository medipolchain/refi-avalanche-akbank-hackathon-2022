import Head from "next/head";
import axios from "axios";
import { axiosClient } from "../utils/axiosClient";

export default function Home({ data }) {
  return (
    <>
      <div className="home">
        <Head>
          <title>MedipalDao</title>
          <meta name="description" content="HorseAround" />
          <link rel="icon" href="/favicon.png" />
        </Head>
        <h1>MedipalDao</h1>
        {data.map((i) => (
          <div>Test Axios : {i.title}</div>
        ))}
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
