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
  const [isClickedPipeAir, setIsClickedPipeAir] = useState(false);
  const [inputStatus, setInputStatus] = useState("");
  const [outputStatus, setOutputStatus] = useState("");

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
          setIsClickedPipeAir(jsonMsg.PIPE_AIR_WATERDRAIN === 1 ? true : false);
          setInputStatus(jsonMsg.INPUT_STATUS);
          setOutputStatus(jsonMsg.OUPUT_STATUS);
        }
      }
    });
  }, []);
  const handleToggle = (func) => {
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
    setIsClickedPipeAir(false);
  };
  const onBreakerUpHandler = () => {
    client?.publish("CarCleanDeviceRequest", '{"CMD": "BREAKER","STATUS": 1}');
    handleToggle(setIsClickedBreaker);
    setIsClickedBreaker(true);
  };
  const onBreakerDownHandler = () => {
    client?.publish("CarCleanDeviceRequest", '{"CMD": "BREAKER","STATUS": 0}');
    handleToggle(setIsClickedBreaker);
    setIsClickedBreaker(false);
  };
  const onInGateOpenHandler = () => {
    client?.publish("CarCleanDeviceRequest", '{"CMD": "In_Gate","STATUS": 1}');
    handleToggle(setIsClickedInGate);
    setIsClickedInGate(true);
  };
  const onInGateCloseHandler = () => {
    client?.publish("CarCleanDeviceRequest", '{"CMD": "In_Gate","STATUS": 0}');
    handleToggle(setIsClickedInGate);
    setIsClickedInGate(false);
  };
  const onRemoveWaterOnHandler = () => {
    client?.publish(
      "CarCleanDeviceRequest",
      '{"CMD": "REMOVE_WATER","STATUS": 1}'
    );
    handleToggle(setIsClickedCleanWater);
    setIsClickedCleanWater(true);
  };
  const onRemoveWaterOffHandler = () => {
    client?.publish(
      "CarCleanDeviceRequest",
      '{"CMD": "REMOVE_WATER","STATUS": 0}'
    );
    handleToggle(setIsClickedCleanWater);
    setIsClickedCleanWater(false);
  };
  const onCleanDriverOnHandler = () => {
    client?.publish(
      "CarCleanDeviceRequest",
      '{"CMD": "CLEAN_DRIVER","STATUS": 1}'
    );
    handleToggle(setIsClickedCleanDriver);
    setIsClickedCleanDriver(true);
  };
  const onCleanDriverOffHandler = () => {
    client?.publish(
      "CarCleanDeviceRequest",
      '{"CMD": "CLEAN_DRIVER","STATUS": 0}'
    );
    handleToggle(setIsClickedCleanDriver);
    setIsClickedCleanDriver(false);
  };
  const onCarCleanOnHandler = () => {
    client?.publish("CarCleanDeviceRequest", '{"CMD": "CARCLEAN","STATUS": 1}');
    handleToggle(setIsClickedCarClean);
    setIsClickedCarClean(true);
  };
  const onCarCleanOffHandler = () => {
    client?.publish("CarCleanDeviceRequest", '{"CMD": "CARCLEAN","STATUS": 0}');
    handleToggle(setIsClickedCarClean);
    setIsClickedCarClean(false);
  };
  const onAirDeodorizationOnHandler = () => {
    client?.publish(
      "CarCleanDeviceRequest",
      '{"CMD": "AIR_DEODORIZATION","STATUS": 1}'
    );
    handleToggle(setIsClickedAirDeo);
    setIsClickedAirDeo(true);
  };
  const onAirDeodorizationOffHandler = () => {
    client?.publish(
      "CarCleanDeviceRequest",
      '{"CMD": "AIR_DEODORIZATION","STATUS": 0}'
    );
    handleToggle(setIsClickedAirDeo);
    setIsClickedAirDeo(false);
  };
  const onOutGateOpenHandler = () => {
    client?.publish("CarCleanDeviceRequest", '{"CMD": "OUT_GATE","STATUS": 1}');
    handleToggle(setIsClickedOutGate);
    setIsClickedOutGate(true);
  };
  const onOutGateCloseHandler = () => {
    client?.publish("CarCleanDeviceRequest", '{"CMD": "OUT_GATE","STATUS": 0}');
    handleToggle(setIsClickedOutGate);
    setIsClickedOutGate(false);
  };
  const onPipeAirOnHandler = () => {
    client?.publish(
      "CarCleanDeviceRequest",
      '{"CMD": "PIPE_AIR_WATERDRAIN","STATUS": 1}'
    );
    handleToggle(setIsClickedPipeAir);
    setIsClickedPipeAir(true);
  };
  const onPipeAirOffHandler = () => {
    client?.publish(
      "CarCleanDeviceRequest",
      '{"CMD": "PIPE_AIR_WATERDRAIN","STATUS": 0}'
    );
    handleToggle(setIsClickedPipeAir);
    setIsClickedPipeAir(false);
  };
  useEffect(() => {
    client?.on("message", (topic, message) => {});
  });
  return (
    <>
      <Col span={span} style={{ height: "70vh" }}>
        <Header className="header">
          {title}
          <Col style={{ display: "flex", flexWrap: "no-wrap" }} offset={16}>
            <span>
              Input : {inputStatus}
              {"\u00A0"}
              {"\u00A0"}
              {"\u00A0"}
              {"\u00A0"}
            </span>
            <span>Output : {outputStatus}</span>
          </Col>
          <Switch
            onClick={open ? onClose : showDrawer}
            checkedChildren="??????"
            unCheckedChildren="??????"
          />
        </Header>

        <Col>
          {children}
          <Drawer
            title="?????? ??????"
            placement="right"
            closable={false}
            onClose={onClose}
            open={open}
            getContainer={false}
          >
            <Row className="auto">
              <Row className="auto_columns">
                <Col span={6}>?????????</Col>
                <Col span={9}>
                  <Button
                    className={
                      isClickedBreaker ? "btn_clicked" : " auto_button"
                    }
                    onClick={onBreakerUpHandler}
                  >
                    ?????????
                  </Button>
                </Col>
                <Col span={9}>
                  <Button
                    className={
                      isClickedBreaker ? " auto_button" : "btn_clicked"
                    }
                    onClick={onBreakerDownHandler}
                  >
                    ?????????
                  </Button>
                </Col>
              </Row>
              <Row className="auto_columns">
                <Col span={6}>?????????</Col>
                <Col span={9}>
                  <Button
                    className={isClickedInGate ? "btn_clicked" : " auto_button"}
                    onClick={onInGateOpenHandler}
                  >
                    ??????
                  </Button>
                </Col>
                <Col span={9}>
                  <Button
                    className={isClickedInGate ? " auto_button" : "btn_clicked"}
                    onClick={onInGateCloseHandler}
                  >
                    ??????
                  </Button>
                </Col>
              </Row>
              <Row className="auto_columns">
                <Col span={6}>????????????</Col>
                <Col span={9}>
                  <Button
                    className={
                      isClickedCleanWater ? "btn_clicked" : " auto_button"
                    }
                    onClick={onRemoveWaterOnHandler}
                  >
                    ??????
                  </Button>
                </Col>
                <Col span={9}>
                  <Button
                    className={
                      isClickedCleanWater ? " auto_button" : "btn_clicked"
                    }
                    onClick={onRemoveWaterOffHandler}
                  >
                    ??????
                  </Button>
                </Col>
              </Row>
              <Row className="auto_columns">
                <Col span={6}>???????????????</Col>
                <Col span={9}>
                  <Button
                    className={
                      isClickedCleanDriver ? "btn_clicked" : " auto_button"
                    }
                    onClick={onCleanDriverOnHandler}
                  >
                    ??????
                  </Button>
                </Col>
                <Col span={9}>
                  <Button
                    className={
                      isClickedCleanDriver ? " auto_button" : "btn_clicked"
                    }
                    onClick={onCleanDriverOffHandler}
                  >
                    ??????
                  </Button>
                </Col>
              </Row>
              <Row className="auto_columns">
                <Col span={6}>?????????</Col>
                <Col span={9}>
                  <Button
                    className={
                      isClickedCarClean ? "btn_clicked" : " auto_button"
                    }
                    onClick={onCarCleanOnHandler}
                  >
                    ??????
                  </Button>
                </Col>
                <Col span={9}>
                  <Button
                    className={
                      isClickedCarClean ? " auto_button" : "btn_clicked"
                    }
                    onClick={onCarCleanOffHandler}
                  >
                    ??????
                  </Button>
                </Col>
              </Row>
              <Row className="auto_columns">
                <Col span={6}>?????? ??????</Col>
                <Col span={9}>
                  <Button
                    className={isClickedAirDeo ? "btn_clicked" : " auto_button"}
                    onClick={onAirDeodorizationOnHandler}
                  >
                    ??????
                  </Button>
                </Col>
                <Col span={9}>
                  <Button
                    className={isClickedAirDeo ? " auto_button" : "btn_clicked"}
                    onClick={onAirDeodorizationOffHandler}
                  >
                    ??????
                  </Button>
                </Col>
              </Row>
              <Row className="auto_columns">
                <Col span={6}>?????????</Col>
                <Col span={9}>
                  <Button
                    className={
                      isClickedOutGate ? "btn_clicked" : " auto_button"
                    }
                    onClick={onOutGateOpenHandler}
                  >
                    ??????
                  </Button>
                </Col>
                <Col span={9}>
                  <Button
                    className={
                      isClickedOutGate ? " auto_button" : "btn_clicked"
                    }
                    onClick={onOutGateCloseHandler}
                  >
                    ??????
                  </Button>
                </Col>
              </Row>
            </Row>

            <Row className="auto_columns">
              <Col span={6}>?????? ??????</Col>
              <Col span={9}>
                <Button
                  className={isClickedPipeAir ? "btn_clicked" : " auto_button"}
                  onClick={onPipeAirOnHandler}
                >
                  ??????
                </Button>
              </Col>
              <Col span={9}>
                <Button
                  className={isClickedPipeAir ? " auto_button" : "btn_clicked"}
                  onClick={onPipeAirOffHandler}
                >
                  ??????
                </Button>
              </Col>
            </Row>
          </Drawer>
        </Col>
      </Col>
    </>
  );
};

export default React.memo(AutoSwitch);
