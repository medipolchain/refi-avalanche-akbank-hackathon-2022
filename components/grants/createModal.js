import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Textarea,
  Radio,
  Select,
  DatePicker,
  Steps,
} from "antd";
import { InfoCircleOutlined, DeleteOutlined } from "@ant-design/icons";

import cn from "classnames";
import { FilterOutlined } from "@ant-design/icons";
import styles from "./styles.module.css";
import TextArea from "antd/lib/input/TextArea";
const { Option } = Select;
const { Step } = Steps;
const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}
export default function CreateModal({ open, handleCancel }) {
  const [filterActive, setFilterActive] = useState(false);
  const [current, setCurrent] = useState(0);
  const [activities, setActivities] = useState([
    {
      summary: "",
      budget: "",
    },
  ]);

  useEffect(() => {
    console.log(activities);
  }, [activities]);

  const [grant, setGrant] = useState({
    grantName:"",
    year:"",
    category:"",
    budget:"",
    date:"",
    report:"",
    domain:"",
    impact:[
        {
          numberOfHouse:"",
          gender:"",
          ageRange:"",  
        },
        {
          numberOfHouse:"",
          gender:"",
          ageRange:"",
      },
      ]
  })


  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState("optional");
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };
  const selectAfter = (
    <Select defaultValue="USD" size="large" style={{ width: 60 }}>
      <Option value="USD">$</Option>
    </Select>
  );
  const onStepChange = (value) => {
    console.log("onChange:", current);
    setCurrent(value);
  };
  const controlActivities = (name, value, key) => {
    setActivities(
      activities.map((item, index) => {
        if (key === index) {
          item[name] = value;
        }
        return item;
      })
    );
  };
  const addActivities = () => {
    setActivities((prev) => [
      ...prev,
      {
        summary: "",
        budget: "",
      },
    ]);
  };
  const removeActivities = (key) => {
    setActivities(activities.filter((item, index) => key !== index));
  };

  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      width={800}
      footer={false}
      className="bg-baseGreen rounded-xl"
    >
      <h2 className={styles.modalTitle}>Create Grant</h2>
      <Form
        form={form}
        layout="vertical"
        initialValues={{ requiredMarkValue: requiredMark }}
        onValuesChange={onRequiredTypeChange}
        requiredMark={requiredMark}
      >
        <Steps
          size="small"
          current={current}
          onChange={onStepChange}
          className="mb-10"
        >
          <Step title="Info" />
          <Step title="Domain Size" />
          <Step title="Activities" />
        </Steps>
        {current === 0 && (
          <Row gutter={16}>
            <Col className="gutter-row" span={24}>
              <Form.Item
                label="Grant name"
                required
                tooltip="This is a required field"
              >
                <Input placeholder="Grant name" size="large" />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item
                label="Year"
                required
                tooltip="This is a required field"
              >
                <DatePicker
                  onChange={onChange}
                  size="large"
                  className="w-full"
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
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
            </Col>
            <Col className="gutter-row" span={24}>
              <Form.Item
                required
                label="Budget"
                tooltip={{
                  title: "Tooltip with customize icon",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Input
                  addonAfter={selectAfter}
                  defaultValue={100}
                  size="large"
                  className="w-full"
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={24}>
              <Form.Item
                label="Planned Action Time"
                required
                tooltip="This is a required field"
              >
                <DatePicker
                  onChange={onChange}
                  size="large"
                  className="w-full"
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={24}>
              <Form.Item
                required
                label="Report"
                tooltip={{
                  title: "Tooltip with customize icon",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <TextArea size="large" className="w-full" />
              </Form.Item>
            </Col>
            <Col className="gutter-row text-end" span={24}>
              <button
                className="bg-baseGreen text-lg text-white p-2 rounded "
                onClick={() => onStepChange(1)}
              >
                Next Step
              </button>
            </Col>
          </Row>
        )}
        {current === 1 && (
          <Row gutter={16}>
            <Col className="gutter-row" span={24}>
              <Form.Item
                required
                label="Domain"
                tooltip={{
                  title: "Tooltip with customize icon",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <InputNumber
                  defaultValue={100}
                  size="large"
                  className="w-full"
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={8}>
              <Form.Item
                required
                label="Number of Houses"
                tooltip={{
                  title: "Tooltip with customize icon",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <InputNumber
                  defaultValue={100}
                  size="large"
                  className="w-full"
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={8}>
              <Form.Item
                required
                label="Gender"
                tooltip={{
                  title: "Tooltip with customize icon",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Select defaultValue="E" size="large" className="w-full">
                  <Option value="E">Man</Option>
                  <Option value="K">Woman</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={8}>
              <Form.Item
                required
                label="Age Range"
                tooltip={{
                  title: "Tooltip with customize icon",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <InputNumber
                  defaultValue={100}
                  size="large"
                  className="w-full"
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={8}>
              <Form.Item
                required
                label="Number of Houses"
                tooltip={{
                  title: "Tooltip with customize icon",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <InputNumber
                  defaultValue={100}
                  size="large"
                  className="w-full"
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={8}>
              <Form.Item
                required
                label="Gender"
                tooltip={{
                  title: "Tooltip with customize icon",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Select defaultValue="E" size="large" className="w-full">
                  <Option value="E">Man</Option>
                  <Option value="K">Woman</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={8}>
              <Form.Item
                required
                label="Age Range"
                tooltip={{
                  title: "Tooltip with customize icon",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <InputNumber
                  defaultValue={100}
                  size="large"
                  className="w-full"
                />
              </Form.Item>
            </Col>

            <Col className="gutter-row text-end" span={24}>
              <button
                className="bg-gray-600 text-lg text-white p-2 rounded  mr-4"
                onClick={() => onStepChange(0)}
              >
                Prev Step
              </button>
              <button
                className="bg-baseGreen text-lg text-white p-2 rounded "
                onClick={() => onStepChange(2)}
              >
                Next Step
              </button>
            </Col>
          </Row>
        )}
        {current === 2 && (
          <>
            {activities.map((i, key) => (
              <Row key={key} gutter={16}>
                <Col className="gutter-row" span={12}>
                  <Form.Item
                    required
                    label="Summary of the activities and necessary"
                    tooltip={{
                      title: "Tooltip with customize icon",
                      icon: <InfoCircleOutlined />,
                    }}
                  >
                    <Input size="large" className="w-full" />
                  </Form.Item>
                </Col>
                <Col className="gutter-row" span={8}>
                  <Form.Item
                    required
                    label="Budget of the specific milestone"
                    tooltip={{
                      title: "Tooltip with customize icon",
                      icon: <InfoCircleOutlined />,
                    }}
                  >
                    <InputNumber size="large" className="w-full" />
                  </Form.Item>
                </Col>
                <Col className="gutter-row" span={2}>
                  <button
                    className="h-full"
                    onClick={() => removeActivities(key)}
                  >
                    <span className="bg-[red] hover:bg-black  text-white rounded-full pt-1 px-3 pb-3">
                      <DeleteOutlined />
                    </span>
                  </button>
                </Col>
              </Row>
            ))}
            <button
              className="bg-gray-600 text-lg text-white p-2 rounded  mr-4 w-full mb-10"
              onClick={() => addActivities()}
            >
              Add Activities
            </button>
            <Row gutter={16}>
              <Col className="gutter-row text-end" span={24}>
                <button
                  className="bg-gray-600 text-lg text-white p-2 rounded  mr-4"
                  onClick={() => onStepChange(1)}
                >
                  Prev Step
                </button>
                <button
                  type="submit"
                  className="bg-baseGreen text-lg text-white p-2 rounded "
                >
                  Next Step
                </button>
              </Col>
            </Row>
          </>
        )}
      </Form>
    </Modal>
  );
}
