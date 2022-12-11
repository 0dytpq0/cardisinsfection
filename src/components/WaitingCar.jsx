import React, { useState, useEffect } from "react";
import { useInfo } from "../store";
import { List } from "antd";
import axios from "axios";
import { client } from "../App";

const WaitingCar = ({ carimg }) => {
  const {
    changeCarInfoData,
    changeWaitingCar,
    waitingcar,
    changeWaitingCurrentNumber,
    deletewaitingcar,
    changeDeleteWaitingCar,
    changeCarInfo,
    changeActorInfo,
    changeAreaInfo,
    changeCheckerInfo,
  } = useInfo();
  // console.log("waitingcareeeee", waitingcar);

  const [wCarArr, setWCarArr] = useState([]);
  useEffect(() => {
    client?.subscribe("CCTV", 0, (error) => {
      if (error) {
        console.log("Subscribe to topics error", error);
        return;
      }
    });
    client?.on("message", (topic, message) => {
      // const payload = { topic, message: message.toString() };
      if (topic.includes("CCTV")) {
        message = message.toString().replaceAll("\\", "/");
        let msg = JSON.parse(message.toString());
        let arr = [];
        arr = waitingcar.concat(msg.CARNUMBER);
        console.log("arr", arr);
        arr = arr.filter((item) => item !== undefined);
        changeWaitingCar(arr);
        changeWaitingCurrentNumber(arr[0]);
      }
    });
    client?.on("disconnect", () => client.end());
  }, []);
  const onClickHandler = (e) => {
    let Number = "";
    let sql = "";
    console.log("e :>> ", e);
    Number = e.target.innerText;
    if (Number !== "미인식") {
      sql = `http://localhost:4000/carinfoitemsallDate?Number=${Number}`;
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
        changeDeleteWaitingCar(e.target.innerText);
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
        console.log("waitingcar", waitingcar);

        console.log("deletewaitingcar", deletewaitingcar);
      });
    } else if (Number === "미인식") {
      changeDeleteWaitingCar(e.target.innerText);
      sql = `http://localhost:4000/carinfoitemsallDate?Number=${Number}`;
      axios.get(sql).then((res, error) => {
        if (error) {
          console.log("error :>> ", error);
        }
        let data = res.data[0];
        console.log("data :>> ", data);
        changeCarInfo({
          PrintIndex: "",
          Number: "",
          Address: "",
          RegNumber: "",
          Phone: "",
          GpsNumber: "",
          Owner: "",
          SPoint: "",
          Purpose: "",
          EPoint: "",
        });
        changeActorInfo({
          Attached: "",
          Name: "",
          Phone: "",
          Position: "",
        });
        changeCheckerInfo({
          Attached: "",
          Name: "",
          Phone: "",
          Position: "",
        });
        changeAreaInfo({
          Area: "",
          AreaType: "",
          DContent: "",
        });
        changeCarInfoData({
          PrintIndex: "",
          Number: "",
          Address: "",
          RegNumber: "",
          Phone: "",
          GpsNumber: "",
          Owner: "",
          SPoint: "",
          Purpose: "",
          EPoint: "",
        });
      });
    }
  };
  const ItemList = waitingcar.map((item, idx) => (
    <li onClick={onClickHandler} key={idx} className="waiting__list__item">
      {item}
    </li>
  ));

  return (
    <div>
      <div style={{ height: "10vh", overflow: "hidden" }}>
        <ul className="waiting__list">{ItemList}</ul>
      </div>
      <div>
        <img className="carimg" src={carimg} />
      </div>
    </div>
  );
};
export default WaitingCar;
