import React, { useState } from "react";
import Head from "next/head";
import { Layout, Col, Row, Empty } from "antd";
import { Title, Filter, Card, CreateModal } from "../components/grants";
import { axiosClient } from "../utils/axiosClient";
import { HeadBox } from "../components/dashboard";
const { Content } = Layout;
export default function Profile({ data }) {
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="home">
        <Head>
          <title>MedipalDao</title>
          <meta name="description" content="HorseAround" />
          <link rel="icon" href="/favicon.png" />
        </Head>
        <HeadBox />

        <Content className="container mx-auto mt-20 px-20">
          <CreateModal open={open} handleCancel={handleCancel} />

          <Row gutter={26}>
            <Col className="gutter-row mb-4" span={24}>
              <h2 className="text-xl text-gr-800 mb-4 font-bold flex items-center justify-between">
                <span className="bg-white border p-2 shadow rounded-md text-gray-700">
                  My Investments
                </span>
                <span className="text-base font-normal">4 Result</span>
              </h2>
              <Row gutter={16}>
                <Col className="gutter-row mb-4" span={8}>
                  <Card />
                </Col>
                <Col className="gutter-row mb-4" span={8}>
                  <Card />
                </Col>
                <Col className="gutter-row mb-4" span={8}>
                  <Card />
                </Col>
              </Row>
              <Row gutter={26}>
                <Col className="gutter-row mb-4" span={24}>
                  <h2 className="text-xl text-gr-800 mb-4 font-bold flex items-center justify-between">
                    <span className="bg-white border p-2 shadow rounded-md text-gray-700">
                      My Grants
                    </span>
                    <span className="text-base font-normal">0 Result</span>
                  </h2>
                  <Row gutter={16}>
                    <Col className="gutter-row mb-4" span={24}>
                      <div className="w-full bg-gray-200  text-white p-4 text-center rounded-md">
                        <Empty
                          //   image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                          imageStyle={{
                            height: 200,
                            display: "inline-block",
                          }}
                          description={<span>Empy Response</span>}
                        >
                          <button
                            className="bg-gray-900 px-4 h-11 mb-10 text-xl rounded-md"
                            onClick={() => showModal()}
                          >
                            Create Grants
                          </button>
                        </Empty>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
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
