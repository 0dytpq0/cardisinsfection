import React, { useEffect, useState } from "react";
import "./App.css";
import { Col, Row, Button, Layout, Modal } from "antd";
import Container from "./components/Container";
import CarinfoContainer from "./components/CarinfoContainer";
import IpChange from "./components/IpChange";
import carImg from "./image/disinfection.gif";
import Printinfo from "./components/Printinfo";
import AutoSwitch from "./components/AutoSwitch";
import * as mqtt from "mqtt/dist/mqtt.min";

// import { useMqtt } from "./store";
export let client = null;

function App() {
  // const {client,changeClient,connectstatus,changeConnectStatus,payload, }
  // const [client, setClient] = useState(null);
  const [connectstatus, setConnectStatus] = useState("");
  const [payload, setPayload] = useState([]);
  const [isModalOpenPrint, setIsModalOpenPrint] = useState(false);
  const [isModalOpenFind, setIsModalOpenFind] = useState(false);

  const options = {
    keepalive: 3000,
    protocolId: "MQTT",
    protocolVersion: 4,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 10 * 60 * 1000,
    will: {
      topic: "WillMsg",
      payload: "Connection Closed abnormally..!",
      qos: 0,
      retain: false,
    },
    rejectUnauthorized: false,
  };

  var str = "TIME20221201113500";
  let bytes = []; // char codes
  var bytesv2 = []; // char codes
  for (var i = 0; i < str.length; ++i) {
    var code = str.charCodeAt(i);

    bytes = bytes.concat([code]);

    bytesv2 = bytesv2.concat([code & 0xff, (code / 256) >>> 0]);
  }
  bytes.unshift(2);
  bytes.push(3);

  const mqttConnect = (host, options) => {
    setConnectStatus("Connecting");
    client = mqtt.connect(host, options);
  };
  useEffect(() => {
    if (!client) {
      mqttConnect("ws://" + window.location.hostname + ":9001", options);
    }
    if (client) {
      client?.on("connect", () => {
        setConnectStatus("Connected");
      });
      client?.subscribe("#", 0, (error) => {
        if (error) {
          console.log("Subscribe to topics error", error);
          return;
        }
      });
      client?.on("error", (err) => {
        console.error("Connection error: ", err);
        client?.end();
      });
      client?.on("reconnect", () => {
        setConnectStatus("Reconnecting");
      });
      client?.on("message", (topic, message) => {
        const payload = { topic, message: message.toString() };
        if (topic.includes("CCTV")) {
          message = message.toString().replaceAll("\\", "/");
          // .replaceAll('"', "'");
          console.log("message :>> ", message);
          let msg = JSON.parse(message.toString());
          console.log("msg :>> ", msg);
        }
        setPayload(payload);
      });
      client?.on("disconnect", () => client.end());
    }
  }, [client]);

  const showModalPrint = () => {
    setIsModalOpenPrint(true);
  };
  const handleOkPrint = (e) => {
    setIsModalOpenPrint(false);
  };
  const handleCancelPrint = () => {
    setIsModalOpenPrint(false);
  };
  const showModalFind = () => {
    setIsModalOpenFind(true);
  };
  const handleOkFind = (e) => {
    setIsModalOpenFind(false);
  };
  const handleCancelFind = () => {
    setIsModalOpenFind(false);
  };

  return (
    <>
      <Row>
        <Col>
          <Button onClick={showModalPrint}>소독필증</Button>
          <Modal
            title="Basic Modal"
            open={isModalOpenPrint}
            onOk={handleOkPrint}
            onCancel={handleCancelPrint}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
        </Col>
        <Col>
          <Button onClick={showModalFind}>조회</Button>
          <Modal
            title="Basic Modal"
            open={isModalOpenFind}
            onOk={handleOkFind}
            onCancel={handleCancelFind}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
        </Col>
        <Col>
          <IpChange />
        </Col>
      </Row>

      <Row
        wrap={false}
        style={{ height: "100vh", overflow: "hidden" }}
        gutter={(8, 8)}
      >
        <Col style={{ width: "300px" }} flex={2}>
          <Container title={"소독필증"}>
            <Printinfo />
          </Container>
          <Container title={"차량확인"}>
            <img src="http://127.0.0.1:4000/images/1.jpg" />
          </Container>
        </Col>

        <Col flex={8}>
          <Col style={{ height: "425px" }}>
            <Row gutter={(8, 8)}>
              <Container span={6} title={"차량정보"}>
                <CarinfoContainer></CarinfoContainer>
              </Container>

              <Container span={5} title={"대기저장"}></Container>
              <Container span={5} title={"프린트완료차량"}></Container>
              <Container span={8} title={"알림"}></Container>
            </Row>
          </Col>
          <Col>
            <AutoSwitch title={"상태정보"}>
              <img style={{ width: "99%", height: "50vh" }} src={carImg} />
            </AutoSwitch>
          </Col>
        </Col>
      </Row>
    </>
  );
}

export default App;
