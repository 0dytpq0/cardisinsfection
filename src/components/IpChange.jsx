import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input, Button, Modal } from "antd";
import { useMqtt } from "../store";

const IpChange = () => {
  const [isModalOpenIp, setIsModalOpenIp] = useState(false);
  const [data, setData] = useState("");
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
        console.log("data", data);
        data = data.replaceAll("`", '"');
        data = JSON.parse(data);
        console.log("data :>> ", data);
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
  const handleOkIp = (e) => {
    setIsModalOpenIp(false);
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
      <Button onClick={showModalIp}>설정</Button>
      <Modal
        title="설정"
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
