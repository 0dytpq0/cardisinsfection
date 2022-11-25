import React, { useState } from "react";
import { Modal, Button, Input, Col, Row } from "antd";
import { useInfo } from "../store";
import ButtonContainer from "./ButtonContainer";
import ButtonContainerArea from "./ButtonContainerArea";
import ButtonContainerChecker from "./ButtonContainerChecker";
import ButtonContainerActor from "./ButtonContainerActor";
import axios from "axios";

export default function CarinfoContainer() {
  const { changeCarInfo, carinfo, areainfo, checkerinfo, actorinfo } = useInfo(
    (state) => state
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenChecker, setIsModalOpenChecker] = useState(false);
  const [isModalOpenActor, setIsModalOpenActor] = useState(false);

  const onChangeCarNum = (e) => {
    changeCarInfo({ ...carinfo, carnum: e.target.value });
  };
  const onChangePurpose = (e) => {
    changeCarInfo({ ...carinfo, purpose: e.target.value });
  };
  const onChangeRegNum = (e) => {
    changeCarInfo({ ...carinfo, regnum: e.target.value });
  };
  const onChangeGpsnum = (e) => {
    changeCarInfo({ ...carinfo, gpsnum: e.target.value });
  };
  const onChangeOwner = (e) => {
    changeCarInfo({ ...carinfo, owner: e.target.value });
  };
  const onChangeAddr = (e) => {
    changeCarInfo({ ...carinfo, addr: e.target.value });
  };
  const onChangePhone = (e) => {
    changeCarInfo({ ...carinfo, phone: e.target.value });
  };
  const onChangeFrom = (e) => {
    changeCarInfo({ ...carinfo, from: e.target.value });
  };
  const onChangeTo = (e) => {
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
  const handleOkchecker = async () => {
    setIsModalOpenChecker(false);
    let checkerValue = JSON.stringify(checkerinfo);
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
        } else {
          rt1 = false;
        }
      });

    checkerValue = checkerValue.replaceAll("`", '"');
    checkerValue = JSON.parse(checkerValue);

    await axios
      .post("http://localhost:4000/operatoritems/", {
        Name: checkerValue.Name,
        Phone: checkerValue.Phone,
        Type: checkerValue.Type,
        Position: checkerValue.Position,
        Attached: checkerValue.Attached,
      })
      .then((res) => {
        console.log("res", res.statusText);
        if (res.statusText === "OK") {
          rt2 = true;
        } else {
          rt2 = false;
        }
      });
    console.log("rt1,rt2", rt1, rt2);
    if (rt1 === true && rt2 === true) {
      Modal.success({
        content: `저장 성공!`,
      });
    } else {
      Modal.error({
        content: `저장 실패!`,
      });
    }
  };

  const handleCancelchecker = () => {
    setIsModalOpenChecker(false);
  };

  const showModalActor = () => {
    setIsModalOpenActor(true);
  };
  const handleOkActor = async () => {
    setIsModalOpenActor(false);
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
        } else {
          rt1 = false;
        }
      });

    actorValue = actorValue.replaceAll("`", '"');
    actorValue = JSON.parse(actorValue);

    await axios
      .post("http://localhost:4000/operatoritems/", {
        Name: actorValue.Name,
        Phone: actorValue.Phone,
        Type: actorValue.Type,
        Position: actorValue.Position,
        Attached: actorValue.Attached,
      })
      .then((res) => {
        console.log("res", res.statusText);
        if (res.statusText === "OK") {
          rt2 = true;
        } else {
          rt2 = false;
        }
      });
    console.log("rt1,rt2", rt1, rt2);
    if (rt1 === true && rt2 === true) {
      Modal.success({
        content: `저장 성공!`,
      });
    } else {
      Modal.error({
        content: `저장 실패!`,
      });
    }
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
            <ButtonContainerChecker />
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
            <ButtonContainerActor />
          </Modal>
        </Col>
      </Row>
    </div>
  );
}
