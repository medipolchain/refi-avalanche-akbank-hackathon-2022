import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Layout, Col, Row } from "antd";
import { Title, Filter, Card, CreateModal } from "../components/grants";
import { axiosClient } from "../utils/axiosClient";
const { Content } = Layout;
export default function Grants({ data }) {
  const [open, setOpen] = useState(false);
  const [area, setArea] = useState(0);
  const [category, setCategory] = useState();
  const [budget, setBudget] = useState();
  const [ssk, setSsk] = useState([]);
  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const handeCategorySelect = (e) => {
    setCategory(e);
  };
  const handleBudget = (e) => {
    setBudget(e);
  };
  const handeKSS = (e) => {
    setSsk(e);
  };
  const handleAreaSelect = (e) => {
    setArea(e);
  };
  const handeFilterSearch = () => {
    alert("search ");
  };

  useEffect(() => {
    console.log("data", data);
    console.log("area",area)

  }, []);

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
          <Filter
            handeCategorySelect={handeCategorySelect}
            handleBudget={handleBudget}
            handeKSS={handeKSS}
            handleAreaSelect={handleAreaSelect}
            activeArea={area}
            handeFilterSearch={handeFilterSearch}
          />
          <CreateModal open={open} handleCancel={handleCancel} />
          <Row gutter={16}>
            {data.map((item,key) => (
              item.location === area ? (
            <Col key={key} className="gutter-row mb-4" span={8}>
              <Card id={key} item={item} />
            </Col> ) : (
              area === 0 ? (
                <Col key={key} className="gutter-row mb-4" span={8}>
              <Card id={key} item={item} />
            </Col>) : null  
            )
            ))}
          </Row>
        </Content>
      </div>
    </>
  );
}
export async function getServerSideProps(context) {
  const grants = await axiosClient.get("get_grants")

  return {
    props: {
      data: JSON.parse(JSON.stringify(grants.data)),
    },
  };
}
