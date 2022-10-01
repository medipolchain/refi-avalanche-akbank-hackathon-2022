import React, { useState } from "react";
import Head from "next/head";
import { Layout, Col, Row, PageHeader } from "antd";
import { SideBar, DetailBox } from "../../components/grants";
import { axiosClient } from "../../utils/axiosClient";
const { Content } = Layout;
export default function GrantsDetail({ data }) {
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const goBack = () => {
    window.location.href = "/grants";
  };
  return (
    <>
      <div className="home">
        <Head>
          <title>MedipalDao</title>
          <meta name="description" content="HorseAround" />
          <link rel="icon" href="/favicon.png" />
        </Head>

        <Content className="container mx-auto px-20">
          <Row gutter={16}>
            <Col className="gutter-row mb-4" span={24}>
              <PageHeader
                className="site-page-header"
                onBack={goBack}
                title="Grants"
              />
            </Col>
            <Col className="gutter-row mb-4" span={18}>
              <DetailBox />
            </Col>
            <Col className="gutter-row mb-4" span={6}>
              <SideBar />
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
