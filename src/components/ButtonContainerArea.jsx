import React, { useState, useEffect } from "react";
import { Alert, Checkbox, Input, Col, Row } from "antd";
import { useInfo } from "../store";
import axios from "axios";

const ButtonContainerArea = () => {
  const { carinfo, changeCarInfo, areainfo, changeAreaInfo } = useInfo();
  const [origin, setOrigin] = useState(false);
  const [protect, setProtect] = useState(false);
  const [quarantine, setQuarantine] = useState(true);
  const [wildAnimal, setWildAnimal] = useState(false);
  const [area, setArea] = useState("");
  const [pointName, setPointName] = useState("");
  const [dContent, setDContent] = useState("");
  useEffect(() => {
    axios
      .get(`http://localhost:4000/settingitems?Name=DeliverProof`)
      .then((response) => {
        let data = response.data[0].Value;
        data = data.replaceAll("`", '"');
        let parsedValue = JSON.parse(data);
        setArea(parsedValue?.Area);
        setPointName(parsedValue?.PointName);
        setDContent(parsedValue?.DContent);
        changeAreaInfo(parsedValue);
      });
  }, []);
  console.log("areainfo", areainfo);
  const onChangeOrigin = (e) => {
    setOrigin(true);
    setProtect(false);
    setQuarantine(false);
    setWildAnimal(false);
    console.log("origin", origin);
  };
  const onChangeProtect = (e) => {
    setOrigin(false);
    setProtect(true);
    setQuarantine(false);
    setWildAnimal(false);
  };
  const onChangeQuarantine = (e) => {
    setOrigin(false);
    setProtect(false);
    setQuarantine(true);
    setWildAnimal(false);
  };
  const onChangeWildAnimal = (e) => {
    setOrigin(false);
    setProtect(false);
    setQuarantine(false);
    setWildAnimal(true);
  };

  const onChangeArea = (e) => {
    setArea(e.target.value);
    changeAreaInfo({ ...areainfo, Area: e.target.value });
    changeCarInfo({ ...carinfo, Area: e.target.value });
  };
  const onChangePointName = (e) => {
    setPointName(e.target.value);
    changeAreaInfo({ ...areainfo, PointName: e.target.value });
    changeCarInfo({ ...carinfo, PointName: e.target.value });
  };
  const onChangeDContent = (e) => {
    setDContent(e.target.value);
    changeAreaInfo({ ...areainfo, DContent: e.target.value });
    changeCarInfo({ ...carinfo, DContent: e.target.value });
  };
  return (
    <div>
      <Checkbox checked={origin} onChange={onChangeOrigin}>
        발생지
      </Checkbox>
      <Checkbox checked={protect} onChange={onChangeProtect}>
        보호지역
      </Checkbox>
      <Checkbox checked={quarantine} onChange={onChangeQuarantine}>
        예찰지역
      </Checkbox>
      <Checkbox checked={wildAnimal} onChange={onChangeWildAnimal}>
        야생조수류예찰지역
      </Checkbox>
      <Input
        className="input"
        placeholder="소독 지역"
        value={area}
        onChange={onChangeArea}
      />
      <Input
        className="input"
        placeholder="소독 장소명"
        value={pointName}
        onChange={onChangePointName}
      />
      <Input
        className="input"
        placeholder="소독 내용"
        value={dContent}
        onChange={onChangeDContent}
      />
    </div>
  );
};

export default ButtonContainerArea;
