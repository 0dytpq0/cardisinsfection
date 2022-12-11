import React, { useState, useEffect } from "react";
import { useInfo } from "../store";
import CarinfoContainer from "./CarinfoContainer";
import axios from "axios";

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
  const onListChange = (e) => {
    let PrintIndex = "";
    let sql = "";
    console.log("e :>> ", e);
    PrintIndex = e.target.dataset.set;
    if (PrintIndex !== "") {
      sql = `http://localhost:4000/carinfoitemsallPrintIndex?PrintIndex=${PrintIndex}`;
    }
    axios.get(sql).then((res, error) => {
      if (error) {
        console.log("error :>> ", error);
      }
      let data = res.data[0];
      console.log("data :>> ", data);
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
      });
      changeActorInfo({
        Attached: `${data?.CAttached}`,
        Name: `${data?.CName}`,
        Phone: `${data?.CPhone}`,
        Position: `${data?.CPosition}`,
      });
      changeCheckerInfo({
        Attached: `${data?.EAttached}`,
        Name: `${data?.EName}`,
        Phone: `${data?.EPhone}`,
        Position: `${data?.EPosition}`,
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

  const itemList = printedcar.map((item, idx) => (
    <li
      data-set={item.PrintIndex}
      onClick={onListChange}
      key={idx}
      className="printedcar_list_item"
    >
      {item.Number}
    </li>
  ));
  return (
    <div>
      <ul className="printedcar_list">{itemList}</ul>
    </div>
  );
};

export default PrintCompleted;
