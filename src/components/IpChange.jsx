import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Input, Button, Modal } from 'antd';
import { useMqtt } from '../store';
import { DollarCircleFilled } from '@ant-design/icons';

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
  } = useMqtt();

  const getData = async () => {
    await axios
      .get(`http://localhost:4000/settingitemsConfig`)
      .then((response) => {
        let data = response.data[0].Value;
        console.log('data', data);
        data = data.replaceAll('`', '"');
        data = JSON.parse(data);
        console.log('data :>> ', data);
        changeTcpIp(data.TCPIP);
        changeTcpPort(data.TCPPORT);
        changeMqttUrl(data.MQTTURL);
        changeMqttPort(data.MQTTPORT);
        setData(data);
      });
  };

  useEffect(() => {
    getData();
  }, []);
  const showModalIp = async () => {
    setIsModalOpenIp(true);
  };
  const handleOkIp = async (e) => {
    setIsModalOpenIp(false);
    console.log('data====', data);
    console.log('tcpip', tcpip);
    console.log('tcpport :>> ', tcpport);
    console.log('mqtturl', mqtturl);
    console.log('mqttport :>> ', mqttport);
    let bb = {
      TCPIP: tcpip,
      TCPPORT: tcpport,
      MQTTURL: mqtturl,
      MQTTPORT: mqttport,
      COMPCD: `C0009`,
      WEBURL: `http://cowplan.co.kr/disinfect.post.php`,
    };

    let ipValue = JSON.stringify(bb);

    await axios
      .put('http://localhost:4000/settingitems', {
        Name: 'Config',
        Value: ipValue,
      })
      .then((res) => {
        console.log('res.statusText :>> ', res.statusText);
      });
  };
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
  return (
    <div>
      <Button onClick={showModalIp}>??????</Button>
      <Modal
        title='??????'
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
      </Modal>
    </div>
  );
};

export default IpChange;
