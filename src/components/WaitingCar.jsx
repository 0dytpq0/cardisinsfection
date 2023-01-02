import React, { useEffect, useRef } from 'react';
import { useInfo, useWaitingCar } from '../store';
import { List } from 'antd';
import axios from 'axios';
import { client } from '../App';
import moment from 'moment';

const WaitingCar = () => {
  const {
    changeCarInfoData,
    carinfodata,
    changeWaitingCar,
    waitingcar,
    waitingcurrentnumber,
    changeWaitingCurrentNumber,
    deletewaitingcar,
    changeDeleteWaitingCar,
    changeCarInfo,
    changeActorInfo,
    changeAreaInfo,
    changeCheckerInfo,
    changeWaitingCarImg,
    waitingcarimg,
  } = useInfo();
  const waitingcarHeader = useRef(null);
  const { changeTrashWaitingCar, trashwaitingcar } = useWaitingCar();
  let arr = [];
  useEffect(() => {
    client?.subscribe('CCTV', 0, (error) => {
      if (error) {
        console.log('Subscribe to topics error', error);
        return;
      }
    });

    client?.on('message', (topic, message) => {
      // const payload = { topic, message: message.toString() };
      if (topic.includes('CCTV')) {
        message = message.toString().replaceAll('\\', '/');
        let msg = JSON.parse(message.toString());
        // let arr = [];
        waitingcar.push(msg.CARNUMBER);
        arr = waitingcar;
        arr = arr.filter((item) => item !== undefined);
        arr = arr.filter((item) => item !== null);
        changeTrashWaitingCar(arr);
        // waitingcarHeader.current = arr[0];
        if (waitingcar.length === 1) {
          changeWaitingCurrentNumber(arr[0]);
        }
        changeWaitingCar(trashwaitingcar);
      }
    });
    client?.on('disconnect', () => client.end());
  }, [trashwaitingcar]);
  const onClickHandler = (e) => {
    let Number = '';
    let sql = '';
    Number = e.target.innerText;
    if (Number !== '') {
      sql = `http://localhost:4000/carinfoitemsallDate?Number=${Number}`;
    }
    axios.get(sql).then((res, error) => {
      if (error) {
        console.log('error :>> ', error);
      }
      let data = res.data[0];
      if (Number !== '미인식') {
        console.log('data', data.ImagePath);

        changeCarInfo({
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
        changeActorInfo({
          Attached: `${data?.CAttached}`,
          Name: `${data?.CName}`,
          Phone: `${data?.CPhone}`,
          Position: `${data?.CPosition}`,
          Type: `${data?.Type}`,
        });
        changeCheckerInfo({
          Attached: `${data?.EAttached}`,
          Name: `${data?.EName}`,
          Phone: `${data?.EPhone}`,
          Position: `${data?.EPosition}`,
          Type: `${data?.Type}`,
        });
        changeAreaInfo({
          Area: `${data?.Area}`,
          AreaType: `${data?.AreaType}`,
          DContent: `${data?.DContent}`,
          PointName: `${data?.PointName}`,
        });
        changeCarInfoData({
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
        changeWaitingCarImg(data.ImagePath);
        console.log('waitingcarimg', waitingcarimg);
      } else {
        console.log('Number :>> ', Number);
        changeCarInfoData({
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
        changeCarInfo({
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
        changeActorInfo({
          Attached: '',
          Name: '',
          Phone: '',
          Position: '',
        });
        changeCheckerInfo({
          Attached: '',
          Name: '',
          Phone: '',
          Position: '',
        });
        changeAreaInfo({
          Area: '',
          AreaType: '',
          DContent: '',
          PointName: '',
        });
      }

      changeDeleteWaitingCar(e.target.innerText);
    });
  };
  const ItemList = trashwaitingcar.map((item, idx) => (
    <li onClick={onClickHandler} key={idx} className='waiting__list__item'>
      {item}
    </li>
  ));

  return (
    <div>
      <div style={{ height: '10vh', overflow: 'hidden' }}>
        <ul className='waiting__list'>{ItemList}</ul>
      </div>
      <div className='waiting_img'>
        <img className='carimg' src={waitingcarimg} />
      </div>
    </div>
  );
};
export default WaitingCar;
