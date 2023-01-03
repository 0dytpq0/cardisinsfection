import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import { useInfo } from '../store';
import axios from 'axios';
import CheckerButtonContainer from './CheckerButtonContainer';

const CheckerButtonViewContainer = () => {
  const {
    changeCheckerInfo,
    checkerinfo,
    checkermodalinfo,
    changeCheckerModalInfo,
  } = useInfo();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/settingitems?Name=COperator`)
      .then((response) => {
        let data = response.data[0].Value;
        data = data.replaceAll('`', '"');
        let parsedValue = JSON.parse(data);
        changeCheckerInfo(parsedValue);
      });
  }, []);
  const onChangeAttached = (e) => {
    changeCheckerModalInfo({ ...checkermodalinfo, Attached: e.target.value });
  };
  const onChangecheckerPosition = (e) => {
    changeCheckerModalInfo({ ...checkermodalinfo, Position: e.target.value });
  };
  const onChangeCheckerName = (e) => {
    changeCheckerModalInfo({ ...checkermodalinfo, Name: e.target.value });
  };
  const onChangecheckerPhone = (e) => {
    changeCheckerModalInfo({ ...checkermodalinfo, Phone: e.target.value });
  };

  return (
    <div>
      <CheckerButtonContainer title={'확인자 정보'}></CheckerButtonContainer>
      <Input
        onChange={onChangeAttached}
        className='input'
        value={checkermodalinfo.Attached}
        placeholder='소속'
      />{' '}
      <Input
        onChange={onChangecheckerPosition}
        className='input'
        value={checkermodalinfo.Position}
        placeholder='직급'
      />{' '}
      <Input
        onChange={onChangeCheckerName}
        className='input'
        value={checkermodalinfo.Name}
        placeholder='성명'
      />
      <Input
        onChange={onChangecheckerPhone}
        className='input'
        value={checkermodalinfo.Phone}
        placeholder='연락처'
      />
    </div>
  );
};

export default CheckerButtonViewContainer;
