import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { useInfo } from "../store";
import axios from "axios";
import CarButtonContainer from "./CarButtonContainer";

const CarButtonViewContainer = () => {
  const { carinfo, changeCarInfo, carmodalinfo, changeCarModalInfo } =
    useInfo();
  const onChangeCarNumber = (e) => {
    changeCarModalInfo({ ...carmodalinfo, Number: e.target.value });
  };
  const onChangeCarOwner = (e) => {
    changeCarModalInfo({ ...carmodalinfo, Owner: e.target.value });
  };
  const onChangeCarPurpose = (e) => {
    changeCarModalInfo({ ...carmodalinfo, Purpose: e.target.value });
  };
  const onChangeCarRegNumber = (e) => {
    changeCarModalInfo({ ...carmodalinfo, RegNumber: e.target.value });
  };
  const onChangeCarGpsNumber = (e) => {
    changeCarModalInfo({ ...carmodalinfo, GpsNumber: e.target.value });
  };
  const onChangeCarAddress = (e) => {
    changeCarModalInfo({ ...carmodalinfo, Address: e.target.value });
  };
  const onChangeCarPhone = (e) => {
    changeCarModalInfo({ ...carmodalinfo, Phone: e.target.value });
  };
  const onChangeCarEPoint = (e) => {
    changeCarModalInfo({ ...carmodalinfo, EPoint: e.target.value });
  };
  const onChangeCarSPoint = (e) => {
    changeCarModalInfo({ ...carmodalinfo, SPoint: e.target.value });
  };
  return (
    <div>
      <CarButtonContainer title={"출입자 정보"}></CarButtonContainer>
      <Input
        onChange={onChangeCarNumber}
        className="input"
        value={carmodalinfo.Number}
        placeholder="차량 번호"
      />
      <Input
        onChange={onChangeCarPurpose}
        className="input"
        value={carmodalinfo.Purpose}
        placeholder="목적"
      />
      <Input
        onChange={onChangeCarRegNumber}
        className="input"
        value={carmodalinfo.RegNumber}
        placeholder="등록번호"
      />
      <Input
        onChange={onChangeCarGpsNumber}
        className="input"
        value={carmodalinfo.GpsNumber}
        placeholder="GPS번호"
      />
      <Input
        onChange={onChangeCarOwner}
        className="input"
        value={carmodalinfo.Owner}
        placeholder="출입자"
      />

      <Input
        onChange={onChangeCarAddress}
        className="input"
        value={carmodalinfo.Address}
        placeholder="주소"
      />
      <Input
        onChange={onChangeCarPhone}
        className="input"
        value={carmodalinfo.Phone}
        placeholder="연락처"
      />
      <Input
        onChange={onChangeCarSPoint}
        className="input"
        value={carmodalinfo.SPoint}
        placeholder="출발지"
      />
      <Input
        onChange={onChangeCarEPoint}
        className="input"
        value={carmodalinfo.EPoint}
        placeholder="도착지"
      />
    </div>
  );
};

export default CarButtonViewContainer;
