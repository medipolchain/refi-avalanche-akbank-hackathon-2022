import Link from "next/link";
import { Avatar } from "antd";
import { EditOutlined } from "@ant-design/icons";
import styles from "./styles.module.css";

export default function Head({ item }) {
  return (
    <div className={styles.head}>
      <div className="container px-20 mx-auto">
        <div className="flex items-center justify-between md:flex-wrap  w-full">
          <a className="flex items-center gap-4 mb-4">
            <Avatar
              src="https://i.pravatar.cc/100"
              size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
            />
            <div>
              <p>Berkay</p>
              <small>@Berkay</small>
            </div>
          </a>
          <Link href="">
            <a className="text-white border border-white p-2 rounded text-base hover:bg-gray-900 hover:text-white transition">
              <EditOutlined /> Edit Profile
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
