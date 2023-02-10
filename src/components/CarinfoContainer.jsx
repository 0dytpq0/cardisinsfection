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
  const { ZsetTrashWaitingCar, ZtrashWaitingCar } = useWaitingCar();
  const { ZlistData, ZsetListData } = useListData();
  const {
    ZsetWaitingCurrentNumber,
    ZsetCarInfoData,
    ZcarInfoData,
    ZdeleteWaitingCar,
    ZsetCarInfo,
    ZwaitingCar,
    ZsetWaitingCar,
    ZcarInfo,
    ZcarModalInfo,
    ZareaInfo,
    ZcheckerModalInfo,
    ZsetCheckerInfo,
    ZactorModalInfo,
    ZsetActorInfo,
    ZsetCarModalInfo,
    ZwaitingCurrentNumber,
  } = useInfo((state) => state);
  const [isModalOpenCar, setIsModalOpenCar] = useState(false);
  //
  const [isModalOpenArea, setIsModalOpenArea] = useState(false);
  const [isModalOpenChecker, setIsModalOpenChecker] = useState(false);
  const [isModalOpenActor, setIsModalOpenActor] = useState(false);

  useEffect(() => {
    //대기저장차량 첫번째에 따라 차량정보 가져오는 곳
    let Number = '';
    let sql = '';
    Number = ZwaitingCurrentNumber;
    if (Number !== '') {
      sql = `http://localhost:4000/ZcarInfoitemsallDate?Number=${Number}`;
    }
    axios.get(sql).then((res, error) => {
      if (error) {
        console.log('error :>> ', error);
      }
      let data = res?.data[0];
      //undefined가 안뜨게 미인식일 시에 값 넣어주는 곳
      if (Number === '미인식') {
        ZsetCarInfoData({
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

        ZsetCarInfo({
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
        ZsetCarInfoData({
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

        ZsetCarInfo({
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
  }, [ZwaitingCurrentNumber]);
  //차량정보 인풋창 수정
  const onChangeCarNum = (e) => {
    ZsetCarInfo({ ...ZcarModalInfo, Number: e.target.value });
    ZsetCarModalInfo({ ...ZcarModalInfo, Number: e.target.value });
    ZsetCarInfoData({ ...ZcarInfoData, Number: e.target.value });
  };
  const onChangePurpose = (e) => {
    ZsetCarInfo({ ...ZcarModalInfo, Purpose: e.target.value });
    ZsetCarModalInfo({ ...ZcarModalInfo, Purpose: e.target.value });
    ZsetCarInfoData({ ...ZcarInfoData, Purpose: e.target.value });
  };
  const onChangeRegNum = (e) => {
    ZsetCarInfo({ ...ZcarModalInfo, RegNumber: e.target.value });
    ZsetCarModalInfo({ ...ZcarModalInfo, RegNumber: e.target.value });
    ZsetCarInfoData({ ...ZcarInfoData, RegNumber: e.target.value });
  };
  const onChangeGpsnum = (e) => {
    ZsetCarInfo({ ...ZcarModalInfo, GpsNumber: e.target.value });
    ZsetCarModalInfo({ ...ZcarModalInfo, GpsNumber: e.target.value });
    ZsetCarInfoData({ ...ZcarInfoData, GpsNumber: e.target.value });
  };
  const onChangeOwner = (e) => {
    ZsetCarInfo({ ...ZcarModalInfo, Owner: e.target.value });
    ZsetCarModalInfo({ ...ZcarModalInfo, Owner: e.target.value });
    ZsetCarInfoData({ ...ZcarInfoData, Owner: e.target.value });
  };
  const onChangeAddr = (e) => {
    ZsetCarInfo({
      ...ZcarModalInfo,
      Address: e.target.value,
    });
    ZsetCarModalInfo({ ...ZcarModalInfo, Address: e.target.value });
    ZsetCarInfoData({ ...ZcarInfoData, Address: e.target.value });
  };
  const onChangePhone = (e) => {
    ZsetCarInfo({ ...ZcarModalInfo, Phone: e.target.value });
    ZsetCarModalInfo({
      ...ZcarModalInfo,
      Phone: e.target.value,
    });
    ZsetCarInfoData({ ...ZcarInfoData, Phone: e.target.value });
  };
  const onChangeFrom = (e) => {
    ZsetCarInfo({ ...ZcarModalInfo, SPoint: e.target.value });
    ZsetCarModalInfo({
      ...ZcarModalInfo,
      SPoint: e.target.value,
    });
    ZsetCarInfoData({ ...ZcarInfoData, SPoint: e.target.value });
  };
  const onChangeTo = (e) => {
    ZsetCarInfo({ ...ZcarModalInfo, EPoint: e.target.value });
    ZsetCarModalInfo({
      ...ZcarModalInfo,
      EPoint: e.target.value,
    });
    ZsetCarInfoData({ ...ZcarInfoData, EPoint: e.target.value });
  };
  //차량 정보 내의 조회버튼 클릭시 차량 번호와 유사한 것들을 modal창에 표시
  const ShowModalCar = () => {
    setIsModalOpenCar(true);
    axios
      .get(`http://localhost:4000/carinfoitemsall?CarNo=${ZcarInfoData.Number}`)
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
        ZsetListData(data);
      });
  };
  //선택한 데이터 입력
  const HandleOkCar = () => {
    setIsModalOpenCar(false);
    // ZsetCarInfo(ZcarModalInfo);
    // ZsetCarInfoData(ZcarModalInfo);
    const filteredData = ZlistData.filter((item) => item.Selected === true);
    ZsetCarInfo(filteredData[0]);
    ZsetCarInfoData(filteredData[0]);
  };

  const HandleCancelCar = () => {
    setIsModalOpenCar(false);
  };

  const showModal = () => {
    setIsModalOpenArea(true);
  };

  //지역정보 ok클릭시 setting값 저장
  const handleOk = () => {
    setIsModalOpenArea(false);
    let areaValue = JSON.stringify(ZareaInfo);
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
    setIsModalOpenArea(false);
  };

  const showModalchecker = () => {
    setIsModalOpenChecker(true);
  };

  //확인자정보 ok클릭시 setting값 저장
  const handleOkchecker = async () => {
    setIsModalOpenChecker(false);
    ZsetCheckerInfo(ZcheckerModalInfo);
    //modalinfo에 select여부를 판가름 할 수 있게하는 키값이 들어가기에
    //따로 지역변수를 만들어서 db에 넣어줬음.
    let putDataBase = {
      Attached: ZcheckerModalInfo.Attached,
      Name: ZcheckerModalInfo.Name,
      Position: ZcheckerModalInfo.Position,
      Phone: ZcheckerModalInfo.Phone,
      Type: ZcheckerModalInfo.Type,
    };
    let checkerValue = JSON.stringify(putDataBase);
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
    ZsetActorInfo(ZactorModalInfo);
    //modalinfo에 select여부를 판가름 할 수 있게하는 키값이 들어가기에
    //따로 지역변수를 만들어서 db에 넣어줬음.
    let putDataBase = {
      Attached: ZactorModalInfo.Attached,
      Name: ZactorModalInfo.Name,
      Phone: ZactorModalInfo.Phone,
      Position: ZactorModalInfo.Position,
      Type: ZactorModalInfo.Type,
    };
    let actorValue = JSON.stringify(putDataBase);
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
  const onClickDeleteButton = () => {
    ZsetCarInfoData({ ...ZcarInfoData, Number: '' });
  };
  //mqtt 송신 버튼
  const onClickNButton = () => {
    ZsetCarInfoData({});
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
              ZcarInfoData?.Number === 'undefined' ? '' : ZcarInfoData?.Number
            }
            onChange={onChangeCarNum}
          />
        </label>
        <Button size='small' onClick={ShowModalCar}>
          조회
        </Button>
        <Modal
          open={isModalOpenCar}
          onOk={HandleOkCar}
          onCancel={HandleCancelCar}
        >
          <CarButtonContainer title={'출입자 정보'}></CarButtonContainer>
        </Modal>

        <Button size='small' onClick={onClickDeleteButton}>
          번호삭제
        </Button>
        <Button size='small' onClick={onClickNButton}>
          N
        </Button>
      </div>
      <label>
        차량 목적
        <Input
          className='input input_purpose'
          placeholder='차량 목적'
          value={
            ZcarInfoData?.Purpose === 'undefined' ? '' : ZcarInfoData?.Purpose
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
            ZcarInfoData?.RegNumber === 'undefined'
              ? ''
              : ZcarInfoData?.RegNumber
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
            ZcarInfoData?.GpsNumber === 'undefined'
              ? ''
              : ZcarInfoData?.GpsNumber
          }
          onChange={onChangeGpsnum}
        />
      </label>
      <label>
        차주 성명
        <Input
          className='input input_owner'
          placeholder='차주 성명'
          value={ZcarInfoData?.Owner === 'undefined' ? '' : ZcarInfoData?.Owner}
          onChange={onChangeOwner}
        />
      </label>
      <label>
        주소
        <Input
          className='input input_address'
          placeholder='주소'
          value={
            ZcarInfoData?.Address === 'undefined' ? '' : ZcarInfoData?.Address
          }
          onChange={onChangeAddr}
        />
      </label>
      <label>
        연락처
        <Input
          className='input input_phone'
          placeholder='연락처'
          value={ZcarInfoData?.Phone === 'undefined' ? '' : ZcarInfoData?.Phone}
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
                ZcarInfoData?.SPoint === 'undefined'
                  ? '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'
                  : ZcarInfoData?.SPoint
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
                ZcarInfoData?.EPoint === 'undefined' ? '' : ZcarInfoData?.EPoint
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
            open={isModalOpenArea}
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
