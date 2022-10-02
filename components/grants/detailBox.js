import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Space, Table, Tag } from "antd";
import cn from "classnames";
import { SendOutlined } from "@ant-design/icons";
import { Status } from "./index";
import styles from "./styles.module.css";

export default function Card({ item }) {
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
      render: (_, record) => <a>Invite {record.name}</a>,
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
  useEffect(() => {
    console.log(item);
  }, []);
  return (
    <>
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>
          {item?.name}
        </h2>
        <span className={styles.cardDescription}>
          {item?.description}
        </span>
      </div>
      <div className={styles.card}>
        <Table columns={columns} dataSource={data} />
      </div>
      <div className={styles.card}>
        <div className={styles.cardTitle}>Status History</div>
        <Status done />
        <Status />
        <Status />
      </div>
    </>
  );
}
