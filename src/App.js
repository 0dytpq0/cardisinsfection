import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import { Col, Row, Button, Layout, Modal } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import Container from "./components/Container";
import CarinfoContainer from "./components/CarinfoContainer";
import IpChange from "./components/IpChange";
import carImg from "./image/disinfection.gif";
import Printinfo from "./components/Printinfo";
import AutoSwitch from "./components/AutoSwitch";
import * as mqtt from "mqtt/dist/mqtt.min";
import WaitingCar from "./components/WaitingCar";
import InquireAll from "./components/InquireAll";
import ReactToPrint from "react-to-print";
import arrivesound from "./mp3/carArrived.mp3";
import notrecogsound from "./mp3/carNotRecog.mp3";
import ReactDOM from "react-dom/client";
import PrintCompleted from "./components/PrintCompleted";

import { useMqtt, useInfo } from "./store";
import { WindowsFilled } from "@ant-design/icons";
export let client = null;

function App() {
  // const {client,changeClient,connectstatus,changeConnectStatus,payload, }
  // const [client, setClient] = useState(null);
  const [connectstatus, setConnectStatus] = useState("");
  const [payload, setPayload] = useState([]);
  const [isModalOpenPrint, setIsModalOpenPrint] = useState(false);
  const [isModalOpenFind, setIsModalOpenFind] = useState(false);
  const { changePrintedCar, waitingcar, printedcar, waitingcurrentnumber } =
    useInfo();
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
          let msg = JSON.parse(message.toString());
          if (msg.CARNUMBER === "미인식") {
            const audio = new Audio(notrecogsound);
            audio.play();
          } else if (msg.CMD !== "CCTVISOK") {
            const audio = new Audio(arrivesound);
            audio.play();
          }
        }
        setPayload(payload);
      });
      client?.on("disconnect", () => client.end());
    }
  }, []);

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
  const onPrintedCar = () => {
    changePrintedCar(waitingcar[0]);
    console.log("printedcar :>> ", printedcar);
  };
  const printFunc = () => {
    onPrintedCar();
    let printContents = componentRef.current.innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };
  const componentRef = useRef(null);

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
            style={{ height: "60vh" }}
            bodyStyle={{ overflowX: "auto", overflowY: "auto" }}
            width="700"
            open={isModalOpenFind}
            onOk={handleOkFind}
            onCancel={handleCancelFind}
            footer={[
              <Button key="submit" type="primary" onClick={handleOkFind}>
                닫기
              </Button>,
            ]}
          >
            <InquireAll />
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
            <Button onClick={printFunc}>출력</Button>
            {/* <ReactToPrint
              handleClick={() => {
                console.log("first");
              }}
              trigger={() => {
                return (
                  <Button
                    onClick={() => {
                      console.log("first");
                    }}
                  >
                    출력
                  </Button>
                );
              }}
              content={() => componentRef.current}
            /> */}
            <Printinfo className="printarea" printRef={componentRef} />
          </Container>
        </Col>

        <Col flex={8}>
          <Col style={{ height: "425px" }}>
            <Row gutter={(8, 8)}>
              <Container span={6} title={"차량정보"}>
                <CarinfoContainer></CarinfoContainer>
              </Container>

              <Container span={5} title={"대기저장"}>
                <WaitingCar />
              </Container>
              <Container span={5} title={"프린트완료차량"}>
                <PrintCompleted />
              </Container>
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
