import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Layout, Col, Row, Empty, Badge } from "antd";
import { Title, Filter, Card, CreateModal } from "../components/grants";
import { axiosClient } from "../utils/axiosClient";
import { HeadBox } from "../components/dashboard";
import { useAccount } from "../components/web3/hooks";
const { Content } = Layout;
export default function Profile({ data }) {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  const { account } = useAccount();
  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    let count = 0;
    for(let i=0; i<data.length; i++){
      if(data[i].publicAddress === account.data){
        count++;
      }
    }
    setCount(count);
  }, []);

  return (
    <>
      <div className="home">
        <Head>
          <title>MedipalDao</title>
          <meta name="description" content="HorseAround" />
          <link rel="icon" href="/favicon.png" />
        </Head>
        <HeadBox item={data} />

        <Content className="container mx-auto mt-20 px-20">
          <CreateModal open={open} handleCancel={handleCancel} />

          <Row gutter={26}>
            <Col className="gutter-row mb-4" span={24}>
              <h2 className="text-xl text-gr-800 mb-4 font-bold flex items-center justify-between">
                <span className="bg-white border p-2 shadow rounded-md text-gray-700">
                  My Investments
                </span>
                <span className="text-base font-normal">0 Result</span>
              </h2>
              <Row gutter={16}>
{/*                 <Col className="gutter-row mb-4" span={8}>
                  <Badge.Ribbon text="Bildirim Şeysi" color="cyan">
                    <Card item={data} />
                  </Badge.Ribbon>
                </Col> */}
{/*                 <Col className="gutter-row mb-4" span={8}>
                      <Card />
                </Col>) */}
              </Row>
              <Row gutter={26}>
                <Col className="gutter-row mb-4" span={24}>
                  <h2 className="text-xl text-gr-800 mb-4 font-bold flex items-center justify-between">
                    <span className="bg-white border p-2 shadow rounded-md text-gray-700">
                      My Grants
                    </span>
                    <span className="text-base font-normal">{count} Result</span>
                  </h2>
                  <Row gutter={16}>
                    {data.map((item, key) => (
                      item["publicAddress"] === account.data && (
                      <>
                    <Col key={key} className="gutter-row mb-4" span={8}>
                      <Card item={item} />
                     </Col>
                     </>  
                      )
                        ))}
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
  const data  = await axiosClient.get("get_grants");
  return {
    props: {
      data: JSON.parse(JSON.stringify(data.data)),
    },
  };
}
