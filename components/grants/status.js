import React, { useState } from "react";
import Link from "next/link";
import { Progress, Avatar, Button, message, Upload, Tag } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import cn from "classnames";
import { SendOutlined } from "@ant-design/icons";
import styles from "./styles.module.css";

export default function Status({ done }) {
  const props = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },

    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }

      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },

    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068",
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  };
  return (
    <div className={styles.statusBox}>
      <div
        className={cn(
          styles.statusItem,
          done ? "border-4 border-baseGreen" : "border border-gray-400"
        )}
      >
        <div>
          <div>
            <Avatar
              style={{ backgroundColor: done && "#87d068" }}
              className="mb-2 mr-2"
            >
              1
            </Avatar>
            <span className="text-lg font-bold">$150.000 </span>
          </div>
          <span className="text-sm">
            Learning Groups onboard strong technical specialists (engineers,
            researchers Learning Groups onboard strong technical specialists
            (engineers, researchers Learning Groups onboard strong technical
            specialists (engineers, researchers
          </span>
        </div>
        <div className="flex-shrink w-max">
          {done ? (
            <Tag color="success">Rapor İndir</Tag>
          ) : (
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          )}
        </div>
      </div>
    </div>
  );
}
