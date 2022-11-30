import React, { useState, useEffect } from "react";
import "../App.css";
import { Button, Col, Row, Layout, Switch, Drawer } from "antd";
import { client } from "../App";
const AutoSwitch = ({ title, children, span }) => {
  const { Header } = Layout;
  const [open, setOpen] = useState(false);
  const [isClickedBreaker, setIsClickedBreaker] = useState(false);
  const [isClickedCleanWater, setIsClickedCleanWater] = useState(false);
  const [isClickedCleanDriver, setIsClickedCleanDriver] = useState(false);
  const [isClickedInGate, setIsClickedInGate] = useState(false);
  const [isClickedCarClean, setIsClickedCarClean] = useState(false);
  const [isClickedAirDeo, setIsClickedAirDeo] = useState(false);
  const [isClickedOutGate, setIsClickedOutGate] = useState(false);

  useEffect(() => {
    client?.on("message", (topic, message) => {
      if (topic.includes("dawoon/iotCtrl")) {
        const msg = message.toString();
        const jsonMsg = JSON.parse(msg);
        if (jsonMsg.CMD === "STATUS_RESPONE") {
          setOpen(jsonMsg.AUTO_MODE === 1 ? true : false);
          setIsClickedBreaker(jsonMsg.BREAKER === 1 ? true : false);
          setIsClickedCleanWater(jsonMsg.REMOVE_WATER === 1 ? true : false);
          setIsClickedCleanDriver(jsonMsg.CLEAN_DRIVER === 1 ? true : false);
          setIsClickedInGate(jsonMsg.IN_GATE === 1 ? true : false);
          setIsClickedCarClean(jsonMsg.CARCLEAN === 1 ? true : false);
          setIsClickedAirDeo(jsonMsg.AIR_DEODORIZATION === 1 ? true : false);
          setIsClickedOutGate(jsonMsg.OUT_GATE === 1 ? true : false);
        }
      }
    });
  });
  const handleToggle = (func, state) => {
    func(false);
  };
  const showDrawer = () => {
    setOpen(true);
    client?.publish(
      "CarCleanDeviceRequest",
      '{"CMD": "AUTO_MODE","STATUS": 0}'
    );
  };
  const onClose = () => {
    setOpen(false);
    client?.publish(
      "CarCleanDeviceRequest",
      '{"CMD": "AUTO_MODE","STATUS": 1}'
    );
    setIsClickedBreaker(false);
    setIsClickedCleanWater(false);
    setIsClickedCleanDriver(false);
    setIsClickedInGate(false);
    setIsClickedCarClean(false);
    setIsClickedAirDeo(false);
    setIsClickedOutGate(false);
  };
  const onBreakerUpHandler = () => {
    client?.publish("CarCleanDeviceRequest", '{"CMD": "BREAKER","STATUS": 1}');
    handleToggle(setIsClickedBreaker, isClickedBreaker);
    setIsClickedBreaker(true);
  };
  const onBreakerDownHandler = () => {
    client?.publish("CarCleanDeviceRequest", '{"CMD": "BREAKER","STATUS": 0}');
    handleToggle(setIsClickedBreaker, isClickedBreaker);
    setIsClickedBreaker(false);
  };
  const onInGateOpenHandler = () => {
    client?.publish("CarCleanDeviceRequest", '{"CMD": "In_Gate","STATUS": 1}');
    handleToggle(setIsClickedInGate, isClickedInGate);
    setIsClickedInGate(true);
  };
  const onInGateCloseHandler = () => {
    client?.publish("CarCleanDeviceRequest", '{"CMD": "In_Gate","STATUS": 0}');
    handleToggle(setIsClickedInGate, isClickedInGate);
    setIsClickedInGate(false);
  };
  const onRemoveWaterOnHandler = () => {
    client?.publish(
      "CarCleanDeviceRequest",
      '{"CMD": "REMOVE_WATER","STATUS": 1}'
    );
    handleToggle(setIsClickedCleanWater, isClickedCleanWater);
    setIsClickedCleanWater(true);
  };
  const onRemoveWaterOffHandler = () => {
    client?.publish(
      "CarCleanDeviceRequest",
      '{"CMD": "REMOVE_WATER","STATUS": 0}'
    );
    handleToggle(setIsClickedCleanWater, isClickedCleanWater);
    setIsClickedCleanWater(false);
  };
  const onCleanDriverOnHandler = () => {
    client?.publish(
      "CarCleanDeviceRequest",
      '{"CMD": "CLEAN_DRIVER","STATUS": 1}'
    );
    handleToggle(setIsClickedCleanDriver, isClickedCleanDriver);
    setIsClickedCleanDriver(true);
  };
  const onCleanDriverOffHandler = () => {
    client?.publish(
      "CarCleanDeviceRequest",
      '{"CMD": "CLEAN_DRIVER","STATUS": 0}'
    );
    handleToggle(setIsClickedCleanDriver, isClickedCleanDriver);
    setIsClickedCleanDriver(false);
  };
  const onCarCleanOnHandler = () => {
    client?.publish("CarCleanDeviceRequest", '{"CMD": "CARCLEAN","STATUS": 1}');
    handleToggle(setIsClickedCarClean, isClickedCarClean);
    setIsClickedCarClean(true);
  };
  const onCarCleanOffHandler = () => {
    client?.publish("CarCleanDeviceRequest", '{"CMD": "CARCLEAN","STATUS": 0}');
    handleToggle(setIsClickedCarClean, isClickedCarClean);
    setIsClickedCarClean(false);
  };
  const onAirDeodorizationOnHandler = () => {
    client?.publish(
      "CarCleanDeviceRequest",
      '{"CMD": "AIR_DEODORIZATION","STATUS": 1}'
    );
    handleToggle(setIsClickedAirDeo, isClickedAirDeo);
    setIsClickedAirDeo(true);
  };
  const onAirDeodorizationOffHandler = () => {
    client?.publish(
      "CarCleanDeviceRequest",
      '{"CMD": "AIR_DEODORIZATION","STATUS": 0}'
    );
    handleToggle(setIsClickedAirDeo, isClickedAirDeo);
    setIsClickedAirDeo(false);
  };
  const onOutGateOpenHandler = () => {
    client?.publish("CarCleanDeviceRequest", '{"CMD": "OUT_GATE","STATUS": 1}');
    handleToggle(setIsClickedOutGate, isClickedOutGate);
    setIsClickedOutGate(true);
  };
  const onOutGateCloseHandler = () => {
    client?.publish("CarCleanDeviceRequest", '{"CMD": "OUT_GATE","STATUS": 0}');
    handleToggle(setIsClickedOutGate, isClickedOutGate);
    setIsClickedOutGate(false);
  };

  useEffect(() => {
    client?.on("message", (topic, message) => {
      console.log("message :>> ", topic, message.toString());
    });
  });
  return (
    <>
      <Col span={span} style={{ height: "70vh" }}>
        <Header className="header">
          {title}{" "}
          <Switch
            onClick={open ? onClose : showDrawer}
            checkedChildren="자동"
            unCheckedChildren="수동"
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
                  <Button
                    className={
                      isClickedBreaker ? "btn_clicked" : " auto_button"
                    }
                    onClick={onBreakerUpHandler}
                  >
                    올리기
                  </Button>
                </Col>
                <Col span={9}>
                  <Button
                    className={
                      isClickedBreaker ? " auto_button" : "btn_clicked"
                    }
                    onClick={onBreakerDownHandler}
                  >
                    내리기
                  </Button>
                </Col>
              </Row>
              <Row className="auto_columns">
                <Col span={6}>입구문</Col>
                <Col span={9}>
                  <Button
                    className={isClickedInGate ? "btn_clicked" : " auto_button"}
                    onClick={onInGateOpenHandler}
                  >
                    열기
                  </Button>
                </Col>
                <Col span={9}>
                  <Button
                    className={isClickedInGate ? " auto_button" : "btn_clicked"}
                    onClick={onInGateCloseHandler}
                  >
                    닫기
                  </Button>
                </Col>
              </Row>
              <Row className="auto_columns">
                <Col span={6}>물기제거</Col>
                <Col span={9}>
                  <Button
                    className={
                      isClickedCleanWater ? "btn_clicked" : " auto_button"
                    }
                    onClick={onRemoveWaterOnHandler}
                  >
                    시작
                  </Button>
                </Col>
                <Col span={9}>
                  <Button
                    className={
                      isClickedCleanWater ? " auto_button" : "btn_clicked"
                    }
                    onClick={onRemoveWaterOffHandler}
                  >
                    정지
                  </Button>
                </Col>
              </Row>
              <Row className="auto_columns">
                <Col span={6}>운전석소독</Col>
                <Col span={9}>
                  <Button
                    className={
                      isClickedCleanDriver ? "btn_clicked" : " auto_button"
                    }
                    onClick={onCleanDriverOnHandler}
                  >
                    시작
                  </Button>
                </Col>
                <Col span={9}>
                  <Button
                    className={
                      isClickedCleanDriver ? " auto_button" : "btn_clicked"
                    }
                    onClick={onCleanDriverOffHandler}
                  >
                    정지
                  </Button>
                </Col>
              </Row>
              <Row className="auto_columns">
                <Col span={6}>소독기</Col>
                <Col span={9}>
                  <Button
                    className={
                      isClickedCarClean ? "btn_clicked" : " auto_button"
                    }
                    onClick={onCarCleanOnHandler}
                  >
                    동작
                  </Button>
                </Col>
                <Col span={9}>
                  <Button
                    className={
                      isClickedCarClean ? " auto_button" : "btn_clicked"
                    }
                    onClick={onCarCleanOffHandler}
                  >
                    중지
                  </Button>
                </Col>
              </Row>
              <Row className="auto_columns">
                <Col span={6}>공기정화</Col>
                <Col span={9}>
                  <Button
                    className={isClickedAirDeo ? "btn_clicked" : " auto_button"}
                    onClick={onAirDeodorizationOnHandler}
                  >
                    동작
                  </Button>
                </Col>
                <Col span={9}>
                  <Button
                    className={isClickedAirDeo ? " auto_button" : "btn_clicked"}
                    onClick={onAirDeodorizationOffHandler}
                  >
                    중지
                  </Button>
                </Col>
              </Row>
              <Row className="auto_columns">
                <Col span={6}>출구문</Col>
                <Col span={9}>
                  <Button
                    className={
                      isClickedOutGate ? "btn_clicked" : " auto_button"
                    }
                    onClick={onOutGateOpenHandler}
                  >
                    열기
                  </Button>
                </Col>
                <Col span={9}>
                  <Button
                    className={
                      isClickedOutGate ? " auto_button" : "btn_clicked"
                    }
                    onClick={onOutGateCloseHandler}
                  >
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
