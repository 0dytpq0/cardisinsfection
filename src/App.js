import React, { useEffect, useState } from "react";
import "./App.css";
import { Button, Alert, message, Col, Row } from "antd";
import Container from "./components/Container";
import CarinfoContainer from "./components/CarinfoContainer";
import carImg from "./image/disinfection.gif";
import Printinfo from "./components/Printinfo";
import AutoSwitch from "./components/AutoSwitch";
import * as mqtt from "mqtt/dist/mqtt.min";
import { useInfo } from "./store";
// import { useMqtt } from "./store";
export let client = null;

function App() {
  const { carinfo } = useInfo((state) => state);
  // const {client,changeClient,connectstatus,changeConnectStatus,payload, }
  // const [client, setClient] = useState(null);
  const [connectstatus, setConnectStatus] = useState("");
  const [payload, setPayload] = useState([]);
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

  const mqttConnect = (host, options) => {
    setConnectStatus("Connecting");
    client = mqtt.connect(host, options);
  };
  useEffect(() => {
    if (!client) {
      mqttConnect("ws://" + window.location.hostname + ":9001", options);
    }
    if (client) {
      console.log(client);
      client?.on("connect", () => {
        setConnectStatus("Connected");
      });
      client?.subscribe("#", 1, (error) => {
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
        setPayload(payload);
      });
    }
  }, [client]);
  return (
    <>
      <Row
        wrap={false}
        style={{ height: "100vh", overflow: "hidden" }}
        gutter={(8, 8)}
      >
        <Col style={{ width: "300px" }} flex={2}>
          <Container title={"소독필증"}>
            <Printinfo />
          </Container>
          <Container title={"차량확인"}></Container>
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
