import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { useInfo } from "../store";
import axios from "axios";
import ActorButtonContainer from "./ActorButtonContainer";

const ButtonContainerActor = () => {
  const { actorinfo, changeActorInfo } = useInfo();
  const [attached, setAttached] = useState("");
  const [position, setPosition] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:4000/settingitems?Name=EOperator`)
      .then((response) => {
        let data = response.data[0].Value;
        data = data.replaceAll("`", '"');
        let parsedValue = JSON.parse(data);
        setAttached(parsedValue?.Attached);
        setPosition(parsedValue?.Position);
        setName(parsedValue?.Name);
        setPhone(parsedValue?.Phone);
        changeActorInfo(parsedValue);
      });
  }, []);

  const onChangeActorAttached = (e) => {
    setAttached(e.target.value);
    changeActorInfo({ ...actorinfo, Attached: e.target.value });
  };
  const onChangeActorPosition = (e) => {
    setPosition(e.target.value);

    changeActorInfo({ ...actorinfo, Position: e.target.value });
  };
  const onChangeActorName = (e) => {
    setName(e.target.value);

    changeActorInfo({ ...actorinfo, Name: e.target.value });
  };
  const onChangeActorPhone = (e) => {
    setPhone(e.target.value);

    changeActorInfo({ ...actorinfo, Phone: e.target.value });
  };

  return (
    <div>
      <ActorButtonContainer title={"실시자 정보"}></ActorButtonContainer>
      <Input
        onChange={onChangeActorAttached}
        className="input"
        value={actorinfo.Attached}
        placeholder="소속"
      />
      <Input
        onChange={onChangeActorPosition}
        className="input"
        value={actorinfo.Position}
        placeholder="직급"
      />
      <Input
        onChange={onChangeActorName}
        className="input"
        value={actorinfo.Name}
        placeholder="성명"
      />
      <Input
        onChange={onChangeActorPhone}
        className="input"
        value={actorinfo.Phone}
        placeholder="연락처"
      />
    </div>
  );
};

export default ButtonContainerActor;
