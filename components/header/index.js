import Image from "next/image";
import Link from "next/link";
import cn from "classnames";
import styles from "./styles.module.css";
import React, { useState } from "react";

import { useAccount } from "../web3/hooks";
import { useWeb3 } from "../web3/providers/web3";
import { useEffect } from "react";

export default function Header({ page }) {
  const { account } = useAccount();
  const [clientAccount, setClientAccount] = useState(undefined);
  const { connect, web3 } = useWeb3();

  const connectClient = async () => {
    setClientAccount(true);
    await connect();
  };

  const disconnect = () => {
    setClientAccount(!clientAccount);
    console.log(clientAccount);
  };

  return (
    <div className={cn(page ? "bg-white" : "")}>
      <header className={styles.header}>
        <div>
          <Link href="/">
            <a className={styles.logo}>Granteed</a>
          </Link>
        </div>
        <nav className={styles.nav}>
          <Link href="/">
            <a className={styles.navLink}>Home</a>
          </Link>
          <Link href="/about">
            <a className={styles.navLink}>About Us</a>
          </Link>
          <Link href="/grants">
            <a className={styles.navLink}>Grants</a>
          </Link>
          <Link href="/contact">
            <a className={styles.navLink}>Contact</a>
          </Link>
        </nav>
        <div className="flex gap-3">
          {account.data && clientAccount ? (
            <>
            <Link href="/profile">
              <a className={styles.navButton}>Profile</a>
            </Link>
            <button onClick={disconnect} className={styles.navDisconnectButton}>Disconnect</button>
            </>
          ): (
            <button onClick={() => connectClient()} className={styles.navButton}>Connect Wallet</button>
          )}
        </div>
      </header>
    </div>
  );
}
