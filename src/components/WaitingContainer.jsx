import React from "react";
import "../App.css";
import { useInfo, useWaitingCar } from "../store";
import { Col, Row, Layout, Button } from "antd";
import AutoButton from "./AutoSwitch";

function WaitingContainer({ title, children, span }) {
  const { Header } = Layout;
  const { changeWaitingCar } = useInfo();
  const { changeTrashWaitingCar } = useWaitingCar();
  const onClear = () => {
    changeWaitingCar([]);
    changeTrashWaitingCar([]);
  };

  return (
    <>
      <Col span={span} style={{ height: "70vh" }}>
        <Header className="header">
          {title}
          <Button onClick={onClear}>Clear</Button>
        </Header>

        <Col>{children}</Col>
      </Col>
    </>
  );
}

export default WaitingContainer;
