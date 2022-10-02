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
      <h2 className={styles.title}><span className="text-[#46b88f]"><b>Grant</b></span> is <span className="text-[#46b88f]"><b>Guaranteed</b></span></h2>
      <span className={styles.desc}>
        Social Grant Marketplace; Kurumsal Sosyal Sorumluluk Algoritması ile sosyal kalkınma projelerinin optimizasyonunu sağlayarak etki sertifikası dağıtması ve bu sosyal etkinin üretim şirketleri tarafından geliştirilmesini sağlar.{" "}
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
      </div>
    </div>
  );
}
