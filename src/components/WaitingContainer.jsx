import React from 'react';
import '../App.css';
import { useInfo, useWaitingCar } from '../store';
import { Col, Row, Layout, Button } from 'antd';
import AutoButton from './AutoSwitch';
//대기저장 헤더
function WaitingContainer({ title, children, span }) {
  const { Header } = Layout;
  const {
    ZsetWaitingCar,
    ZdeleteWaitingCar,
    ZsetCarInfoData,
    ZsetWaitingCurrentNumber,
    ZcarInfoData,
  } = useInfo();
  const { ZsetTrashWaitingCar, ZtrashWaitingCar } = useWaitingCar();

  const onClickClear = () => {
    ZsetWaitingCar([]);
    ZsetTrashWaitingCar([]);
  };
  const onClickDeleteButton = () => {
    let arr = [];
    let arr2 = [];
    arr = ZtrashWaitingCar;
    arr.map((item, idx) =>
      item !== ZdeleteWaitingCar ? arr2.push(item) : null
    );
    ZsetTrashWaitingCar(arr2);
    ZsetCarInfoData({ ...ZcarInfoData, Number: ZtrashWaitingCar[0].Number });
    ZsetWaitingCar(ZtrashWaitingCar);
    ZsetWaitingCurrentNumber(arr2[0]);
  };

  return (
    <>
      <Col span={span} style={{ height: '50vh' }}>
        <Header className='header'>
          {title}
          <Button size='small' onClick={onClickDeleteButton}>
            삭제
          </Button>
          <Button size='small' onClick={onClickClear}>
            Clear
          </Button>
        </Header>

        <Col>{children}</Col>
      </Col>
    </>
  );
}

export default WaitingContainer;
