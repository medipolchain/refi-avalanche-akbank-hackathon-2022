import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Layout, Col, Row, PageHeader } from "antd";
import { SideBar, DetailBox } from "../../components/grants";
import { axiosClient } from "../../utils/axiosClient";
import { useRouter } from 'next/router'

const { Content } = Layout;
export default function GrantsDetail({ info, id }) {
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState({})
  const router = useRouter()

  useEffect(() => {
    const x = parseInt(router.query.id)
      axiosClient.post("get_grant", {
      index:x
    }).then((res) => {
      console.log("res", res);
      setItem(res.data)
    });
  }, []);

  const showModal = () => {
    setOpen(true);
  };

  useEffect(() => {
    console.log("data", info);
    console.log("id",id)
    console.log(item)
  });

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
          <title>Granteed</title>
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
              <DetailBox item={item} />
            </Col>
            <Col className="gutter-row mb-4" span={6}>
              <SideBar item={item} />
            </Col>
          </Row>
        </Content>
      </div>
    </>
  );
}

export async function getServerSideProps(params) {
  const { id } = await params.query;
  const info = await axiosClient.post("get_grant", {
    index: id
  });
  console.log(info)
  return {
    props: { 
      id:id,
      info: JSON.stringify(info.data)
    },
  };
}
