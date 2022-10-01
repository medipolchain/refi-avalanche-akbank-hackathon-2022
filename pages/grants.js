import React, { useState } from "react";
import Head from "next/head";
import { Layout, Col, Row } from "antd";
import { Title, Filter, Card, CreateModal } from "../components/grants";
import { axiosClient } from "../utils/axiosClient";
const { Content } = Layout;
export default function Grants({ data }) {
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

        <Content className="container mx-auto mt-20 px-20">
          <Title showModal={showModal} />
          <Filter />
          <CreateModal open={open} handleCancel={handleCancel} />
          <Row gutter={16}>
            <Col className="gutter-row mb-4" span={8}>
              <Card id={1} />
            </Col>
            <Col className="gutter-row mb-4" span={8}>
              <Card />
            </Col>
            <Col className="gutter-row mb-4" span={8}>
              <Card />
            </Col>
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
