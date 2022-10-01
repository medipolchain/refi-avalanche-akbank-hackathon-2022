import Image from "next/image";
import Link from "next/link";
import cn from "classnames";
import styles from "./styles.module.css";
import { Button, Radio } from "antd";
import { useAccount } from "../web3/hooks";

export default function WelcomeBox() {
  return (
    <div className={cn(styles.welcomeBox)}>
      <div className={styles.bg}></div>
      <span className={styles.subTitle}>ALL WORLD</span>
      <h2 className={styles.title}>Causes that Speak to YOU</h2>
      <span className={styles.desc}>
        The ***** app allows you to effectively convert content and community
        engagement into charitable donations. From peer-to-peer donations,
        fundraising campaigns, crowdfunding, crowdsourcing, and much more.{" "}
      </span>
      <div className={styles.itemBox}>
        <span className={styles.item}>Health</span>
        <span className={styles.item}>Water</span>
        <span className={styles.item}>Bussiness</span>
        <span className={styles.item}>Education</span>
        <span className={styles.item}>Women</span>
        <span className={styles.item}>Animals</span>
        <span className={styles.item}>Health</span>
        <span className={styles.item}>Water</span>
        <span className={styles.item}>Bussiness</span>
        <span className={styles.item}>Education</span>
        <span className={styles.item}>Women</span>
        <span className={styles.item}>Animals</span>
        <span className={styles.item}>Food</span>
        <span className={styles.item}>Memorial</span>
        <span className={styles.item}>Health</span>
        <span className={styles.item}>Food</span>
        <span className={styles.item}>Memorial</span>
        <span className={styles.item}>Health</span>
        <span className={styles.item}>Water</span>
        <span className={styles.item}>Bussiness</span>
        <span className={styles.item}>Education</span>
        <span className={styles.item}>Women</span>
        <span className={styles.item}>Animals</span>
        <span className={styles.item}>Food</span>
        <span className={styles.item}>Memorial</span>
      </div>
    </div>
  );
}
