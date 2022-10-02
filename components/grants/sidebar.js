import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Progress, Avatar } from "antd";
import cn from "classnames";
import { SendOutlined } from "@ant-design/icons";
import styles from "./styles.module.css";

export default function SideBar({ item }) {
  const [annualBudget, setAnnualBudget] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let count = 0;
    console.log(item)
    for(let x=0; x<item.activities.length; x++){
      count += item.activities[x].budget;
    }
    setAnnualBudget(count);
    setProgress((count / item.budget) * 100);
    console.log(progress)
  }, []);
  return (
    <>
      <div className={styles.card}>
        <img
          src="https://c.gitcoin.co/grants/d912abe30e0195326be963d2ba55107b/ReFi_-_Global_South.png"
          className={styles.cardImage}
        />
        <div className={styles.cardProgress}>
          <span className="flex items-center flex-wrap text-gray-800 ">
            <span className="text-xl text-baseGreen font-bold mr-2">
              ${annualBudget}
            </span>
            of ${item.budget}
          </span>
          <span className="text-gray-400 text-lg font-bold">{progress} %</span>
        </div>
        <Progress
          strokeColor={{
            "0%": "#108ee9",
            "100%": "#87d068",
          }}
          percent={progress}
          showInfo={false}
          className="mb-4"
        />

        <button className={styles.donationButton}>
          <SendOutlined /> Request Investment
        </button>
      </div>
      <div className={cn(styles.card, "mt-4")}>
        <Link href="">
          <a className="flex items-center gap-4 mb-4">
            <Avatar src="https://joeschmoe.io/api/v1/random" />
            <span>{item.publicAddress}</span>
          </a>
        </Link>
      </div>
    </>
  );
}
