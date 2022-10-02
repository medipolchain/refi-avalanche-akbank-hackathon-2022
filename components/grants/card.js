import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Progress, Avatar } from "antd";
import cn from "classnames";
import { SendOutlined } from "@ant-design/icons";
import styles from "./styles.module.css";
import { useAccount } from "../web3/hooks";
import { useWeb3 } from "../web3/providers"
import grantAbi from "../grantAbi.json"
import tetherAbi from "../tetherAbi.json"

export default function Card({ id, item }) {
  const [annualBudget, setAnnualBudget] = useState(0);
  const [progress, setProgress] = useState(0);
  const [grantContract, setGrantContract] = useState();
  const [tetherContract, setTetherContract] = useState();
  const grantContractAddress = "0x4EE7e4b4aFB2733DC7883F73427E4efef4A82887";
  const tetherContractAddress = "0xEb7dCd425aCe0Bd32339d7F3C7FC5A3Fd1A3b812";
  const { account } = useAccount();
  const { web3 } = useWeb3();

  useEffect(() => {
    if(web3){
      const tempGrantContract = new web3.eth.Contract(grantAbi, grantContractAddress);
      setGrantContract(tempGrantContract);
      const tempTetherContract = new web3.eth.Contract(tetherAbi, tetherContractAddress);
      setTetherContract(tempTetherContract);
      console.log(tempGrantContract)
      console.log(tetherContractAddress)
      console.log(grantContractAddress)
      console.log(item.publicAddress)
      console.log(id)
    }
    console.log(item)
    console.log(account)
    console.log(item.grant_index)
  }, [])

  const invest = async() => {
    if(web3 && account && grantContract && tetherContract){
      // Approve
      const approveResult = await tetherContract.methods.approve(grantContractAddress, item.budget).send({
        from: account.data
      })
      console.log(approveResult)
      
      //Invest
      const result = await grantContract.methods.proceedGrant(item.publicAddress,item.grant_index).send({
        from: account.data
      })
      console.log(result)
    }
  }
  

  useEffect(() => {
    let count = 0;
    for(let x=0; x<item.activities?.length; x++){
      count += item.activities[x].budget;
    }
    setAnnualBudget(count);
    setProgress((count / item.budget) * 100);
    console.log(progress)
  }, []);

  return (
      <div className={styles.card}>
      <Link href={{
        pathname: `/grants/${id}`
      }}>
        <a>
        <img
          src="https://c.gitcoin.co/grants/d912abe30e0195326be963d2ba55107b/ReFi_-_Global_South.png"
          className={styles.cardImage}
        />
        </a>
      </Link>
      <div className={styles.cardProgress}>
        <span className="flex items-center flex-wrap text-gray-800 ">
          <span className="text-xl text-baseGreen font-bold mr-2">{annualBudget}</span>
          of {item.budget}
        </span>
        <span className="text-gray-400 text-lg font-bold">{progress.toString().split(",")} %</span>
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
      <Link href="">
        <a className="flex items-center gap-4 mb-4">
          <Avatar src="https://joeschmoe.io/api/v1/random" />
<span className="text-black">{item.publicAddress.slice(0,4)}...{item.publicAddress.slice(38,42)}</span> 
  </a>
      </Link>
      <h2 className={styles.cardTitle}>
        {item.name}
      </h2>
      <span className={styles.cardDescription}>
        {item.description}
      </span> 
      <span className={styles.cardDescription}>
        <h2><b>KSS:</b>{item.kss}</h2>
      </span>
      <button onClick={invest} className={styles.donationButton}>
        <SendOutlined /> Request Investment
      </button>
    </div>
  );
}
