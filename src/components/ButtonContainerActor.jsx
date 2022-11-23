import React from "react";
import { Input } from "antd";
import { useInfo } from "../store";

const ButtonContainerActor = () => {
  const { carinfo, changeCarInfo } = useInfo();
  const onChangeActorTeam = (e) => {
    changeCarInfo({ ...carinfo, Actorteam: e.target.value });
  };
  const onChangeActorRank = (e) => {
    changeCarInfo({ ...carinfo, Actorrank: e.target.value });
  };
  const onChangeActorName = (e) => {
    changeCarInfo({ ...carinfo, Actorname: e.target.value });
  };
  const onChangeActorPhone = (e) => {
    changeCarInfo({ ...carinfo, Actorphone: e.target.value });
  };

  return (
    <div>
      <Input
        onChange={onChangeActorTeam}
        className="input"
        placeholder="소속"
      />{" "}
      <Input
        onChange={onChangeActorRank}
        className="input"
        placeholder="직급"
      />{" "}
      <Input
        onChange={onChangeActorName}
        className="input"
        placeholder="성명"
      />
      <Input
        onChange={onChangeActorPhone}
        className="input"
        placeholder="연락처"
      />
    </div>
  );
};

export default ButtonContainerActor;
