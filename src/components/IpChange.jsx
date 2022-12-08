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
        console.log("data :>> ", data);
        setParsedValue(JSON.parse(data));
        console.log("parsedValue :>> ", parsedValue);
        changeTcpIp(parsedValue.TCPIP);
        changeTcpPort(parsedValue.TCPPORT);
        changeMqttUrl(parsedValue.MQTTURL);
        changeMqttPort(parsedValue.MQTTPORT);
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
      <Button onClick={showModalIp}>IP설정</Button>
      <Modal
        title="설정"
        open={isModalOpenIp}
        onOk={handleOkIp}
        onCancel={handleCancelIp}
      >
        <label>
          TCPIP
          <Input value={tcpip} onChange={onChangeTcpIp} />
          <Input value={tcpport} onChange={onChangeTcpPort} />
        </label>
        <label>
          MQTT
          <Input value={mqtturl} onChange={onChangeMqttUrl} />
          <Input value={mqttport} onChange={onChangeMqttPort} />
        </label>
      </Modal>
    </div>
  );
};

export default IpChange;
