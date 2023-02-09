import React, { useState, useEffect } from 'react';
import { useInfo } from '../store';
import CarinfoContainer from './CarinfoContainer';
import axios from 'axios';

//프린트 완료 차량
const PrintCompleted = ({ printed }) => {
  const {
    printedcar,
    changeCarInfo,
    changePrintedCar,
    carinfo,
    changeCarInfoData,
    changeActorInfo,
    changeCheckerInfo,
    changeAreaInfo,
  } = useInfo();
  //프린트 완료 차량 리스트 클릭시 정보 가져오는 코드
  const onListChange = (e) => {
    let PrintIndex = '';
    let sql = '';
    console.log('e :>> ', e);
    PrintIndex = e.target.dataset.set;
    if (PrintIndex !== '') {
      sql = `http://localhost:4000/carinfoitemsallPrintIndex?PrintIndex=${PrintIndex}`;
    }
    axios.get(sql).then((res, error) => {
      if (error) {
        console.log('error :>> ', error);
      }
      let data = res.data[0];
      console.log('data :>> ', data);
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
      });
      changeCarInfoData({
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
      });
    });
    // if ((printedcar.length = 9)) {
    //   printedcar.unshift();
    // }
  };

  //화면에 뿌려주는 변수
  const itemList = printedcar.map((item, idx) => (
    <li
      data-set={item.PrintIndex}
      onClick={onListChange}
      key={idx}
      className='printedcar_list_item'
    >
      {item.Number}
    </li>
  ));
  return (
    <div>
      <ul className='printedcar_list'>{itemList}</ul>
    </div>
  );
};

export default PrintCompleted;
