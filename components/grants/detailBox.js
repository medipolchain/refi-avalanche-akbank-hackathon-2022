import React, { useState } from "react";
import Link from "next/link";
import { Space, Table, Tag } from "antd";
import cn from "classnames";
import { SendOutlined } from "@ant-design/icons";
import styles from "./styles.module.css";

export default function Card() {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";

            if (tag === "loser") {
              color = "volcano";
            }

            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];
  return (
    <>
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>
          Digital Gaia: Proof of Impact for ReFi
        </h2>
        <span className={styles.cardDescription}>
          0xPARC's ZK Learning Groups onboard strong technical specialists
          (engineers, researchers, open-source developers, and more) into the
          applied ZK space. Participants come from both crypto- and
          non-crypto-related backgrounds. The first iteration of the Learning
          Group took place this past December, bringing together about 20
          participants for a four-week virtual program. ZK Learning Group #2
          took place in March 2022, and we co-ran a Halo2 Learning Group with
          Scroll, EF PSE, and ElectricCoinCo this past June. ZK Learning Groups
          are administered on a volunteer basis by various domain experts from
          the 0xPARC community and more. Program content is used to produce a
          set of open ZK learning resources, which are curated and maintained by
          0xPARC community volunteers.
        </span>
      </div>
      <div className={styles.card}>
        <Table columns={columns} dataSource={data} />
      </div>
    </>
  );
}
