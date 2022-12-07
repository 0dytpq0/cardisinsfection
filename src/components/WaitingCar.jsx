import React, { useEffect } from "react";
import { useInfo } from "../store";
import axios from "axios";
import { client } from "../App";

const WaitingCar = () => {
  const { changeWaitingCar, waitingcar, changeWaitingCurrentNumber } =
    useInfo();
  let arr = [];

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
        // let arr = [];
        arr = arr.concat(msg.CARNUMBER);
        arr = arr.filter((item) => item !== undefined);
        changeWaitingCar(arr);
        changeWaitingCurrentNumber(arr[0]);
      }
    });
    client?.on("disconnect", () => client.end());
  }, []);
  const ItemList = waitingcar.map((item, idx) => (
    <li key={idx} className="waiting__list__item">
      {item}
    </li>
  ));

  return (
    <div>
      <div style={{ height: "10vh", overflow: "hidden" }}>
        <ul className="waiting__list">{ItemList}</ul>
      </div>
      <div>
        <img
          style={{ width: "34vh", height: "280px", zIndex: "0" }}
          src="http://127.0.0.1:4000/images/1.jpg"
        />
      </div>
    </div>
  );
};

export default WaitingCar;
