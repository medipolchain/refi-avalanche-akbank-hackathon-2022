import React, { useEffect, useState } from "react";
import { Tooltip, Select, Form, Input, Slider, Row, Col } from "antd";
import cn from "classnames";
import TurkeyMap from "turkey-map-react";
import { FilterOutlined } from "@ant-design/icons";
import styles from "./styles.module.css";

const { Option } = Select;
export default function Filter({
  handeCategorySelect,
  handleBudget,
  handeKSS,
  handleAreaSelect,
  activeArea,
  handeFilterSearch,
}) {
  const [filterActive, setFilterActive] = useState(false);
  const renderCity = (cityComponent, cityData) => {
    if (cityComponent.props["data-plakakodu"] == activeArea)
      cityComponent.props["data-is-election-city"] = true;

    return (
      <Tooltip title={cityData.name} key={cityData.id}>
        {cityComponent}
      </Tooltip>
    );
  };

  useEffect(() => {
    console.log("activeArea", activeArea);
  }, [activeArea]);
  return (
    <div className={styles.filterBox}>
      <div className="text-end mb-2">
        <button
          onClick={() => setFilterActive(!filterActive)}
          className="border border-baseGreen h-11 px-4 text-xl  bg-gray-900 hover:bg-baseGreen transition text-white rounded-md inline-flex gap-6 items-center"
        >
          <FilterOutlined /> Filter Search
        </button>
      </div>
      <Row gutter={16} className={cn(filterActive ? "flex" : "hidden")}>
        <Col className="gutter-row mb-4  " span={8}>
          <Form layout="vertical" className="bg-white rounded-md h-full p-4">
            <h2 className={styles.cardTitle}>Filter</h2>
            <Form.Item
              label="Industry / Category"
              tooltip="This is a required field"
              name="category"
            >
              <Select
                defaultValue="Ekonomi"
                size="large"
                className="w-full"
                onChange={(e) => handeCategorySelect(e)}
              >
                <Option value="Ekonomi">Ekonomi</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Budget"
              tooltip="This is a required field"
              name="budget"
            >
              <Input
                size="large"
                className="w-full"
                onChange={(e) => handleBudget(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="KSS"
              tooltip="This is a required field"
              name="kss"
            >
              <Slider
                range
                min={60}
                max={100}
                defaultValue={[80, 100]}
                tooltip={{ open: true }}
                onChange={(e) => handeKSS(e)}
              />
            </Form.Item>
            <button
              className={styles.donationButton}
              onClick={() => handeFilterSearch()}
            >
              <FilterOutlined /> Filter Search
            </button>
          </Form>
        </Col>
        <Col className="gutter-row mb-4 " span={16}>
          <div className="bg-white rounded-md p-4">
            <h2 className={styles.cardTitle}>Area Select</h2>
            <TurkeyMap
              hoverable={true}
              onClick={({ plateNumber, name }) =>
                // console.log(plateNumber + " - " + name + " is just clicked!")
                handleAreaSelect(plateNumber)
              }
              cityWrapper={renderCity}
              customStyle={{ idleColor: "#444", hoverColor: "#47B88F" }}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}
