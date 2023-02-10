import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import { useInfo } from '../store';
import axios from 'axios';
import CheckerButtonContainer from './CheckerButtonContainer';
//확인자 정보 input창
const CheckerButtonViewContainer = () => {
  const {
    ZsetCheckerInfo,
    ZcheckerInfo,
    ZcheckerModalInfo,
    ZsetCheckerModalInfo,
  } = useInfo();

  useEffect(() => {
    //C타입 근무자 setting값 불러오기
    axios
      .get(`http://localhost:4000/settingitems?Name=COperator`)
      .then((response) => {
        let data = response.data[0].Value;
        data = data.replaceAll('`', '"');
        let parsedValue = JSON.parse(data);
        ZsetCheckerInfo(parsedValue);
      });
  }, []);
  //input 입력시 변화
  const onChangeAttached = (e) => {
    ZsetCheckerModalInfo({ ...ZcheckerModalInfo, Attached: e.target.value });
  };
  const onChangecheckerPosition = (e) => {
    ZsetCheckerModalInfo({ ...ZcheckerModalInfo, Position: e.target.value });
  };
  const onChangeCheckerName = (e) => {
    ZsetCheckerModalInfo({ ...ZcheckerModalInfo, Name: e.target.value });
  };
  const onChangecheckerPhone = (e) => {
    ZsetCheckerModalInfo({ ...ZcheckerModalInfo, Phone: e.target.value });
  };

  return (
    <div>
      <CheckerButtonContainer title={'확인자 정보'}></CheckerButtonContainer>
      <Input
        onChange={onChangeAttached}
        className='input'
        value={ZcheckerModalInfo.Attached}
        placeholder='소속'
      />{' '}
      <Input
        onChange={onChangecheckerPosition}
        className='input'
        value={ZcheckerModalInfo.Position}
        placeholder='직급'
      />{' '}
      <Input
        onChange={onChangeCheckerName}
        className='input'
        value={ZcheckerModalInfo.Name}
        placeholder='성명'
      />
      <Input
        onChange={onChangecheckerPhone}
        className='input'
        value={ZcheckerModalInfo.Phone}
        placeholder='연락처'
      />
    </div>
  );
};

export default CheckerButtonViewContainer;
