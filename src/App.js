import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import { Col, Row, Button, Layout, Modal } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import Container from "./components/Container";
import CarinfoContainer from "./components/CarinfoContainer";
import IpChange from "./components/IpChange";
import carImg from "./image/disinfection.gif";
import Breaker1 from "./image/Breaker1.gif";
import Water2 from "./image/Water2.gif";
import Move3 from "./image/Move3.gif";
import Disinfect4 from "./image/Disinfect4.gif";
import Out5 from "./image/Out5.gif";
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
import Alarm from "./components/Alarm";

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
  const [carimg, setCarImg] = useState("");
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
  // let carImg = null;
  let imgurl = "";
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
          let msg = JSON.parse(message?.toString());

          if (msg?.CARNUMBER === "미인식") {
            try {
              const audio = new Audio(notrecogsound);
              audio.play();
            } catch (error) {
              console.log("error", error);
            }
          } else if (msg?.CMD !== "CCTVISOK") {
            try {
              const audio = new Audio(arrivesound);
              audio.play();
            } catch (error) {
              console.log("error", error);
            }
            imgurl = msg?.IMG;
            imgurl = imgurl?.replace("c:/LPR", "http://127.0.0.1:4000/images");
            setCarImg(imgurl);
          }
        }
        if (topic.includes("CarCleanDeviceRequest")) {
          const msg = message.toString();
          const jsonMsg = JSON.parse(msg);
          if (jsonMsg?.CMD === "BREAKER") {
            carImg = Breaker1;
          }
          if (jsonMsg?.CMD === "REMOVE_WATER") {
            carImg = Water2;
          }
          if (jsonMsg?.CMD === "CLEAN_DRIVER") {
            carImg = Move3;
          }
          if (jsonMsg?.CMD === "AIR_DEODORIZATION") {
            carImg = Disinfect4;
          }
          if (jsonMsg?.CMD === "OUT_GATE") {
            carImg = Out5;
            console.log("carImg :>> ", carImg);
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
    let arr = printedcar;
    arr.unshift(waitingcar[0]);
    if (arr.length > 10) {
      arr.pop();
    }
    changePrintedCar(arr);
    console.log("printedcar :>> ", printedcar);
  };
  const printFunc = () => {
    onPrintedCar();
    let printContents = componentRef.current.innerHTML;
    let windowObject = window.open(
      "",
      "PrintWindow",
      "width=1000, height=1000, top=200, lefg=200, tollbars=no, scrollbars=no, resizeable=no"
    );

    windowObject.document.writeln(printContents);
    windowObject.document.close();
    windowObject.focus();
    windowObject.print();
    windowObject.close();
    // let arr=[]
    // arr = waitingcar
    // arr = arr.shift();
    waitingcar.shift();
    console.log("waitingcar", waitingcar);
  };
  const componentRef = useRef(null);

  return (
    <>
      <Row>
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
                <WaitingCar carimg={carimg} />
              </Container>
              <Container span={5} title={"프린트완료차량"}>
                <PrintCompleted />
              </Container>
              <Container span={8} title={"알림"}>
                <Alarm />
              </Container>
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
