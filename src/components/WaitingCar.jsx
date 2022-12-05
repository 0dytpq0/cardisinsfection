import React, { useState, useEffect, useMemo } from "react";
import { useInfo, waitingInfo } from "../store";
import axios from "axios";
import { client } from "../App";

const WaitingCar = () => {
  const {
    changeCarInfo,
    carinfo,
    changeWaitingCar,
    waitingcar,
    changeWaitingCurrentNumber,
    waitingcurrentnumber,
  } = useInfo();
  const [waiting, setWaiting] = useState([]);
  let arr = [];

  useEffect(() => {
    client?.subscribe("CCTV", 0, (error) => {
      if (error) {
        console.log("Subscribe to topics error", error);
        return;
      }
    });

    client?.on("message", (topic, message) => {
      const payload = { topic, message: message.toString() };
      if (topic.includes("CCTV")) {
        message = message.toString().replaceAll("\\", "/");
        let msg = JSON.parse(message.toString());
        // let arr = [];
        arr = arr.concat(msg.CARNUMBER);
        arr = arr.filter((item) => item !== undefined);
        changeWaitingCar(arr);
        changeWaitingCurrentNumber(arr[0]);
      }
    });
    client?.on("disconnect", () => client.end());
  }, [client]);
  const ItemList = waitingcar.map((item, idx) => (
    <li key={idx} className="waiting__list__item">
      {item}
    </li>
  ));

  return (
    <div>
      <ul className="waiting__list">{ItemList}</ul>
    </div>
  );
};

export default WaitingCar;
