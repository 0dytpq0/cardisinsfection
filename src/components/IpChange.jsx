import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Input, Button, Modal } from 'antd';
import { useMqtt } from '../store';
import { DollarCircleFilled } from '@ant-design/icons';

//왼쪽 상단 설정버튼
const IpChange = () => {
  const [isModalOpenIp, setIsModalOpenIp] = useState(false);
  const [data, setData] = useState('');
  const [parsedValue, setParsedValue] = useState([]);
  const {
    ZtcpIp,
    ZtcpPort,
    ZsetTcpIp,
    ZsetTcpPort,
    ZmqttUrl,
    ZmqttPort,
    ZsetMqttUrl,
    ZsetMqttPort,
    ZcompCd,
    ZsetCompCd,
  } = useMqtt();
  //ip,port,ZcompCd 세팅값 불러옴
  const getData = async () => {
    await axios
      .get(`http://localhost:4000/settingitemsConfig`)
      .then((response) => {
        let data = response.data[0].Value;
        data = data.replaceAll('`', '"');
        data = JSON.parse(data);
        ZsetTcpIp(data.TCPIP);
        ZsetTcpPort(data.TCPPORT);
        ZsetMqttUrl(data.MQTTURL);
        ZsetMqttPort(data.MQTTPORT);
        ZsetCompCd(data.COMPCD);
        setData(data);
      });
  };

  useEffect(() => {
    getData();
  }, []);
  const showModalIp = async () => {
    setIsModalOpenIp(true);
  };
  const handleCancelIp = () => {
    setIsModalOpenIp(false);
  };
  //ok클릭시 핸들러
  const handleOkIp = async (e) => {
    setIsModalOpenIp(false);
    let settingObj = {
      TCPIP: ZtcpIp,
      TCPPORT: ZtcpPort,
      MQTTURL: ZmqttUrl,
      MQTTPORT: ZmqttPort,
      COMPCD: ZcompCd,
      WEBURL: `http://cowplan.co.kr/disinfect.post.php`,
    };
    //setting값에 input 입력값을 넣어줌
    let configValue = JSON.stringify(settingObj);
    console.log('configValue');
    await axios
      .put('http://localhost:4000/settingitems', {
        Name: 'Config',
        Value: configValue,
      })
      .then((res) => {
        console.log('res.statusText :>> ', res.statusText);
      });
  };
  //input 입력값 핸들러

  const onChangeTcpIp = (e) => {
    ZsetTcpIp(e.target.value);
  };
  const onChangeTcpPort = (e) => {
    ZsetTcpPort(e.target.value);
  };
  const onChangeMqttUrl = (e) => {
    ZsetMqttUrl(e.target.value);
  };
  const onChangeMqttPort = (e) => {
    ZsetMqttPort(e.target.value);
  };
  const onChangeCompCd = (e) => {
    ZsetCompCd(e.target.value);
  };
  return (
    <div>
      <Button onClick={showModalIp}>설정</Button>
      <Modal
        title='설정'
        open={isModalOpenIp}
        onOk={handleOkIp}
        onCancel={handleCancelIp}
      >
        <label>
          TCP IP
          <Input value={ZtcpIp} onChange={onChangeTcpIp} />
        </label>
        <label>
          TCP PORT
          <Input value={ZtcpPort} onChange={onChangeTcpPort} />
        </label>

        <label>
          MQTT URL
          <Input value={ZmqttUrl} onChange={onChangeMqttUrl} />
        </label>
        <label>
          MQTT PORT
          <Input value={ZmqttPort} onChange={onChangeMqttPort} />
        </label>
        <label>
          COMPCD
          <Input value={ZcompCd} onChange={onChangeCompCd} />
        </label>
      </Modal>
    </div>
  );
};

export default IpChange;
