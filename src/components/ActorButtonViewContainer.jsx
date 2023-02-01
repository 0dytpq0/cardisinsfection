import React, { useEffect } from 'react';
import { Input } from 'antd';
import { useInfo } from '../store';
import axios from 'axios';
import ActorButtonContainer from './ActorButtonContainer';

const ActorButtonViewContainer = () => {
  const { actormodalinfo, changeActorModalInfo } = useInfo();

  //기본 세팅 값에서 E타입 근무자들을 불러온다.
  useEffect(() => {
    axios
      .get(`http://localhost:4000/settingitems?Name=EOperator`)
      .then((response) => {
        let data = response.data[0].Value;
        data = data.replaceAll('`', '"');
        let parsedValue = JSON.parse(data);
        changeActorModalInfo(parsedValue);
      });
  }, []);

  //인풋창 정보 입력시 zustand에 저장
  const onChangeActorAttached = (e) => {
    changeActorModalInfo({ ...actormodalinfo, Attached: e.target.value });
  };
  const onChangeActorPosition = (e) => {
    changeActorModalInfo({ ...actormodalinfo, Position: e.target.value });
  };
  const onChangeActorName = (e) => {
    changeActorModalInfo({ ...actormodalinfo, Name: e.target.value });
  };
  const onChangeActorPhone = (e) => {
    changeActorModalInfo({ ...actormodalinfo, Phone: e.target.value });
  };

  return (
    <div>
      <ActorButtonContainer title={'실시자 정보'}></ActorButtonContainer>
      <Input
        onChange={onChangeActorAttached}
        className='input'
        value={actormodalinfo.Attached}
        placeholder='소속'
      />
      <Input
        onChange={onChangeActorPosition}
        className='input'
        value={actormodalinfo.Position}
        placeholder='직급'
      />
      <Input
        onChange={onChangeActorName}
        className='input'
        value={actormodalinfo.Name}
        placeholder='성명'
      />
      <Input
        onChange={onChangeActorPhone}
        className='input'
        value={actormodalinfo.Phone}
        placeholder='연락처'
      />
    </div>
  );
};

export default ActorButtonViewContainer;
