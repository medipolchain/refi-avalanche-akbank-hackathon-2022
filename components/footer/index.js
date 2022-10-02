import Link from "next/link";
import {
  FaAngleRight,
  FaDiscord,
  FaYoutube,
  FaTwitter,
  FaInstagram,
  FaGlobe,
} from "react-icons/fa";

import styles from "./styles.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className="flex gap-40">
          <div>
            <span className={styles.footerTitle}>Links</span>
            <Link href="/">
              <a className={styles.footerLink}>Home</a>
            </Link>
            <Link href="/">
              <a className={styles.footerLink}>About Us</a>
            </Link>
            <Link href="/">
              <a className={styles.footerLink}>Grants</a>
            </Link>
          </div>
        </div>
        <div className={styles.emailBox}>
          <span className={styles.footerTitle}>Keep in touch</span>

          <div className="mt-5 flex gap-3">
            <Link href="">
              <a className={styles.socialLink}>
                <FaDiscord />
              </a>
            </Link>
            <Link href="">
              <a className={styles.socialLink}>
                <FaYoutube />
              </a>
            </Link>
            <Link href="">
              <a className={styles.socialLink}>
                <FaTwitter />
              </a>
            </Link>
            <Link href="">
              <a className={styles.socialLink}>
                <FaInstagram />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
