import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { useInfo } from "../store";
import axios from "axios";
import ActorButtonContainer from "./ActorButtonContainer";

const ActorButtonViewContainer = () => {
  const { actorinfo, changeActorInfo, actormodalinfo, changeActorModalInfo } =
    useInfo();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/settingitems?Name=EOperator`)
      .then((response) => {
        let data = response.data[0].Value;
        data = data.replaceAll("`", '"');
        let parsedValue = JSON.parse(data);
        changeActorModalInfo(parsedValue);
      });
  }, []);

  const onChangeActorAttached = (e) => {
    changeActorInfo({ ...actorinfo, Attached: e.target.value });
  };
  const onChangeActorPosition = (e) => {
    changeActorInfo({ ...actorinfo, Position: e.target.value });
  };
  const onChangeActorName = (e) => {
    changeActorInfo({ ...actorinfo, Name: e.target.value });
  };
  const onChangeActorPhone = (e) => {
    changeActorInfo({ ...actorinfo, Phone: e.target.value });
  };

  return (
    <div>
      <ActorButtonContainer title={"실시자 정보"}></ActorButtonContainer>
      <Input
        onChange={onChangeActorAttached}
        className="input"
        value={actormodalinfo.Attached}
        placeholder="소속"
      />
      <Input
        onChange={onChangeActorPosition}
        className="input"
        value={actormodalinfo.Position}
        placeholder="직급"
      />
      <Input
        onChange={onChangeActorName}
        className="input"
        value={actormodalinfo.Name}
        placeholder="성명"
      />
      <Input
        onChange={onChangeActorPhone}
        className="input"
        value={actormodalinfo.Phone}
        placeholder="연락처"
      />
    </div>
  );
};

export default ActorButtonViewContainer;
