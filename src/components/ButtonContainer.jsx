import React, { useState, useEffect } from "react";
import "../App.css";
import { Col, Row, Layout, Button, Modal, List } from "antd";
import axios from "axios";

function ButtonContainer({ title, children }) {
  const { Header } = Layout;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Col className="buttoncontainer">
        <Header className="header">
          {title}

          <Button onClick={showModal}>조회</Button>
          <Modal
            title=""
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          ></Modal>
        </Header>
        <Col>{children}</Col>
      </Col>
    </>
  );
}

export default ButtonContainer;
