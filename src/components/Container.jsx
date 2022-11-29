import React from "react";
import "../App.css";
import { Col, Row, Layout } from "antd";
import AutoButton from "./AutoSwitch";

function Container({ title, children, span }) {
  const { Header } = Layout;
  return (
    <>
      <Col span={span} style={{ height: "70vh" }}>
        <Header className="header">{title}</Header>
        <Col>{children}</Col>
      </Col>
    </>
  );
}

export default Container;
