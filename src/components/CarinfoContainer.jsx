import React from "react";
import { Button, Input, Col, Row } from "antd";
import { useInfo } from "../store";

export default function CarinfoContainer() {
  const { changeCarInfo, carinfo } = useInfo((state) => state);

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
  console.log("carinfo", carinfo);
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
          <Button>지역 정보</Button>
        </Col>
        <Col>
          <Button>확인자 정보</Button>
        </Col>
        <Col>
          <Button>실시자 정보</Button>
        </Col>
      </Row>
    </div>
  );
}
