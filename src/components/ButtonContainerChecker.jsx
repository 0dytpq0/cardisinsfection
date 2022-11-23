import React from "react";
import { Input } from "antd";
import { useInfo } from "../store";

const ButtonContainerChecker = () => {
  const { carinfo, changeCarInfo } = useInfo();
  const onChangecheckerteam = (e) => {
    changeCarInfo({ ...carinfo, checkerteam: e.target.value });
  };
  const onChangecheckerrank = (e) => {
    changeCarInfo({ ...carinfo, checkerrank: e.target.value });
  };
  const onChangeCheckerName = (e) => {
    changeCarInfo({ ...carinfo, checkername: e.target.value });
  };
  const onChangecheckerPhone = (e) => {
    changeCarInfo({ ...carinfo, checkerphone: e.target.value });
  };

  return (
    <div>
      <Input
        onChange={onChangecheckerteam}
        className="input"
        placeholder="소속"
      />{" "}
      <Input
        onChange={onChangecheckerrank}
        className="input"
        placeholder="직급"
      />{" "}
      <Input
        onChange={onChangeCheckerName}
        className="input"
        placeholder="성명"
      />
      <Input
        onChange={onChangecheckerPhone}
        className="input"
        placeholder="연락처"
      />
    </div>
  );
};

export default ButtonContainerChecker;
