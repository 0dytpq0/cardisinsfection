import React, { useState, useEffect } from "react";
import { useInfo } from "../store";
import CarinfoContainer from "./CarinfoContainer";
import axios from "axios";

const PrintCompleted = ({ printed }) => {
  const { printedcar, changeCarInfo, changePrintedCar } = useInfo();
  let arr = [];
  const onListChange = (e) => {
    let Number = "";
    let sql = "";
    Number = e.target.innerText;
    if (Number !== "") {
      sql = `http://localhost:4000/carinfoitemsallDate?Number=${Number}`;
    }
    axios.get(sql).then((res, error) => {
      if (error) {
        console.log("error :>> ", error);
      }
      let data = res.data[0];
      changeCarInfo({
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
    // changePrintedCar(arr);
    console.log("printedcar :>> ", printedcar);
  };
  arr.push(printedcar);
  const itemList = arr.map((item, idx) => (
    <li onClick={onListChange} key={idx} className="printedcar_list_item">
      {item}
    </li>
  ));
  return (
    <div>
      <ul className="printedcar_list">{itemList}</ul>
    </div>
  );
};

export default PrintCompleted;
