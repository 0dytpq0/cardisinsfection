import React from "react";
import { useEffect, useState } from "react";
import { client } from "../App";
import moment from "moment";
import { withSuccess } from "antd/es/modal/confirm";

const Alarm = () => {
  const [msgList, setMsgList] = useState([]);
  useEffect(() => {
    client?.on("message", (topic, message) => {
      if (topic.includes("CarCleanDeviceRequest")) {
        const msg = message.toString();
        const jsonMsg = JSON.parse(msg);
        if (jsonMsg?.CMD === "AUTO_MODE" && jsonMsg?.STATUS === 1) {
          let arr = msgList;
          arr.unshift(moment().format("HH:mm:ss") + " 자동모드");
          setMsgList(arr);
        }
        if (jsonMsg?.CMD === "AUTO_MODE" && jsonMsg?.STATUS === 0) {
          let arr = msgList;
          arr.unshift(moment().format("HH:mm:ss") + " 수동모드");
          setMsgList(arr);
        }
        if (jsonMsg?.CMD === "BREAKER" && jsonMsg?.STATUS === 1) {
          let arr = msgList;
          arr.unshift(moment().format("HH:mm:ss") + " 차단기 올림");
          setMsgList(arr);
        }
        if (jsonMsg?.CMD === "BREAKER" && jsonMsg?.STATUS === 0) {
          let arr = msgList;
          arr.unshift(moment().format("HH:mm:ss") + " 차단기 내림");
          setMsgList(arr);
        }
        if (jsonMsg?.CMD === "In_Gate" && jsonMsg?.STATUS === 1) {
          let arr = msgList;
          arr.unshift(moment().format("HH:mm:ss") + " 입구문 열림");
          setMsgList(arr);
        }
        if (jsonMsg?.CMD === "In_Gate" && jsonMsg?.STATUS === 0) {
          let arr = msgList;
          arr.unshift(moment().format("HH:mm:ss") + " 입구문 닫힘");
          setMsgList(arr);
        }
        if (jsonMsg?.CMD === "REMOVE_WATER" && jsonMsg?.STATUS === 1) {
          let arr = msgList;
          arr.unshift(moment().format("HH:mm:ss") + " 물기제거 가동");
          setMsgList(arr);
        }
        if (jsonMsg?.CMD === "REMOVE_WATER" && jsonMsg?.STATUS === 0) {
          let arr = msgList;
          arr.unshift(moment().format("HH:mm:ss") + " 물기제거 완료");
          setMsgList(arr);
        }
        if (jsonMsg?.CMD === "CLEAN_DRIVER" && jsonMsg?.STATUS === 1) {
          let arr = msgList;
          arr.unshift(moment().format("HH:mm:ss") + " 운전자 소독 시작");
          setMsgList(arr);
        }
        if (jsonMsg?.CMD === "CLEAN_DRIVER" && jsonMsg?.STATUS === 0) {
          let arr = msgList;
          arr.unshift(moment().format("HH:mm:ss") + " 운전자 소독 완료");
          setMsgList(arr);
        }
        if (jsonMsg?.CMD === "CARCLEAN" && jsonMsg?.STATUS === 1) {
          let arr = msgList;
          arr.unshift(moment().format("HH:mm:ss") + " 공기정화 시작");
          setMsgList(arr);
        }
        if (jsonMsg?.CMD === "CARCLEAN" && jsonMsg?.STATUS === 0) {
          let arr = msgList;
          arr.unshift(moment().format("HH:mm:ss") + " 공기정화 완료");
          setMsgList(arr);
        }
        if (jsonMsg?.CMD === "AIR_DEODORIZATION" && jsonMsg?.STATUS === 1) {
          let arr = msgList;
          arr.unshift(moment().format("HH:mm:ss") + " 공기정화 시작");
          setMsgList(arr);
        }
        if (jsonMsg?.CMD === "AIR_DEODORIZATION" && jsonMsg?.STATUS === 0) {
          let arr = msgList;
          arr.unshift(moment().format("HH:mm:ss") + " 공기정화 완료");
          setMsgList(arr);
        }
        if (jsonMsg?.CMD === "OUT_GATE" && jsonMsg?.STATUS === 1) {
          let arr = msgList;
          arr.unshift(moment().format("HH:mm:ss") + " 출구문 열림");
          setMsgList(arr);
        }
        if (jsonMsg?.CMD === "OUT_GATE" && jsonMsg?.STATUS === 0) {
          let arr = msgList;
          arr.unshift(moment().format("HH:mm:ss") + " 출구문 닫힘");
          setMsgList(arr);
        }
        if (jsonMsg?.CMD === "PIPE_AIR_WATERDRAIN" && jsonMsg?.STATUS === 1) {
          let arr = msgList;
          arr.unshift(moment().format("HH:mm:ss") + " 에어 배출 시작");
          setMsgList(arr);
        }
        if (jsonMsg?.CMD === "PIPE_AIR_WATERDRAIN" && jsonMsg?.STATUS === 0) {
          let arr = msgList;
          arr.unshift(moment().format("HH:mm:ss") + " 에어 배출 완료");
          setMsgList(arr);
        }
      } else if (topic === "CCTV") {
        message = message?.toString().replaceAll("\\", "/");
        const msg = message?.toString();
        const jsonMsg = JSON?.parse(msg);
        if (
          jsonMsg?.CMD === "CCTVISOK" &&
          jsonMsg?.STATUS === 1 &&
          jsonMsg?.SUCCESSCOUNT === 1
        ) {
          let arr = msgList;
          arr.unshift(
            moment().format("HH:mm:ss") + " 차량번호 인식 카메라 연결 성공"
          );
          setMsgList(arr);
        }
        if (jsonMsg?.CMD === "CCTVISOK" && jsonMsg?.STATUS === 0) {
          let arr = msgList;
          arr.unshift(
            moment().format("HH:mm:ss") + "차량번호 인식 카메라 실패 재시도중"
          );
          setMsgList(arr);
        }
      }
    });
  }, []);
  let listArr = msgList.map((item, idx) => (
    <li className="alarm_list_item" key={idx}>
      {item}
    </li>
  ));

  return (
    <div className="alarm_container">
      <ul className="alarm_list">{listArr}</ul>
    </div>
  );
};

export default Alarm;
