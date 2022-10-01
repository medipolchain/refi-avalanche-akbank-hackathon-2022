import React, { useState } from "react";
import cn from "classnames";
import { FilterOutlined } from "@ant-design/icons";
import styles from "./styles.module.css";
import { useAccount } from "../web3/hooks";
import { useWeb3 } from "../web3/providers/web3";

export default function Title({ showModal }) {
  const [filterActive, setFilterActive] = useState(false);
  const { account } = useAccount();
  const { web3, connect } = useWeb3();

  return (
    <div className={styles.titleBox}>
      <div>
        <h1 className={styles.title}>Explore Grants</h1>
        <span className={styles.subTitle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.{" "}
          consectetur adipiscing elit, sed do.
        </span>
      </div>
        <button className={styles.createButton} onClick={showModal}>
          {" "}
          Create New Grant
        </button>
    </div>
  );
}
