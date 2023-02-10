import React, { useState, useEffect } from 'react';
import { Alert, Checkbox, Input, Col, Row } from 'antd';
import { useInfo } from '../store';
import axios from 'axios';

//지역정보 버튼 클릭시 컨테이너

const ButtonContainerArea = () => {
  const { ZcarInfo, ZsetCarInfo, ZareaInfo, ZsetAreaInfo } = useInfo();
  //지역정보 체크박스
  const [origin, setOrigin] = useState(false);
  const [protect, setProtect] = useState(false);
  const [quarantine, setQuarantine] = useState(true);
  const [wildAnimal, setWildAnimal] = useState(false);
  //지역정보 객체 key
  const [area, setArea] = useState('');
  const [pointName, setPointName] = useState('');
  const [dContent, setDContent] = useState('');
  //세팅값의 지역정보 가져오는 axios
  useEffect(() => {
    axios
      .get(`http://localhost:4000/settingitems?Name=DeliverProof`)
      .then((response) => {
        let data = response.data[0].Value;
        data = data.replaceAll('`', '"');
        let parsedValue = JSON.parse(data);
        setArea(parsedValue?.Area);
        setPointName(parsedValue?.PointName);
        setDContent(parsedValue?.DContent);
        ZsetAreaInfo(parsedValue);
      });
  }, []);
  //checkbox 클릭 함수들
  const onChangeOrigin = (e) => {
    setOrigin(true);
    setProtect(false);
    setQuarantine(false);
    setWildAnimal(false);
    ZsetAreaInfo({ ...ZareaInfo, AreaType: '발생지' });
  };
  const onChangeProtect = (e) => {
    setOrigin(false);
    setProtect(true);
    setQuarantine(false);
    setWildAnimal(false);
    ZsetAreaInfo({ ...ZareaInfo, AreaType: '보호지역' });
  };
  const onChangeQuarantine = (e) => {
    setOrigin(false);
    setProtect(false);
    setQuarantine(true);
    setWildAnimal(false);
    ZsetAreaInfo({ ...ZareaInfo, AreaType: '예찰지역' });
  };
  const onChangeWildAnimal = (e) => {
    setOrigin(false);
    setProtect(false);
    setQuarantine(false);
    setWildAnimal(true);
    ZsetAreaInfo({ ...ZareaInfo, AreaType: '야생조수류예찰지역' });
  };

  //지역정보 input창 입력시 함수들
  const onChangeArea = (e) => {
    setArea(e.target.value);
    ZsetAreaInfo({ ...ZareaInfo, Area: e.target.value });
    ZsetCarInfo({ ...ZcarInfo, Area: e.target.value });
  };
  const onChangePointName = (e) => {
    setPointName(e.target.value);
    ZsetAreaInfo({ ...ZareaInfo, PointName: e.target.value });
    ZsetCarInfo({ ...ZcarInfo, PointName: e.target.value });
  };
  const onChangeDContent = (e) => {
    setDContent(e.target.value);
    ZsetAreaInfo({ ...ZareaInfo, DContent: e.target.value });
    ZsetCarInfo({ ...ZcarInfo, DContent: e.target.value });
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
        className='input'
        placeholder='소독 지역'
        value={area}
        onChange={onChangeArea}
      />
      <Input
        className='input'
        placeholder='소독 장소명'
        value={pointName}
        onChange={onChangePointName}
      />
      <Input
        className='input'
        placeholder='소독 내용'
        value={dContent}
        onChange={onChangeDContent}
      />
    </div>
  );
};

export default ButtonContainerArea;
