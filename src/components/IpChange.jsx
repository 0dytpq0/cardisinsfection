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
    tcpip,
    tcpport,
    changeTcpIp,
    changeTcpPort,
    mqtturl,
    mqttport,
    changeMqttUrl,
    changeMqttPort,
    compcd,
    changeCompCd,
  } = useMqtt();
  //ip,port,compcd 세팅값 불러옴
  const getData = async () => {
    await axios
      .get(`http://localhost:4000/settingitemsConfig`)
      .then((response) => {
        let data = response.data[0].Value;
        data = data.replaceAll('`', '"');
        data = JSON.parse(data);
        changeTcpIp(data.TCPIP);
        changeTcpPort(data.TCPPORT);
        changeMqttUrl(data.MQTTURL);
        changeMqttPort(data.MQTTPORT);
        changeCompCd(data.COMPCD);
        setData(data);
      });
  };

  useEffect(() => {
    getData();
  }, []);
  const showModalIp = async () => {
    setIsModalOpenIp(true);
  };
  //ok클릭시 핸들러
  const handleOkIp = async (e) => {
    setIsModalOpenIp(false);
    console.log('handleOkIp');
    let bb = {
      TCPIP: tcpip,
      TCPPORT: tcpport,
      MQTTURL: mqtturl,
      MQTTPORT: mqttport,
      COMPCD: compcd,
      WEBURL: `http://cowplan.co.kr/disinfect.post.php`,
    };
    //setting값에 input 입력값을 넣어줌
    let ipValue = JSON.stringify(bb);
    console.log('ipValue');
    await axios
      .put('http://localhost:4000/settingitems', {
        Name: 'Config',
        Value: ipValue,
      })
      .then((res) => {
        console.log('res.statusText :>> ', res.statusText);
      });
  };
  //input 입력값 핸들러
  const handleCancelIp = () => {
    setIsModalOpenIp(false);
  };
  const onChangeTcpIp = (e) => {
    changeTcpIp(e.target.value);
  };
  const onChangeTcpPort = (e) => {
    changeTcpPort(e.target.value);
  };
  const onChangeMqttUrl = (e) => {
    changeMqttUrl(e.target.value);
  };
  const onChangeMqttPort = (e) => {
    changeMqttPort(e.target.value);
  };
  const onChangeCompCd = (e) => {
    changeCompCd(e.target.value);
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
          <Input value={tcpip} onChange={onChangeTcpIp} />
        </label>
        <label>
          TCP PORT
          <Input value={tcpport} onChange={onChangeTcpPort} />
        </label>

        <label>
          MQTT URL
          <Input value={mqtturl} onChange={onChangeMqttUrl} />
        </label>
        <label>
          MQTT PORT
          <Input value={mqttport} onChange={onChangeMqttPort} />
        </label>
        <label>
          COMPCD
          <Input value={compcd} onChange={onChangeCompCd} />
        </label>
      </Modal>
    </div>
  );
};

export default IpChange;
