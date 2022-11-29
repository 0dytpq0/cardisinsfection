import React, { useState } from "react";
import { Modal, Button, Input, Col, Row } from "antd";
import { useInfo } from "../store";
import ButtonContainer from "./ButtonContainer";
import ButtonContainerArea from "./ButtonContainerArea";
import CheckerButtonViewContainer from "./CheckerButtonViewContainer";
import ActorButtonViewContainer from "./ActorButtonViewContainer";
import CarButtonViewContainer from "./CarButtonViewContainer";
import axios from "axios";

export default function CarinfoContainer() {
  const {
    changeCarInfo,
    carmodalinfo,
    areainfo,
    actorinfo,
    checkermodalinfo,
    changeCheckerInfo,
    actormodalinfo,
    changeActorInfo,
    changeCarModalInfo,
  } = useInfo((state) => state);
  const [isModalOpenCar, setIsModalOpenCar] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenChecker, setIsModalOpenChecker] = useState(false);
  const [isModalOpenActor, setIsModalOpenActor] = useState(false);

  const onChangeCarNum = (e) => {
    changeCarInfo({ ...carmodalinfo });
    changeCarModalInfo({ ...carmodalinfo, Number: e.target.value });
  };
  const onChangePurpose = (e) => {
    changeCarInfo({ ...carmodalinfo });
    changeCarModalInfo({ ...carmodalinfo, Purpose: e.target.value });
  };
  const onChangeRegNum = (e) => {
    changeCarInfo({ ...carmodalinfo });
    changeCarModalInfo({ ...carmodalinfo, RegNumber: e.target.value });
  };
  const onChangeGpsnum = (e) => {
    changeCarInfo({ ...carmodalinfo });
    changeCarModalInfo({ ...carmodalinfo, GpsNumber: e.target.value });
  };
  const onChangeOwner = (e) => {
    changeCarInfo({ ...carmodalinfo });
    changeCarModalInfo({ ...carmodalinfo, Owner: e.target.value });
  };
  const onChangeAddr = (e) => {
    changeCarInfo({ ...carmodalinfo });
    changeCarModalInfo({ ...carmodalinfo, Address: e.target.value });
  };
  const onChangePhone = (e) => {
    changeCarInfo({ ...carmodalinfo });
    changeCarModalInfo({
      ...carmodalinfo,
      Phone: e.target.value,
    });
  };
  const onChangeFrom = (e) => {
    changeCarInfo({ ...carmodalinfo });
    changeCarModalInfo({
      ...carmodalinfo,
      SPoint: e.target.value,
    });
  };
  const onChangeTo = (e) => {
    changeCarInfo({ ...carmodalinfo });
    changeCarModalInfo({
      ...carmodalinfo,
      EPoint: e.target.value,
    });
  };

  const carShowModal = () => {
    setIsModalOpenCar(true);
  };

  const carHandleOk = () => {
    setIsModalOpenCar(false);
  };

  const carHandleCancel = () => {
    setIsModalOpenCar(false);
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
  const handleOkchecker = async () => {
    setIsModalOpenChecker(false);
    changeCheckerInfo(checkermodalinfo);
    let checkerValue = JSON.stringify(checkermodalinfo);
    checkerValue = checkerValue.replaceAll('"', "`");
    console.log("checkerValue :>> ", checkerValue);
    let rt1 = false;
    let rt2 = false;
    await axios
      .put("http://localhost:4000/settingitems/", {
        Name: "COperator",
        Value: checkerValue,
      })
      .then((res) => {
        console.log("res", res.statusText);

        if (res.statusText === "OK") {
          rt1 = true;
          Modal.success({
            content: `저장 성공!`,
          });
        } else {
          rt1 = false;
          Modal.error({
            content: `저장 실패!`,
          });
        }
      });

    checkerValue = checkerValue.replaceAll("`", '"');
    checkerValue = JSON.parse(checkerValue);

    //   await axios
    //     .post("http://localhost:4000/operatoritems/", {
    //       Name: checkerValue.Name,
    //       Phone: checkerValue.Phone,
    //       Type: checkerValue.Type,
    //       Position: checkerValue.Position,
    //       Attached: checkerValue.Attached,
    //     })
    //     .then((res) => {
    //       console.log("res", res.statusText);
    //       if (res.statusText === "OK") {
    //         rt2 = true;
    //       } else {
    //         rt2 = false;
    //       }
    //     });
    //   console.log("rt1,rt2", rt1, rt2);
    //   if (rt1 === true && rt2 === true) {
    //     Modal.success({
    //       content: `저장 성공!`,
    //     });
    //   } else {
    //     Modal.error({
    //       content: `저장 실패!`,
    //     });
    //   }
  };

  const handleCancelchecker = () => {
    setIsModalOpenChecker(false);
  };

  const showModalActor = () => {
    setIsModalOpenActor(true);
  };
  const handleOkActor = async () => {
    setIsModalOpenActor(false);
    changeActorInfo(actormodalinfo);
    let actorValue = JSON.stringify(actorinfo);
    actorValue = actorValue.replaceAll('"', "`");
    let rt1 = false;
    let rt2 = false;
    axios
      .put("http://localhost:4000/settingitems/", {
        Name: "EOperator",
        Value: actorValue,
      })
      .then((res) => {
        console.log("res", res.statusText);

        if (res.statusText === "OK") {
          rt1 = true;
          Modal.success({
            content: `저장 성공!`,
          });
        } else {
          rt1 = false;
          Modal.error({
            content: `저장 실패!`,
          });
        }
      });

    actorValue = actorValue.replaceAll("`", '"');
    actorValue = JSON.parse(actorValue);

    //   await axios
    //     .post("http://localhost:4000/operatoritems/", {
    //       Name: actorValue.Name,
    //       Phone: actorValue.Phone,
    //       Type: actorValue.Type,
    //       Position: actorValue.Position,
    //       Attached: actorValue.Attached,
    //     })
    //     .then((res) => {
    //       console.log("res", res.statusText);
    //       if (res.statusText === "OK") {
    //         rt2 = true;
    //       } else {
    //         rt2 = false;
    //       }
    //     });
    //   console.log("rt1,rt2", rt1, rt2);
    //   if (rt1 === true && rt2 === true) {
    //     Modal.success({
    //       content: `저장 성공!`,
    //     });
    //   } else {
    //     Modal.error({
    //       content: `저장 실패!`,
    //     });
    //   }
  };
  const handleCancelActor = () => {
    setIsModalOpenActor(false);
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "end" }}>
        <Input
          className="input"
          placeholder="차량 번호"
          value={carmodalinfo.Number}
          onChange={onChangeCarNum}
        />
        <Button onClick={carShowModal}>조회</Button>
        <Modal
          style={{ height: "300px" }}
          title=""
          open={isModalOpenCar}
          onOk={carHandleOk}
          onCancel={carHandleCancel}
        >
          <CarButtonViewContainer />
        </Modal>

        <Button>삭제</Button>
        <Button>N</Button>
      </div>
      <Input
        className="input"
        placeholder="차량 목적"
        value={carmodalinfo.Purpose}
        onChange={onChangePurpose}
      />
      <Input
        className="input"
        placeholder="등록 번호"
        value={carmodalinfo.RegNum}
        onChange={onChangeRegNum}
      />
      <Input
        className="input"
        placeholder="GPS 번호"
        value={carmodalinfo.GpsNum}
        onChange={onChangeGpsnum}
      />
      <Input
        className="input"
        placeholder="차주 성명"
        value={carmodalinfo.Owner}
        onChange={onChangeOwner}
      />
      <Input
        className="input"
        placeholder="주소"
        value={carmodalinfo.Address}
        onChange={onChangeAddr}
      />
      <Input
        className="input"
        placeholder="연락처"
        value={carmodalinfo.Phone}
        onChange={onChangePhone}
      />
      <Row>
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <Input
            className="input"
            value={carmodalinfo.SPoint}
            placeholder="출발지"
            onChange={onChangeFrom}
          />
        </Col>

        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <Input
            className="input"
            placeholder="목적지"
            value={carmodalinfo.EPoint}
            onChange={onChangeTo}
          />
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
            <CheckerButtonViewContainer />
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
            <ActorButtonViewContainer />
          </Modal>
        </Col>
      </Row>
    </div>
  );
}
