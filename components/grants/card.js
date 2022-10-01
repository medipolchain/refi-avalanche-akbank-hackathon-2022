import React, { useState } from "react";
import Link from "next/link";
import { Progress, Avatar } from "antd";
import cn from "classnames";
import { SendOutlined } from "@ant-design/icons";
import styles from "./styles.module.css";

export default function Card() {
  return (
    <div className={styles.card}>
      <img
        src="https://c.gitcoin.co/grants/d912abe30e0195326be963d2ba55107b/ReFi_-_Global_South.png"
        className={styles.cardImage}
      />
      <div className={styles.cardProgress}>
        <span className="flex items-center flex-wrap text-gray-800 ">
          <span className="text-xl text-baseGreen font-bold mr-2">$22,000</span>
          of $40 000
        </span>
        <span className="text-gray-400 text-lg font-bold">62 %</span>
      </div>
      <Progress
        strokeColor={{
          "0%": "#108ee9",
          "100%": "#87d068",
        }}
        percent={62}
        showInfo={false}
        className="mb-4"
      />
      <Link href="">
        <a className="flex items-center gap-4 mb-4">
          <Avatar src="https://joeschmoe.io/api/v1/random" />
          <span>Berkay</span>
        </a>
      </Link>
      <h2 className={styles.cardTitle}>
        Digital Gaia: Proof of Impact for ReFi
      </h2>
      <span className={styles.cardDescription}>
        Digital Gaia is paving the way for rapid expansion of global impact
        markets and ReFi solutions by bringing integrity to Carbon and ...
      </span>
      <button className={styles.donationButton}>
        <SendOutlined /> Send Donation
      </button>
    </div>
  );
}
