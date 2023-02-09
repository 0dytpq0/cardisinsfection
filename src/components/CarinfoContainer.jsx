import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, Input, Col, Row } from 'antd';
import { ArrowRightOutlined, FilterFilled } from '@ant-design/icons';
import { useInfo, useWaitingCar, useListData } from '../store';
import ButtonContainer from './ButtonContainer';
import ButtonContainerArea from './ButtonContainerArea';
import CheckerButtonViewContainer from './CheckerButtonViewContainer';
import ActorButtonViewContainer from './ActorButtonViewContainer';
import CarButtonContainer from './CarButtonContainer';
import axios from 'axios';
import moment from 'moment';

import { client } from '../App';
//메인화면 차량정보 표시
export default function CarinfoContainer() {
  const { changeTrashWaitingCar, trashwaitingcar } = useWaitingCar();
  const { listData, changeListData } = useListData();
  const {
    changeWaitingCurrentNumber,
    changeCarInfoData,
    carinfodata,
    deletewaitingcar,
    changeCarInfo,
    waitingcar,
    changeWaitingCar,
    carinfo,
    carmodalinfo,
    areainfo,
    checkermodalinfo,
    changeCheckerInfo,
    actormodalinfo,
    changeActorInfo,
    changeCarModalInfo,
    waitingcurrentnumber,
  } = useInfo((state) => state);
  const [isModalOpenCar, setIsModalOpenCar] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenChecker, setIsModalOpenChecker] = useState(false);
  const [isModalOpenActor, setIsModalOpenActor] = useState(false);

  useEffect(() => {
    //대기저장차량 첫번째에 따라 차량정보 가져오는 곳
    let Number = '';
    let sql = '';
    Number = waitingcurrentnumber;
    if (Number !== '') {
      sql = `http://localhost:4000/carinfoitemsallDate?Number=${Number}`;
    }
    axios.get(sql).then((res, error) => {
      if (error) {
        console.log('error :>> ', error);
      }
      console.log('res.data :>> ', res.data);
      let data = res?.data[0];
      //undefined가 안뜨게 미인식일 시에 값 넣어주는 곳
      if (Number === '미인식') {
        changeCarInfoData({
          PrintIndex: '',
          Number: '',
          Address: '',
          RegNumber: '',
          Phone: '',
          GpsNumber: '',
          Owner: '',
          SPoint: '',
          Purpose: '',
          EPoint: '',
        });

        changeCarInfo({
          PrintIndex: '',
          Number: '',
          Address: '',
          RegNumber: '',
          Phone: '',
          GpsNumber: '',
          Owner: '',
          SPoint: '',
          Purpose: '',
          EPoint: '',
        });
      } else {
        changeCarInfoData({
          PrintIndex: moment().format('YYYYMMDDHHmmss'),
          Number: `${data?.Number}`,
          Address: `${data?.Address}` ?? '',
          RegNumber: `${data?.RegNumber}`,
          Phone: `${data?.Phone}`,
          GpsNumber: `${data?.GpsNumber}`,
          Owner: `${data?.Owner}`,
          SPoint: `${data?.SPoint}`,
          Purpose: `${data?.Purpose}`,
          EPoint: `${data?.EPoint}`,
        });

        changeCarInfo({
          PrintIndex: moment().format('YYYYMMDDHHmmss'),
          Number: `${data?.Number}`,
          Address: `${data?.Address}`,
          RegNumber: `${data?.RegNumber}`,
          Phone: `${data?.Phone}`,
          GpsNumber: `${data?.GpsNumber}`,
          Owner: `${data?.Owner}`,
          SPoint: `${data?.SPoint}`,
          Purpose: `${data?.Purpose}`,
          EPoint: `${data?.EPoint}`,
        });
      }
    });
  }, [waitingcurrentnumber]);
  //차량정보 인풋창 수정
  const onChangeCarNum = (e) => {
    changeCarInfo({ ...carmodalinfo, Number: e.target.value });
    changeCarModalInfo({ ...carmodalinfo, Number: e.target.value });
    changeCarInfoData({ ...carinfodata, Number: e.target.value });
  };
  const onChangePurpose = (e) => {
    changeCarInfo({ ...carmodalinfo, Purpose: e.target.value });
    changeCarModalInfo({ ...carmodalinfo, Purpose: e.target.value });
    changeCarInfoData({ ...carinfodata, Purpose: e.target.value });
  };
  const onChangeRegNum = (e) => {
    changeCarInfo({ ...carmodalinfo, RegNumber: e.target.value });
    changeCarModalInfo({ ...carmodalinfo, RegNumber: e.target.value });
    changeCarInfoData({ ...carinfodata, RegNumber: e.target.value });
  };
  const onChangeGpsnum = (e) => {
    changeCarInfo({ ...carmodalinfo, GpsNumber: e.target.value });
    changeCarModalInfo({ ...carmodalinfo, GpsNumber: e.target.value });
    changeCarInfoData({ ...carinfodata, GpsNumber: e.target.value });
  };
  const onChangeOwner = (e) => {
    changeCarInfo({ ...carmodalinfo, Owner: e.target.value });
    changeCarModalInfo({ ...carmodalinfo, Owner: e.target.value });
    changeCarInfoData({ ...carinfodata, Owner: e.target.value });
  };
  const onChangeAddr = (e) => {
    changeCarInfo({
      ...carmodalinfo,
      Address: e.target.value,
    });
    changeCarModalInfo({ ...carmodalinfo, Address: e.target.value });
    changeCarInfoData({ ...carinfodata, Address: e.target.value });
  };
  const onChangePhone = (e) => {
    changeCarInfo({ ...carmodalinfo, Phone: e.target.value });
    changeCarModalInfo({
      ...carmodalinfo,
      Phone: e.target.value,
    });
    changeCarInfoData({ ...carinfodata, Phone: e.target.value });
  };
  const onChangeFrom = (e) => {
    changeCarInfo({ ...carmodalinfo, SPoint: e.target.value });
    changeCarModalInfo({
      ...carmodalinfo,
      SPoint: e.target.value,
    });
    changeCarInfoData({ ...carinfodata, SPoint: e.target.value });
  };
  const onChangeTo = (e) => {
    changeCarInfo({ ...carmodalinfo, EPoint: e.target.value });
    changeCarModalInfo({
      ...carmodalinfo,
      EPoint: e.target.value,
    });
    changeCarInfoData({ ...carinfodata, EPoint: e.target.value });
  };
  //차량 정보 내의 조회버튼 클릭시 차량 번호와 유사한 것들을 modal창에 표시
  const carShowModal = () => {
    setIsModalOpenCar(true);
    axios
      .get(`http://localhost:4000/carinfoitemsall?CarNo=${carinfodata.Number}`)
      .then((response) => {
        let data = response.data.map((_, i) => ({
          Number: `${response.data[i].Number}`,
          RegNumber: `${response.data[i].RegNumber}`,
          SPoint: `${response.data[i].SPoint}`,
          EPoint: `${response.data[i].EPoint}`,
          GpsNumber: `${response.data[i].GpsNumber}`,
          Purpose: `${response.data[i].Purpose}`,
          Owner: `${response.data[i].Owner}`,
          Address: `${response.data[i].Address}`,
          Phone: `${response.data[i].Phone}`,

          Selected: false,
          idx: i,
        }));
        changeListData(data);
      });
  };
  //선택한 데이터 입력
  const carHandleOk = () => {
    setIsModalOpenCar(false);
    // changeCarInfo(carmodalinfo);
    // changeCarInfoData(carmodalinfo);
    const filteredData = listData.filter((item) => item.Selected === true);
    console.log('filtereedData :>> ', filteredData);
    changeCarInfo(filteredData[0]);
    changeCarInfoData(filteredData[0]);
  };

  const carHandleCancel = () => {
    setIsModalOpenCar(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  //지역정보 ok클릭시 setting값 저장
  const handleOk = () => {
    setIsModalOpen(false);
    let areaValue = JSON.stringify(areainfo);
    areaValue = areaValue.replaceAll('"', '`');

    // axios.put('http://localhost:4000/operator')

    axios
      .put('http://localhost:4000/settingitems/', {
        Name: 'DeliverProof',
        Value: areaValue,
      })
      .then((res) => {
        console.log('res', res.statusText);

        if (res.statusText === 'OK') {
          Modal.success({
            content: `저장 성공!`,
          });
        } else {
          Modal.error({
            content: `저장 실패!`,
          });
        }
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModalchecker = () => {
    setIsModalOpenChecker(true);
  };

  //확인자정보 ok클릭시 setting값 저장
  const handleOkchecker = async () => {
    setIsModalOpenChecker(false);
    changeCheckerInfo(checkermodalinfo);
    console.log('checkermodalinfo :>> ', checkermodalinfo);
    let checkerValue = JSON.stringify(checkermodalinfo);
    checkerValue = checkerValue.replaceAll('"', '`');
    console.log('checkerValue :>> ', checkerValue);
    let rt1 = false;
    let rt2 = false;
    await axios
      .put('http://localhost:4000/settingitems/', {
        Name: 'COperator',
        Value: checkerValue,
      })
      .then((res) => {
        console.log('res', res.statusText);

        // if (res.statusText === 'OK') {
        //   rt1 = true;
        //   Modal.success({
        //     content: `저장 성공!`,
        //   });
        // } else {
        //   rt1 = false;
        //   Modal.error({
        //     content: `저장 실패!`,
        //   });
        // }
      });

    checkerValue = checkerValue.replaceAll('`', '"');
    checkerValue = JSON.parse(checkerValue);

    await axios
      .post('http://localhost:4000/operatoritems/', {
        Name: checkerValue.Name,
        Phone: checkerValue.Phone,
        Type: checkerValue.Type,
        Position: checkerValue.Position,
        Attached: checkerValue.Attached,
      })
      .then((res) => {
        console.log('res', res.statusText);
        if (res.statusText === 'OK') {
          rt2 = true;
        } else {
          rt2 = false;
        }
      });
    console.log('rt1,rt2', rt1, rt2);
    if (rt2 === true) {
      Modal.success({
        content: `저장 성공!`,
      });
    } else {
      Modal.error({
        content: `저장 실패!`,
      });
    }
  };

  const handleCancelchecker = () => {
    setIsModalOpenChecker(false);
  };

  const showModalActor = () => {
    setIsModalOpenActor(true);
  };
  //실시자정보 ok클릭시 setting값 저장
  const handleOkActor = async () => {
    setIsModalOpenActor(false);
    changeActorInfo(actormodalinfo);
    let actorValue = JSON.stringify(actormodalinfo);
    actorValue = actorValue.replaceAll('"', '`');
    let rt1 = false;
    let rt2 = false;
    axios
      .put('http://localhost:4000/settingitems/', {
        Name: 'EOperator',
        Value: actorValue,
      })
      .then((res) => {
        console.log('res', res.statusText);

        if (res.statusText === 'OK') {
          rt1 = true;
          Modal.success({
            content: `저장 성공!`,
          });
        } else {
          rt1 = false;
          Modal.error({
            content: `저장 실패!`,
          });
        }
      });

    actorValue = actorValue.replaceAll('`', '"');
    actorValue = JSON.parse(actorValue);

    await axios
      .post('http://localhost:4000/operatoritems/', {
        Name: actorValue.Name,
        Phone: actorValue.Phone,
        Type: actorValue.Type,
        Position: actorValue.Position,
        Attached: actorValue.Attached,
      })
      .then((res) => {
        console.log('res', res.statusText);
        if (res.statusText === 'OK') {
          rt2 = true;
        } else {
          rt2 = false;
        }
      });
    console.log('rt1,rt2', rt1, rt2);
    // if (rt1 === true && rt2 === true) {
    //   Modal.success({
    //     content: `저장 성공!`,
    //   });
    // } else {
    //   Modal.error({
    //     content: `저장 실패!`,
    //   });
    // }
  };
  const handleCancelActor = () => {
    setIsModalOpenActor(false);
  };

  //대기저장에 클릭한 것 삭제하는 버튼
  const onDeleteButton = () => {
    let arr = [];
    let arr2 = [];
    arr = trashwaitingcar;
    arr.map((item, idx) =>
      item !== deletewaitingcar ? arr2.push(item) : null
    );
    changeTrashWaitingCar(arr2);
    changeCarInfoData({ ...carinfodata, Number: trashwaitingcar[0].Number });
    changeWaitingCar(trashwaitingcar);
    changeWaitingCurrentNumber(arr2[0]);
  };
  //mqtt 송신 버튼
  const onNButton = () => {
    const dateTime = moment().format('YY/MM/DD-HH:mm:ss');
    client.publish(
      'CarCleanDevice',
      '{"CMD":"STEP_Recognized","STATUS":"O","TIME":"' +
        dateTime +
        '","QUEUE":O}'
    );
  };
  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'end' }}>
        <label>
          차량 번호
          <Input
            className='input input_carnum'
            placeholder='차량 번호'
            value={
              carinfodata?.Number === 'undefined' ? '' : carinfodata?.Number
            }
            onChange={onChangeCarNum}
          />
        </label>
        <Button onClick={carShowModal}>조회</Button>
        <Modal
          open={isModalOpenCar}
          onOk={carHandleOk}
          onCancel={carHandleCancel}
        >
          <CarButtonContainer title={'출입자 정보'}></CarButtonContainer>
        </Modal>

        <Button onClick={onDeleteButton}>삭제</Button>
        <Button onClick={onNButton}>N</Button>
      </div>
      <label>
        차량 목적
        <Input
          className='input input_purpose'
          placeholder='차량 목적'
          value={
            carinfodata?.Purpose === 'undefined' ? '' : carinfodata?.Purpose
          }
          onChange={onChangePurpose}
        />
      </label>
      <label>
        등록 번호
        <Input
          className='input input_regnum'
          placeholder='등록 번호'
          value={
            carinfodata?.RegNumber === 'undefined' ? '' : carinfodata?.RegNumber
          }
          onChange={onChangeRegNum}
        />
      </label>
      <label>
        GPS 번호
        <Input
          className='input input_gpsnum'
          placeholder='GPS 번호'
          value={
            carinfodata?.GpsNumber === 'undefined' ? '' : carinfodata?.GpsNumber
          }
          onChange={onChangeGpsnum}
        />
      </label>
      <label>
        차주 성명
        <Input
          className='input input_owner'
          placeholder='차주 성명'
          value={carinfodata?.Owner === 'undefined' ? '' : carinfodata?.Owner}
          onChange={onChangeOwner}
        />
      </label>
      <label>
        주소
        <Input
          className='input input_address'
          placeholder='주소'
          value={
            carinfodata?.Address === 'undefined' ? '' : carinfodata?.Address
          }
          onChange={onChangeAddr}
        />
      </label>
      <label>
        연락처
        <Input
          className='input input_phone'
          placeholder='연락처'
          value={carinfodata?.Phone === 'undefined' ? '' : carinfodata?.Phone}
          onChange={onChangePhone}
        />
      </label>

      <Row wrap={false} style={{ display: 'flex', alignItems: 'center' }}>
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <label>
            출발지
            <Input
              className='input input_spoint'
              value={
                carinfodata?.SPoint === 'undefined'
                  ? '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'
                  : carinfodata?.SPoint
              }
              placeholder='출발지'
              onChange={onChangeFrom}
            />
          </label>
        </Col>
        <ArrowRightOutlined />
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <label>
            목적지
            <Input
              className='input input_epoint'
              placeholder='목적지'
              value={
                carinfodata?.EPoint === 'undefined' ? '' : carinfodata?.EPoint
              }
              onChange={onChangeTo}
            />
          </label>
        </Col>
      </Row>
      <Row className='buttons' wrap={false} gutter={8}>
        <Col>
          <Button onClick={showModal}>지역 정보</Button>
          <Modal
            title=''
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <ButtonContainer title={'지역정보'}>
              <ButtonContainerArea />
            </ButtonContainer>
          </Modal>
        </Col>
        <Col>
          <Button onClick={showModalchecker}>확인자 정보</Button>
          <Modal
            title=''
            open={isModalOpenChecker}
            onOk={handleOkchecker}
            onCancel={handleCancelchecker}
          >
            <CheckerButtonViewContainer />
          </Modal>
        </Col>
        <Col>
          <Button onClick={showModalActor}>실시자 정보</Button>
          <Modal
            title=''
            open={isModalOpenActor}
            onOk={handleOkActor}
            onCancel={handleCancelActor}
          >
            <ActorButtonViewContainer />
          </Modal>
        </Col>
      </Row>
    </div>
  );
}
