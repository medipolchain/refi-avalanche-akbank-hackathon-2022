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
import { useAccount } from "../web3/hooks";
import { useWeb3 } from "../web3/providers";
import cn from "classnames";
import { FilterOutlined } from "@ant-design/icons";
import styles from "./styles.module.css";
import TextArea from "antd/lib/input/TextArea";
import { axiosClient } from "../../utils/axiosClient";
const { Option } = Select;
const { Step } = Steps;
const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}
export default function   CreateModal({ open, handleCancel }) {
  const [filterActive, setFilterActive] = useState(false);
  const [current, setCurrent] = useState(0);
/*   const [contract, setContract] = useState();
  const contractAddress = "0x24d36c1425eeC89623cC9707F197B481d275fDA4";
  const { account } = useAccount();
  const { web3 } = useWeb3(); */
  const { account } = useAccount();
  const [activities, setActivities] = useState([
    {
      summary: "",
      budget: "",
    },
  ]);

  const [impact, setImpact] = useState([
    {
      numberOfHouse: "",
      gender: "",
      ageRange: "",
    },
    {
      numberOfHouse: "",
      gender: "",
      ageRange: "",
    },
  ]);

  const [grant, setGrant] = useState({
    grantName: "",
    description:"",
    year: "",
    category: [],
    budget: "",
    location:"",
    date: "",
    report: "",
    domain: "",
  });

  const [form] = Form.useForm();

  useEffect(() => {
    console.log(grant);
  }, [grant]);

/*   const onChange = (date, dateString) => {
    setGrant({ ...grant, date: dateString.toString().split("-")[0] });
  };
  
  const onChangeAction = (date, dateString) => {
    setGrant({ ...grant, year: dateString.toString().split("-")[0] });
  } */

  console.log("form", form.getFieldValue("description"));
  const onRequiredTypeChange = (d) => {
    console.log("d", d);
  };
  const selectAfter = (
    <Select initialValue="USD" size="large" style={{ width: 60 }}>
      <Option value="USD">$</Option>
    </Select>
  );
  const onStepChange = (value) => {
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
  const onValuesChange = (d, a) => {
    setGrant(a);
  };
  const onFinish = (values) => {
    console.log(grant, impact, activities);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const createGrant = async() => {
    //POST request to create grant
    await axiosClient.post("set_grant", {
      "name": "Akbank ReFi Hackathon",
      "publicAddress":account,
      "description": "Akbank ReFi Hackathon",
      "category": 0,
      "year": 2021,
      "location": 6,
      "budget": 100000,
      "impact_area": 150,
      "impact_people": 1000,
      "average_age": 25,
      "legal": 0,
      "date": 6,
      "activities": [
          {
              "id":0,
              "budget":17500,
              "description":"xxx"
          },
                  {
              "id":1,
              "budget":15000,
              "description":"yyy"
          },
                  {
              "id":2,
              "budget":20000,
              "description":"zzz"
          }
      ]
  }
    ).then((response) => {
      console.log(response);
    }
    ).catch((error) => {
      console.log(error);
    }
    )}
    
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
        initialValues={grant}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onValuesChange={onValuesChange}
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

        <Row gutter={16} className={current === 0 ? "flex" : "hidden"}>
          <Col className="gutter-row" span={24}>
            <Form.Item
              label="Grant name"
              tooltip="This is a required field"
              name="grantName"
              rules={[
                {
                  required: true,
                  message: "This is a required field!",
                },
              ]}
            >
              <Input placeholder="Grant name" size="large" />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={24}>
            <Form.Item
              label="Description"
              tooltip="This is a required field"
              name="description"
              rules={[
                {
                  required: true,
                  message: "This is a required field!",
                },
              ]}
            >
              <Input placeholder="Description" size="large"
              value={grant.description}
              onChange={(e) => setGrant({ ...grant, description: e.target.value })}
              />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <Form.Item
              label="Year"
              name="year"
              rules={[
                {
                  required: false,
                  message: "This is a required field!",
                },
              ]}
              tooltip="This is a required field"
            >
              <DatePicker size="large" className="w-full" />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={8}>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "This is a required field!",
                    },
                  ]}
                  label="Location"
                  tooltip={{
                    title: "Tooltip with customize icon",
                    icon: <InfoCircleOutlined />,
                  }}
                >
                  <Select
                    initialValue="Istanbul"
                    size="large"
                    className="w-full"
                    onChange={
                      (value) => setGrant({ ...grant, location: value })
                    }
                  >
                    <Option value="0">Istanbul</Option>
                    <Option value="1">Ankara</Option>
                    <Option value="2">Izmir</Option>
                    <Option value="3">Bursa</Option>
                    <Option value="4">Antalya</Option>
                    <Option value="5">Adana</Option>
                    <Option value="6">Gaziantep</Option>
                    <Option value="7">Konya</Option>
                    <Option value="8">Mersin</Option>
                    <Option value="9">Diyarbakır</Option>
                    <Option value="10">Kayseri</Option>
                  </Select>
                </Form.Item>
              </Col>
          <Col className="gutter-row" span={12}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "This is a required field!",
                },
              ]}
              name="category"
              label="Category/Donated Area"
              tooltip={{
                title: "Tooltip with customize icon",
                icon: <InfoCircleOutlined />,
              }}
            >
            <Input
                size="large"
                className="w-full"
              />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={24}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "This is a required field!",
                },
              ]}
              name="budget"
              label="Budget"
              tooltip={{
                title: "Tooltip with customize icon",
                icon: <InfoCircleOutlined />,
              }}
            >
              <Input
                addonAfter={selectAfter}
                initialValue={100}
                size="large"
                className="w-full"
              />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={24}>
            <Form.Item
              name="date"
              label="Planned Action Time"
              rules={[
                {
                  required: false,
                  message: "This is a required field!",
                },
              ]}
              tooltip="This is a required field"
            >
              <DatePicker size="large" className="w-full" />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={24}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "This is a required field!",
                },
              ]}
              name="report"
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

        <Row gutter={16} className={current === 1 ? "flex" : "hidden"}>
          <Col className="gutter-row" span={24}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "This is a required field!",
                },
              ]}
              name="domain"
              label="Domain"
              tooltip={{
                title: "Tooltip with customize icon",
                icon: <InfoCircleOutlined />,
              }}
            >
              <Input initialValue={100} size="large" className="w-full" />
            </Form.Item>
          </Col>
          {impact.map((i, key) => (
            <div className="flex w-full" key={key}>
              <Col className="gutter-row" span={8}>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "This is a required field!",
                    },
                  ]}
                  onChange={(e) =>
                    setImpact(
                      impact.map((item, index) => {
                        if (key === index) {
                          item["numberOfHouse"] = e.target.value;
                        }
                        return item;
                      })
                    )
                  }
                  label="Number of Houses"
                  tooltip={{
                    title: "Tooltip with customize icon",
                    icon: <InfoCircleOutlined />,
                  }}
                >
                  <InputNumber
                    size="large"
                    value={i.numberOfHouse}
                    className="w-full"
                  />
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={8}>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "This is a required field!",
                    },
                  ]}
                  label="Gender"
                  tooltip={{
                    title: "Tooltip with customize icon",
                    icon: <InfoCircleOutlined />,
                  }}
                >
                  <Select
                    initialValue="man"
                    size="large"
                    className="w-full"
                    onChange={(e) =>
                      setImpact(
                        impact.map((item, index) => {
                          if (key === index) {
                            item["gender"] = e;
                          }
                          return item;
                        })
                      )
                    }
                  >
                    <Option value="man">Man</Option>
                    <Option value="woman">Woman</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={8}>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "This is a required field!",
                    },
                  ]}
                  label="Age Range"
                  tooltip={{
                    title: "Tooltip with customize icon",
                    icon: <InfoCircleOutlined />,
                  }}
                  onChange={(e) =>
                    setImpact(
                      impact.map((item, index) => {
                        if (key === index) {
                          item["age"] = e.target.value;
                        }
                        return item;
                      })
                    )
                  }
                >
                  <InputNumber size="large" className="w-full" />
                </Form.Item>
              </Col>
            </div>
          ))}

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

        <div className={current === 2 ? "block" : "hidden"}>
          {activities.map((i, key) => (
            <Row key={key} gutter={10}>
              <Col className="gutter-row" span={12}>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "This is a required field!",
                    },
                  ]}
                  onChange={(e) =>
                    controlActivities("summary", e.target.value, key)
                  }
                  label="Summary of the activities and necessary"
                  tooltip={{
                    title: "Tooltip with customize icon",
                    icon: <InfoCircleOutlined />,
                  }}
                  key={key + "summary"}
                >
                  <Input size="large" value={i.summary} className="w-full" />
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={8}>
                <Form.Item
                  key={key + "buget"}
                  rules={[
                    {
                      required: true,
                      message: "This is a required field!",
                    },
                  ]}
                  onChange={(e) =>
                    controlActivities("budget", e.target.value, key)
                  }
                  initialValue="232323232"
                  label="Budget of the specific milestone"
                  tooltip={{
                    title: "Tooltip with customize icon",
                    icon: <InfoCircleOutlined />,
                  }}
                >
                  <InputNumber
                    size="large"
                    value={i.budget}
                    className="w-full"
                  />
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
                onClick={createGrant}
                className="bg-baseGreen text-lg text-white p-2 rounded "
              >
                Submit
              </button>
            </Col>
          </Row>
        </div>
      </Form>
    </Modal>
  );
}
