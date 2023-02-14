import React from 'react';
import { useEffect, useState } from 'react';
import { client } from '../App';
import moment from 'moment';
import { useMqtt, useCheckNode } from '../store';

//mqtt 수신후 웹 우측 상단 알람창에 띄움
const Alarm = () => {
  //알림창 메세지 리스트 변수
  const { ZisNodeOk, ZsetIsNodeOk } = useCheckNode();
  const [msgList, setMsgList] = useState([]);
  const { ZsetConnectStatus, ZconnectStatus } = useMqtt();
  useEffect(() => {
    //mqtt 통신 연결 됬는지 확인
    if (ZconnectStatus === 'Connecting') {
      let arr = msgList;
      arr.unshift(moment().format('HH:mm:ss') + ' MQTT 연결중');
      setMsgList(arr);
      console.log('mqtt 연결중');
    } else if (ZconnectStatus === 'Connected') {
      let arr = msgList;
      arr.unshift(moment().format('HH:mm:ss') + ' MQTT 연결성공');
      setMsgList(arr);
      console.log('mqtt 연결성공');
    } else if (ZconnectStatus === 'Reconnecting') {
      let arr = msgList;
      arr.unshift(moment().format('HH:mm:ss') + ' MQTT  연결 재시도중');
      setMsgList(arr);
      console.log('mqtt 연결 재시도중');
    }
    //node 연결 됬는지 확인
    if (ZisNodeOk === true) {
      let arr = msgList;
      arr.unshift(moment().format('HH:mm:ss') + ' Node서버와의 연결 성공.');
      setMsgList(arr);
    } else {
      let arr = msgList;
      arr.unshift(moment().format('HH:mm:ss') + ' Node서버와의 연결 실패.');
      setMsgList(arr);
    }
    client?.on('message', (topic, message) => {
      if (topic.includes('CarCleanDeviceRequest')) {
        console.log('알림창 mqtt 수신');
        const msg = message.toString();
        const jsonMsg = JSON.parse(msg);
        //수동 동작,자동 동작에 대한 mqtt
        if (jsonMsg?.CMD === 'AUTO_MODE' && jsonMsg?.STATUS === 1) {
          let arr = msgList;
          arr.unshift(moment().format('HH:mm:ss') + ' 자동모드');
          setMsgList(arr);
          console.log('자동모드');
        }
        if (jsonMsg?.CMD === 'AUTO_MODE' && jsonMsg?.STATUS === 0) {
          let arr = msgList;
          arr.unshift(moment().format('HH:mm:ss') + ' 수동모드');
          setMsgList(arr);
          console.log('수동모드');
        }
        if (jsonMsg?.CMD === 'BREAKER' && jsonMsg?.STATUS === 1) {
          let arr = msgList;
          arr.unshift(moment().format('HH:mm:ss') + ' 차단기 올림');
          setMsgList(arr);
          console.log('차단기올림');
        }

        if (jsonMsg?.CMD === 'BREAKER' && jsonMsg?.STATUS === 0) {
          let arr = msgList;
          arr.unshift(moment().format('HH:mm:ss') + ' 차단기 내림');
          setMsgList(arr);
          console.log('차단기 내림');
        }
        if (jsonMsg?.CMD === 'In_Gate' && jsonMsg?.STATUS === 1) {
          let arr = msgList;
          arr.unshift(moment().format('HH:mm:ss') + ' 입구문 열림');
          setMsgList(arr);
          console.log('입구문 열림');
        }
        if (jsonMsg?.CMD === 'In_Gate' && jsonMsg?.STATUS === 0) {
          let arr = msgList;
          arr.unshift(moment().format('HH:mm:ss') + ' 입구문 닫힘');
          setMsgList(arr);
          console.log('입구문 닫힘');
        }
        if (jsonMsg?.CMD === 'REMOVE_WATER' && jsonMsg?.STATUS === 1) {
          let arr = msgList;
          arr.unshift(moment().format('HH:mm:ss') + ' 물기제거 가동');
          setMsgList(arr);
          console.log('물기제거 가동');
        }
        if (jsonMsg?.CMD === 'REMOVE_WATER' && jsonMsg?.STATUS === 0) {
          let arr = msgList;
          arr.unshift(moment().format('HH:mm:ss') + ' 물기제거 완료');
          setMsgList(arr);
          console.log('물기제거 완료');
        }
        if (jsonMsg?.CMD === 'CLEAN_DRIVER' && jsonMsg?.STATUS === 1) {
          let arr = msgList;
          arr.unshift(moment().format('HH:mm:ss') + ' 운전자 소독 시작');
          setMsgList(arr);
          console.log('운전자 소독 시작');
        }
        if (jsonMsg?.CMD === 'CLEAN_DRIVER' && jsonMsg?.STATUS === 0) {
          let arr = msgList;
          arr.unshift(moment().format('HH:mm:ss') + ' 운전자 소독 완료');
          setMsgList(arr);
          console.log('운전자 소독 완료');
        }
        if (jsonMsg?.CMD === 'CARCLEAN' && jsonMsg?.STATUS === 1) {
          let arr = msgList;
          arr.unshift(moment().format('HH:mm:ss') + ' 차량 소독 시작');
          setMsgList(arr);
          console.log('차량 소독 시작');
        }
        if (jsonMsg?.CMD === 'CARCLEAN' && jsonMsg?.STATUS === 0) {
          let arr = msgList;
          arr.unshift(moment().format('HH:mm:ss') + ' 차량 소독 완료');
          setMsgList(arr);
          console.log('차량 소독 완료');
        }
        if (jsonMsg?.CMD === 'AIR_DEODORIZATION' && jsonMsg?.STATUS === 1) {
          let arr = msgList;
          arr.unshift(moment().format('HH:mm:ss') + ' 공기정화 시작');
          setMsgList(arr);
          console.log('공기정화 시작');
        }
        if (jsonMsg?.CMD === 'AIR_DEODORIZATION' && jsonMsg?.STATUS === 0) {
          let arr = msgList;
          arr.unshift(moment().format('HH:mm:ss') + ' 공기정화 완료');
          setMsgList(arr);
          console.log('공기정화 완료');
        }
        if (jsonMsg?.CMD === 'OUT_GATE' && jsonMsg?.STATUS === 1) {
          let arr = msgList;
          arr.unshift(moment().format('HH:mm:ss') + ' 출구문 열림');
          setMsgList(arr);
          console.log('출구문 열림');
        }
        if (jsonMsg?.CMD === 'OUT_GATE' && jsonMsg?.STATUS === 0) {
          let arr = msgList;
          arr.unshift(moment().format('HH:mm:ss') + ' 출구문 닫힘');
          setMsgList(arr);
          console.log('출구문 닫힘');
        }
        if (jsonMsg?.CMD === 'PIPE_AIR_WATERDRAIN' && jsonMsg?.STATUS === 1) {
          let arr = msgList;
          arr.unshift(moment().format('HH:mm:ss') + ' 에어 배출 시작');
          setMsgList(arr);
          console.log('에어 배출 시작');
        }
        if (jsonMsg?.CMD === 'PIPE_AIR_WATERDRAIN' && jsonMsg?.STATUS === 0) {
          let arr = msgList;
          arr.unshift(moment().format('HH:mm:ss') + ' 에어 배출 완료');
          setMsgList(arr);
          console.log('에어 배출 완료');
        }
        //카메라 연결 성공 여부
      } else if (topic === 'CCTV') {
        console.log('카메라 연결 수신 완료');
        message = message?.toString().replaceAll('\\', '/');
        const msg = message?.toString();
        const jsonMsg = JSON?.parse(msg);
        if (
          jsonMsg?.CMD === 'CCTVISOK' &&
          jsonMsg?.STATUS === 1 &&
          jsonMsg?.SUCCESSCOUNT === 1
        ) {
          let arr = msgList;
          arr.unshift(
            moment().format('HH:mm:ss') + ' 차량번호 인식 카메라 연결 성공'
          );
          setMsgList(arr);
          console.log('카메라 인식 성공');
        }
        if (jsonMsg?.CMD === 'CCTVISOK' && jsonMsg?.STATUS === 0) {
          let arr = msgList;
          arr.unshift(
            moment().format('HH:mm:ss') + '차량번호 인식 카메라 실패 재시도중'
          );
          setMsgList(arr);
          console.log('카메라 인식 실패');
        }
      }
    });
  }, [msgList, ZconnectStatus]);
  let alarmList = msgList.map((item, idx) => (
    <li className='alarm_list_item' key={idx}>
      {item}
    </li>
  ));

  return (
    <div className='alarm_container'>
      <ul className='alarm_list'>{alarmList}</ul>
    </div>
  );
};

export default Alarm;
