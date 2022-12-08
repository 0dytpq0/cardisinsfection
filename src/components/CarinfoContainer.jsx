import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Col, Row } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useInfo } from "../store";
import ButtonContainer from "./ButtonContainer";
import ButtonContainerArea from "./ButtonContainerArea";
import CheckerButtonViewContainer from "./CheckerButtonViewContainer";
import ActorButtonViewContainer from "./ActorButtonViewContainer";
import CarButtonViewContainer from "./CarButtonViewContainer";
import axios from "axios";
import { client } from "../App";

export default function CarinfoContainer() {
  const {
    waitingcar,
    changeWaitingCar,
    changeCarInfo,
    carinfo,
    carmodalinfo,
    areainfo,
    checkerinfo,
    actorinfo,
    checkermodalinfo,
    changeCheckerInfo,
    actormodalinfo,
    changeActorInfo,
    changeCarModalInfo,
    waitingcurrentnumber,
  } = useInfo((state) => state);
  const [isModalOpenCar, setIsModalOpenCar] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenChecker, setIsModalOpenChecker] = useState(false);
  const [isModalOpenActor, setIsModalOpenActor] = useState(false);
  const [carInfoData, setCarInfoData] = useState("");

  useEffect(() => {
    let Number = "";
    let sql = "";
    Number = waitingcurrentnumber;
    if (Number !== "") {
      sql = `http://localhost:4000/carinfoitemsallDate?Number=${Number}`;
    }
    axios.get(sql).then((res, error) => {
      if (error) {
        console.log("error :>> ", error);
      }
      console.log("res.data :>> ", res.data);
      let data = res?.data[0];
      if (res?.data.length > 0) {
        setCarInfoData({
          Number: `${data?.Number}`,
          Address: `${data?.Address}`,
          RegNumber: `${data?.RegNumber}`,
          Phone: `${data?.Phone}`,
          GpsNumber: `${data?.GpsNumber}`,
          Owner: `${data?.Owner}`,
          SPoint: `${data?.SPoint}`,
          Purpose: `${data?.Purpose}`,
          EPoint: `${data?.EPoint}`,
        });
        changeCarModalInfo({
          Number: `${data?.Number}`,
          Address: `${data?.Address}`,
          RegNumber: `${data?.RegNumber}`,
          Phone: `${data?.Phone}`,
          GpsNumber: `${data?.GpsNumber}`,
          Owner: `${data?.Owner}`,
          SPoint: `${data?.SPoint}`,
          Purpose: `${data?.Purpose}`,
          EPoint: `${data?.EPoint}`,
        });
        changeCarInfo({
          Number: `${data?.Number}`,
          Address: `${data?.Address}`,
          RegNumber: `${data?.RegNumber}`,
          Phone: `${data?.Phone}`,
          GpsNumber: `${data?.GpsNumber}`,
          Owner: `${data?.Owner}`,
          SPoint: `${data?.SPoint}`,
          Purpose: `${data?.Purpose}`,
          EPoint: `${data?.EPoint}`,
        });
      } else {
        setCarInfoData({
          Number: "",
          Address: "",
          RegNumber: "",
          Phone: "",
          GpsNumber: "",
          Owner: "",
          SPoint: "",
          Purpose: "",
          EPoint: "",
        });
        changeCarModalInfo({
          Number: "",
          Address: "",
          RegNumber: "",
          Phone: "",
          GpsNumber: "",
          Owner: "",
          SPoint: "",
          Purpose: "",
          EPoint: "",
        });
        changeCarInfo({
          Number: "",
          Address: "",
          RegNumber: "",
          Phone: "",
          GpsNumber: "",
          Owner: "",
          SPoint: "",
          Purpose: "",
          EPoint: "",
        });
      }
    });
  }, [waitingcurrentnumber]);
  const onChangeCarNum = (e) => {
    changeCarInfo({ ...carmodalinfo, Number: e.target.value });
    changeCarModalInfo({ ...carmodalinfo, Number: e.target.value });
    setCarInfoData({ ...carInfoData, Number: e.target.value });
  };
  const onChangePurpose = (e) => {
    changeCarInfo({ ...carmodalinfo, Purpose: e.target.value });
    changeCarModalInfo({ ...carmodalinfo, Purpose: e.target.value });
    setCarInfoData({ ...carInfoData, Purpose: e.target.value });
  };
  const onChangeRegNum = (e) => {
    changeCarInfo({ ...carmodalinfo, RegNumber: e.target.value });
    changeCarModalInfo({ ...carmodalinfo, RegNumber: e.target.value });
    setCarInfoData({ ...carInfoData, RegNumber: e.target.value });
  };
  const onChangeGpsnum = (e) => {
    changeCarInfo({ ...carmodalinfo, GpsNumber: e.target.value });
    changeCarModalInfo({ ...carmodalinfo, GpsNumber: e.target.value });
    setCarInfoData({ ...carInfoData, GpsNumber: e.target.value });
  };
  const onChangeOwner = (e) => {
    changeCarInfo({ ...carmodalinfo, Owner: e.target.value });
    changeCarModalInfo({ ...carmodalinfo, Owner: e.target.value });
    setCarInfoData({ ...carInfoData, Owner: e.target.value });
  };
  const onChangeAddr = (e) => {
    changeCarInfo({
      ...carmodalinfo,
      Address: e.target.value,
    });
    changeCarModalInfo({ ...carmodalinfo, Address: e.target.value });
    setCarInfoData({ ...carInfoData, Address: e.target.value });
  };
  const onChangePhone = (e) => {
    changeCarInfo({ ...carmodalinfo, Phone: e.target.value });
    changeCarModalInfo({
      ...carmodalinfo,
      Phone: e.target.value,
    });
    setCarInfoData({ ...carInfoData, Phone: e.target.value });
  };
  const onChangeFrom = (e) => {
    changeCarInfo({ ...carmodalinfo, SPoint: e.target.value });
    changeCarModalInfo({
      ...carmodalinfo,
      SPoint: e.target.value,
    });
    setCarInfoData({ ...carInfoData, SPoint: e.target.value });
  };
  const onChangeTo = (e) => {
    changeCarInfo({ ...carmodalinfo, EPoint: e.target.value });
    changeCarModalInfo({
      ...carmodalinfo,
      EPoint: e.target.value,
    });
    setCarInfoData({ ...carInfoData, EPoint: e.target.value });
  };

  const carShowModal = () => {
    setIsModalOpenCar(true);
  };

  const carHandleOk = () => {
    setIsModalOpenCar(false);
    changeCarInfo(carmodalinfo);
    setCarInfoData(carmodalinfo);
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
        <label>
          차량 번호
          <Input
            className="input input_carnum"
            placeholder="차량 번호"
            value={carInfoData?.Number}
            onChange={onChangeCarNum}
          />
        </label>
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

        {/* <Button>삭제</Button> */}
        <Button>N</Button>
      </div>
      <label>
        차량 목적
        <Input
          className="input input_purpose"
          placeholder="차량 목적"
          value={carInfoData?.Purpose}
          onChange={onChangePurpose}
        />
      </label>
      <label>
        등록 번호
        <Input
          className="input input_regnum"
          placeholder="등록 번호"
          value={carInfoData?.RegNum}
          onChange={onChangeRegNum}
        />
      </label>
      <label>
        GPS 번호
        <Input
          className="input input_gpsnum"
          placeholder="GPS 번호"
          value={carInfoData?.GpsNum}
          onChange={onChangeGpsnum}
        />
      </label>
      <label>
        차주 성명
        <Input
          className="input input_owner"
          placeholder="차주 성명"
          value={carInfoData?.Owner}
          onChange={onChangeOwner}
        />
      </label>
      <label>
        주소
        <Input
          className="input input_address"
          placeholder="주소"
          value={carInfoData?.Address}
          onChange={onChangeAddr}
        />
      </label>
      <label>
        연락처
        <Input
          className="input input_phone"
          placeholder="연락처"
          value={carInfoData?.Phone}
          onChange={onChangePhone}
        />
      </label>

      <Row wrap={false} style={{ display: "flex", alignItems: "center" }}>
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <label>
            출발지
            <Input
              className="input input_spoint"
              value={carInfoData?.SPoint}
              placeholder="출발지"
              onChange={onChangeFrom}
            />
          </label>
        </Col>
        <ArrowRightOutlined />
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <label>
            목적지
            <Input
              className="input input_epoint"
              placeholder="목적지"
              value={carInfoData?.EPoint}
              onChange={onChangeTo}
            />
          </label>
        </Col>
      </Row>
      <Row className="buttons" wrap={false} gutter={8}>
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
