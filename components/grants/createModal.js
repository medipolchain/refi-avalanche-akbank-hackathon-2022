import React, { useState } from "react";
import { Button, Modal, Form, Input, Radio, Select, DatePicker } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

import cn from "classnames";
import { FilterOutlined } from "@ant-design/icons";
import styles from "./styles.module.css";
const { Option } = Select;
const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}
export default function CreateModal({ open, handleCancel }) {
  const [filterActive, setFilterActive] = useState(false);
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState("optional");
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };
  return (
    <Modal open={open} onCancel={handleCancel} width={800} footer={false}>
      <h2 className={styles.modalTitle}>Create Grant</h2>
      <Form
        form={form}
        layout="vertical"
        initialValues={{ requiredMarkValue: requiredMark }}
        onValuesChange={onRequiredTypeChange}
        requiredMark={requiredMark}
      >
        <Form.Item
          label="Grant name"
          required
          tooltip="This is a required field"
        >
          <Input placeholder="Grant name" size="large" />
        </Form.Item>
        <Form.Item label="Year" required tooltip="This is a required field">
          <DatePicker onChange={onChange} size="large" />
        </Form.Item>
        <Form.Item
          required
          label="Category/Donated Area"
          tooltip={{
            title: "Tooltip with customize icon",
            icon: <InfoCircleOutlined />,
          }}
        >
          <Select
            mode="multiple"
            size={"large"}
            placeholder="Please select"
            // onChange={handleChange}
            style={{
              width: "100%",
            }}
          >
            {children}
          </Select>
        </Form.Item>

        <Form.Item
          required
          label="Category/Donated Area"
          tooltip={{
            title: "Tooltip with customize icon",
            icon: <InfoCircleOutlined />,
          }}
        >
          <Select
            mode="multiple"
            size={"large"}
            placeholder="Please select"
            // onChange={handleChange}
            style={{
              width: "100%",
            }}
          >
            {children}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary">Submit</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
