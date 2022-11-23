import React, { useState } from "react";
import "../App.css";
import { Col, Row, Layout, Button, Modal } from "antd";

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
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
        </Header>
        <Col>{children}</Col>
      </Col>
    </>
  );
}

export default ButtonContainer;
