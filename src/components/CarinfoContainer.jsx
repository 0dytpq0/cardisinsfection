import React, { useEffect, useState } from "react";
import { Alert, message, Modal, Button, Input, Col, Row } from "antd";
import { useInfo, useSuccess } from "../store";
import ButtonContainer from "./ButtonContainer";
import ButtonContainerArea from "./ButtonContainerArea";
import ButtonContainerChecker from "./ButtonContainerChecker";
import ButtonContainerActor from "./ButtonContainerActor";
import axios from "axios";

export default function CarinfoContainer() {
  const { changeCarInfo, carinfo, areainfo, changeAreaInfo } = useInfo(
    (state) => state
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenChecker, setIsModalOpenChecker] = useState(false);
  const [isModalOpenActor, setIsModalOpenActor] = useState(false);

  // const [messageApi, contextHolder] = message.useMessage();

  const onChangeCarNum = (e) => {
    changeCarInfo({ ...carinfo, carnum: e.target.value });
    changeAreaInfo({ ...areainfo, carnum: e.target.value });
  };
  const onChangePurpose = (e) => {
    changeCarInfo({ ...carinfo, purpose: e.target.value });
    changeAreaInfo({ ...areainfo, purpose: e.target.value });
  };
  const onChangeRegNum = (e) => {
    changeAreaInfo({ ...areainfo, regnum: e.target.value });
    changeCarInfo({ ...carinfo, regnum: e.target.value });
  };
  const onChangeGpsnum = (e) => {
    changeAreaInfo({ ...areainfo, gpsnum: e.target.value });
    changeCarInfo({ ...carinfo, gpsnum: e.target.value });
  };
  const onChangeOwner = (e) => {
    changeAreaInfo({ ...areainfo, owner: e.target.value });
    changeCarInfo({ ...carinfo, owner: e.target.value });
  };
  const onChangeAddr = (e) => {
    changeAreaInfo({ ...areainfo, addr: e.target.value });
    changeCarInfo({ ...carinfo, addr: e.target.value });
  };
  const onChangePhone = (e) => {
    changeAreaInfo({ ...areainfo, phone: e.target.value });
    changeCarInfo({ ...carinfo, phone: e.target.value });
  };
  const onChangeFrom = (e) => {
    changeAreaInfo({ ...areainfo, from: e.target.value });
    changeCarInfo({ ...carinfo, from: e.target.value });
  };
  const onChangeTo = (e) => {
    changeAreaInfo({ ...areainfo, to: e.target.value });
    changeCarInfo({ ...carinfo, to: e.target.value });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    let areaValue = JSON.stringify(areainfo);
    areaValue = areaValue.replaceAll('"', "`");
    axios
      .put("http://localhost:4000/settingitems/", {
        Name: "DeliverProof",
        Value: areaValue,
      })
      .then((res) => {
        console.log("res", res.statusText);

        if (res.statusText === "OK") {
          Modal.success({
            content: `저장 성공!`,
          });
        } else {
          Modal.error({
            content: `저장 실패!`,
          });
        }
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModalchecker = () => {
    setIsModalOpenChecker(true);
  };
  const handleOkchecker = () => {
    setIsModalOpenChecker(false);
  };
  const handleCancelchecker = () => {
    setIsModalOpenChecker(false);
  };

  const showModalActor = () => {
    setIsModalOpenActor(true);
  };
  const handleOkActor = () => {
    setIsModalOpenActor(false);
  };
  const handleCancelActor = () => {
    setIsModalOpenActor(false);
  };

  return (
    <div>
      <Input
        className="input"
        placeholder="차량 번호"
        onChange={onChangeCarNum}
      />
      <Input
        className="input"
        placeholder="차량 목적"
        onChange={onChangePurpose}
      />
      <Input
        className="input"
        placeholder="등록 번호"
        onChange={onChangeRegNum}
      />
      <Input
        className="input"
        placeholder="GPS 번호"
        onChange={onChangeGpsnum}
      />
      <Input
        className="input"
        placeholder="차주 성명"
        onChange={onChangeOwner}
      />
      <Input className="input" placeholder="주소" onChange={onChangeAddr} />
      <Input className="input" placeholder="연락처" onChange={onChangePhone} />
      <Row>
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <Input
            className="input"
            placeholder="출발지"
            onChange={onChangeFrom}
          />
        </Col>

        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <Input className="input" placeholder="목적지" onChange={onChangeTo} />
        </Col>
      </Row>
      <Row justify={"center"} gutter={8} style={{ marginTop: "12px" }}>
        <Col>
          <Button onClick={showModal}>지역 정보</Button>
          <Modal
            title=""
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <ButtonContainer title={"지역정보"}>
              <ButtonContainerArea />
            </ButtonContainer>
          </Modal>
        </Col>
        <Col>
          <Button onClick={showModalchecker}>확인자 정보</Button>
          <Modal
            title=""
            open={isModalOpenChecker}
            onOk={handleOkchecker}
            onCancel={handleCancelchecker}
          >
            <ButtonContainer title={"확인자 정보"}>
              <ButtonContainerChecker />
            </ButtonContainer>
          </Modal>
        </Col>
        <Col>
          <Button onClick={showModalActor}>실시자 정보</Button>
          <Modal
            title=""
            open={isModalOpenActor}
            onOk={handleOkActor}
            onCancel={handleCancelActor}
          >
            <ButtonContainer title={"실시자 정보"}>
              <ButtonContainerActor />
            </ButtonContainer>
          </Modal>
        </Col>
      </Row>
    </div>
  );
}
