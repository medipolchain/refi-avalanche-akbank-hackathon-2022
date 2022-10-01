import Image from "next/image";
import Link from "next/link";
import cn from "classnames";
import styles from "./styles.module.css";

import { useAccount } from "../web3/hooks";

export default function Header({ page }) {
  const { account } = useAccount();
  console.log(account);

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
          <Link href="/about-us">
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
          {account.data && (
            <Link href="/profile">
              <a className={styles.navButton}>Profile</a>
            </Link>
          )}
          <Link href="/connectwallet">
            <button className={styles.navButton}>Connect Wallet</button>
          </Link>
        </div>
      </header>
    </div>
  );
}
