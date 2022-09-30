import React, { useEffect } from "react";
import Link from "next/link";
// Hooks
import { useAccount } from "../web3/hooks";
import { useWeb3 } from "../web3/providers";

import styles from "./styles.module.css";

export default function ConnectWallet() {
  const { account } = useAccount();
  const { connect, web3, contract } = useWeb3();

  useEffect(() => {
    const handleSignMessage = async () => {
      const message = "Hello World";
    };
    const handleSignUp = async () => {
      const message = "Hello World";
    };
    const handleLogIn = async () => {
      const message = "Hello World";
      console.log(message);
    };
    if (account?.data && web3) handleLogIn();
  }, [account?.data, web3]);

  return (
    <div className={styles.box}>
      <div className={styles.gridBox}>
        <Link href="">
          <a className={styles.gridItem}>
            <img
              src="../icons/wallet.svg"
              className="rounded-lg inline-block "
            />
            <div className={styles.gridBoxInfo}>
              <h3 className={styles.title}>Wallet Connect</h3>
              <span className={styles.description}>
                MetaMask is an extension for accessing Ethereum enabled
                distributed applications, or "Dapps" in your normal Chrome
                browser!
              </span>
            </div>
          </a>
        </Link>
        <Link href="">
          <a onClick={connect} className={styles.gridItem}>
            {/* <div className="ribbon ribbon-top-left">
              <span>Popular</span>
            </div> */}
            <img
              src="../icons/metamask.svg"
              className="rounded-lg inline-block "
            />
            <div className={styles.gridBoxInfo}>
              <h3 className={styles.title}>Metamask</h3>
              <span className={styles.description}>
                MetaMask is an extension for accessing Ethereum enabled
                distributed applications, or "Dapps" in your normal Chrome
                browser!
              </span>
            </div>
          </a>
        </Link>
        <Link href="">
          <a className={styles.gridItem}>
            <img
              src="../icons/fortmatic.png"
              className="rounded-lg inline-block "
            />
            <div className={styles.gridBoxInfo}>
              <h3 className={styles.title}>Fortmatic</h3>
              <span className={styles.description}>
                MetaMask is an extension for accessing Ethereum enabled
                distributed applications, or "Dapps" in your normal Chrome
                browser!
              </span>
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
}
