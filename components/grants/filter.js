import React, { useState } from "react";
import cn from "classnames";
import { FilterOutlined } from "@ant-design/icons";
import styles from "./styles.module.css";

export default function Filter() {
  const [filterActive, setFilterActive] = useState(false);
  return (
    <div className={styles.filterBox}>
      test
      <FilterOutlined />
      <div></div>
    </div>
  );
}
