import React, { useEffect, useRef } from 'react';
import { useInfo, useWaitingCar } from '../store';
import { List, message } from 'antd';
import axios from 'axios';
import { client } from '../App';
import moment from 'moment';
//대기차량
const WaitingCar = () => {
  const {
    ZsetCarInfoData,
    ZcarInfoData,
    ZsetWaitingCar,
    ZwaitingCar,
    ZwaitingCurrentNumber,
    ZsetWaitingCurrentNumber,
    ZdeleteWaitingCar,
    ZsetDeleteWaitingCar,
    ZsetCarInfo,
    ZsetActorInfo,
    ZsetAreaInfo,
    ZsetCheckerInfo,
    ZsetWaitingCarImg,
    ZwaitingCarImg,
    ZsetIsPrint,
  } = useInfo();
  const ZwaitingCarHeader = useRef(null);
  const { ZsetTrashWaitingCar, ZtrashWaitingCar } = useWaitingCar();
  let arr = [];
  //mqtt 수신시 자동차 번호를 대기목록에 추가
  useEffect(() => {
    client?.subscribe('CCTV', 0, (error) => {
      if (error) {
        console.log('Subscribe to topics error', error);
        return;
      }
    });

    client?.on('message', (topic, message) => {
      if (topic.includes('CCTV')) {
        message = message.toString().replaceAll('\\', '/');
        let msg = JSON.parse(message.toString());
        ZwaitingCar.push(msg.CARNUMBER);
        arr = ZwaitingCar;
        arr = arr.filter((item) => item !== undefined);
        arr = arr.filter((item) => item !== null);
        ZsetTrashWaitingCar(arr);
        if (ZwaitingCar.length === 1) {
          ZsetWaitingCurrentNumber(arr[0]);
        }
        ZsetWaitingCar(ZtrashWaitingCar);
      }
    });
    client?.on('disconnect', () => client.end());
  }, [ZtrashWaitingCar]);
  //대기차량 클릭시 차량정보 창에 정보 읿력
  const onClickList = (e) => {
    ZsetIsPrint(true);
    let Number = '';
    let sql = '';
    //차번호 웹에 찍히는게 데이터베이스에 없음.
    // Number = '001143';
    Number = e.target.innerText;
    console.log(Number);
    if (Number !== '') {
      sql = `http://localhost:4000/carinfoitemsallDate?Number=${Number}`;
    }
    axios.get(sql).then((res, error) => {
      if (error) {
        console.log('error :>> ', error);
      }
      let data = res.data[0];
      //차량에 대한 정보가 없어서 데이터가 안들어 올 경우에 빈칸으로 기본 값을 준다.
      if (data === undefined) {
        Number = '미인식';
        message.warning('해당 차량에 대한 정보가 없습니다.');
      }
      if (Number !== '미인식') {
        ZsetCarInfo({
          PrintIndex: `${data?.PrintIndex}`,
          Number: `${data?.Number}`,
          Address: `${data?.Address}`,
          RegNumber: `${data?.RegNumber}`,
          Phone: `${data?.Phone}`,
          GpsNumber: `${data?.GpsNumber}`,
          Owner: `${data?.Owner}`,
          SPoint: `${data?.SPoint}`,
          Purpose: `${data?.Purpose}`,
          EPoint: `${data?.EPoint}`,
          RegistryDate: `${data?.RegistryDate}`,
        });
        ZsetActorInfo({
          Attached: `${data?.CAttached}`,
          Name: `${data?.CName}`,
          Phone: `${data?.CPhone}`,
          Position: `${data?.CPosition}`,
          Type: `${data?.Type}`,
        });
        ZsetCheckerInfo({
          Attached: `${data?.EAttached}`,
          Name: `${data?.EName}`,
          Phone: `${data?.EPhone}`,
          Position: `${data?.EPosition}`,
          Type: `${data?.Type}`,
        });
        ZsetAreaInfo({
          Area: `${data?.Area}`,
          AreaType: `${data?.AreaType}`,
          DContent: `${data?.DContent}`,
          PointName: `${data?.PointName}`,
        });
        ZsetCarInfoData({
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
        ZsetWaitingCarImg(data.ImagePath);
      } else {
        ZsetCarInfoData({
          PrintIndex: moment().format('YYYYMMDDHHmmss'),
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
          PrintIndex: moment().format('YYYYMMDDHHmmss'),
          Number: '',
          Address: '',
          RegNumber: '',
          Phone: '',
          GpsNum: '',
          Owner: '',
          SPoint: '',
          Purpose: '',
          EPoint: '',
        });
        ZsetActorInfo({
          Attached: '',
          Name: '',
          Phone: '',
          Position: '',
        });
        ZsetCheckerInfo({
          Attached: '',
          Name: '',
          Phone: '',
          Position: '',
        });
        ZsetAreaInfo({
          Area: '',
          AreaType: '',
          DContent: '',
          PointName: '',
        });
      }

      ZsetDeleteWaitingCar(e.target.innerText);
    });
  };
  //대기저장 목록 뿌려주는 변수
  const ItemList = ZtrashWaitingCar.map((item, idx) => (
    <li onClick={onClickList} key={idx} className='waiting__list__item'>
      {item}
    </li>
  ));

  return (
    <div>
      <div style={{ height: '10vh', overflow: 'hidden' }}>
        <ul className='waiting__list'>{ItemList}</ul>
      </div>
      <div className='waiting_img'>
        <img className='carimg' src={ZwaitingCarImg} />
      </div>
    </div>
  );
};
export default WaitingCar;
