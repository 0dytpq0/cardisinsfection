import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { useInfo } from "../store";
import axios from "axios";
import ButtonContainer from "./ButtonContainer";
import ReferButtonContainer from "./ReferButtonContainer";

const ButtonContainerChecker = () => {
  const { changeCheckerInfo, checkerinfo } = useInfo();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/settingitems?Name=COperator`)
      .then((response) => {
        let data = response.data[0].Value;
        data = data.replaceAll("`", '"');
        let parsedValue = JSON.parse(data);
        changeCheckerInfo(parsedValue);
      });
  }, []);
  const onChangeAttached = (e) => {
    changeCheckerInfo({ ...checkerinfo, Attached: e.target.value });
  };
  const onChangecheckerPosition = (e) => {
    changeCheckerInfo({ ...checkerinfo, Position: e.target.value });
  };
  const onChangeCheckerName = (e) => {
    changeCheckerInfo({ ...checkerinfo, Name: e.target.value });
  };
  const onChangecheckerPhone = (e) => {
    changeCheckerInfo({ ...checkerinfo, Phone: e.target.value });
  };

  return (
    <div>
      <ButtonContainer title={"확인자 정보"}>
        <Input
          onChange={onChangeAttached}
          className="input"
          value={checkerinfo.Attached}
          placeholder="소속"
        />{" "}
        <Input
          onChange={onChangecheckerPosition}
          className="input"
          value={checkerinfo.Position}
          placeholder="직급"
        />{" "}
        <Input
          onChange={onChangeCheckerName}
          className="input"
          value={checkerinfo.Name}
          placeholder="성명"
        />
        <Input
          onChange={onChangecheckerPhone}
          className="input"
          value={checkerinfo.Phone}
          placeholder="연락처"
        />
      </ButtonContainer>
    </div>
  );
};

export default ButtonContainerChecker;
