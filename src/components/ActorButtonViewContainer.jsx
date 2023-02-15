import React, { useEffect } from 'react';
import { Input } from 'antd';
import { useInfo } from '../store';
import axios from 'axios';
import ActorButtonContainer from './ActorButtonContainer';

const ActorButtonViewContainer = ({ dbClick }) => {
  const { ZactorModalInfo, ZsetActorModalInfo } = useInfo();

  //기본 세팅 값에서 E타입 근무자들을 불러온다.
  useEffect(() => {
    axios
      .get(`http://localhost:4000/settingitems?Name=EOperator`)
      .then((response) => {
        let data = response.data[0].Value;
        data = data.replaceAll('`', '"');
        let parsedValue = JSON.parse(data);
        ZsetActorModalInfo(parsedValue);
      });
  }, []);

  //인풋창 정보 입력시 zustand에 저장
  const onChangeActorAttached = (e) => {
    ZsetActorModalInfo({ ...ZactorModalInfo, Attached: e.target.value });
  };
  const onChangeActorPosition = (e) => {
    ZsetActorModalInfo({ ...ZactorModalInfo, Position: e.target.value });
  };
  const onChangeActorName = (e) => {
    ZsetActorModalInfo({ ...ZactorModalInfo, Name: e.target.value });
  };
  const onChangeActorPhone = (e) => {
    ZsetActorModalInfo({ ...ZactorModalInfo, Phone: e.target.value });
  };

  return (
    <div>
      <ActorButtonContainer
        dbClick={dbClick}
        title={'실시자 정보'}
      ></ActorButtonContainer>
      <Input
        onChange={onChangeActorAttached}
        className='input'
        value={ZactorModalInfo.Attached}
        placeholder='소속'
      />
      <Input
        onChange={onChangeActorPosition}
        className='input'
        value={ZactorModalInfo.Position}
        placeholder='직급'
      />
      <Input
        onChange={onChangeActorName}
        className='input'
        value={ZactorModalInfo.Name}
        placeholder='성명'
      />
      <Input
        onChange={onChangeActorPhone}
        className='input'
        value={ZactorModalInfo.Phone}
        placeholder='연락처'
      />
    </div>
  );
};

export default ActorButtonViewContainer;
