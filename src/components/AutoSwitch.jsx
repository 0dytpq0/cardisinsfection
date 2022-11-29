import React, { useState } from "react";
import "../App.css";
import { Button, Col, Row, Layout, Switch, Drawer } from "antd";

const AutoSwitch = ({ title, children, span }) => {
  const { Header } = Layout;
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onClickHandler = () => {
    console.log("do it");
  };

  return (
    <>
      <Col span={span} style={{ height: "70vh" }}>
        <Header className="header">
          {title}{" "}
          <Switch
            onClick={open ? onClose : showDrawer}
            checkedChildren="수동"
            unCheckedChildren="자동"
          />
        </Header>

        <Col>
          {children}
          <Drawer
            title="장치 제어"
            placement="right"
            closable={false}
            onClose={onClose}
            open={open}
            getContainer={false}
          >
            <Row className="auto">
              <Row className="auto_columns">
                <Col span={6}>차단기</Col>
                <Col span={9}>
                  <Button className="auto_button" onClick={onClickHandler}>
                    올리기
                  </Button>
                </Col>
                <Col span={9}>
                  <Button className="auto_button" onClick={onClickHandler}>
                    내리기
                  </Button>
                </Col>
              </Row>
              <Row className="auto_columns">
                <Col span={6}>입구문</Col>
                <Col span={9}>
                  <Button className="auto_button" onClick={onClickHandler}>
                    열기
                  </Button>
                </Col>
                <Col span={9}>
                  <Button className="auto_button" onClick={onClickHandler}>
                    닫기
                  </Button>
                </Col>
              </Row>
              <Row className="auto_columns">
                <Col span={6}>물기제거</Col>
                <Col span={9}>
                  <Button className="auto_button" onClick={onClickHandler}>
                    시작
                  </Button>
                </Col>
                <Col span={9}>
                  <Button className="auto_button" onClick={onClickHandler}>
                    정지
                  </Button>
                </Col>
              </Row>
              <Row className="auto_columns">
                <Col span={6}>운전석소독</Col>
                <Col span={9}>
                  <Button className="auto_button" onClick={onClickHandler}>
                    시작
                  </Button>
                </Col>
                <Col span={9}>
                  <Button className="auto_button" onClick={onClickHandler}>
                    정지
                  </Button>
                </Col>
              </Row>
              <Row className="auto_columns">
                <Col span={6}>소독기</Col>
                <Col span={9}>
                  <Button className="auto_button" onClick={onClickHandler}>
                    동작
                  </Button>
                </Col>
                <Col span={9}>
                  <Button className="auto_button" onClick={onClickHandler}>
                    중지
                  </Button>
                </Col>
              </Row>
              <Row className="auto_columns">
                <Col span={6}>공기정화</Col>
                <Col span={9}>
                  <Button className="auto_button" onClick={onClickHandler}>
                    동작
                  </Button>
                </Col>
                <Col span={9}>
                  <Button className="auto_button" onClick={onClickHandler}>
                    중지
                  </Button>
                </Col>
              </Row>
              <Row className="auto_columns">
                <Col span={6}>출구문</Col>
                <Col span={9}>
                  <Button className="auto_button" onClick={onClickHandler}>
                    열기
                  </Button>
                </Col>
                <Col span={9}>
                  <Button className="auto_button" onClick={onClickHandler}>
                    닫기
                  </Button>
                </Col>
              </Row>
            </Row>
          </Drawer>
        </Col>
      </Col>
    </>
  );
};

export default AutoSwitch;
