import React from "react";
import "./App.css";
import { Col, Row } from "antd";
import Container from "./components/Container";
import CarinfoContainer from "./components/CarinfoContainer";
import carImg from "./image/disinfection.gif";
import { useInfo } from "./store";

function App() {
  const { carinfo } = useInfo((state) => state);
  return (
    <>
      <Row wrap={false} style={{ height: "100vh" }} gutter={(8, 8)}>
        <Col style={{ width: "300px" }} flex={2}>
          <Container title={"소독필증"}>
            <div>차량 번호 : {carinfo.carnum}</div>
            <div>차량 목적 : {carinfo.purpose}</div>
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
            <Container title={"상태정보"}>
              <img style={{ width: "99%", height: "50vh" }} src={carImg} />
            </Container>
          </Col>
        </Col>
      </Row>
    </>
  );
}

export default App;
