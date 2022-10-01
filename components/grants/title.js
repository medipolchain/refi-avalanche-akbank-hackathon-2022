import React, { useState } from "react";
import cn from "classnames";
import { FilterOutlined } from "@ant-design/icons";
import styles from "./styles.module.css";

export default function Title({ showModal }) {
  const [filterActive, setFilterActive] = useState(false);
  return (
    <div className={styles.titleBox}>
      <div>
        <h1 className={styles.title}>Explore Grants</h1>
        <span className={styles.subTitle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
        </span>
      </div>
      <button className={styles.createButton} onClick={showModal}>
        {" "}
        Create New Grant
      </button>
    </div>
  );
}
