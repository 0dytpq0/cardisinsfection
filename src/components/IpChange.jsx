import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input, Button, Modal } from "antd";
import { useMqtt } from "../store";

const IpChange = () => {
  const [isModalOpenIp, setIsModalOpenIp] = useState(false);
  const [data, setData] = useState("");
  const [parsedValue, setParsedValue] = useState([]);
  const { ip, port, changeIp, changePort } = useMqtt();

  console.log("parsedValue :>> ", parsedValue);
  console.log("ip :>> ", ip);
  console.log("port", port);
  const showModalIp = async () => {
    setIsModalOpenIp(true);
    await axios.get(`http://localhost:4000/settingitemsIP`).then((response) => {
      let data = response.data[0].Value;

      data = data.replaceAll("`", '"');
      setParsedValue(JSON.parse(data));
      changeIp(parsedValue.IP);
      changePort(parsedValue.PORT);
      setData(data);
    });
  };
  const handleOkIp = (e) => {
    setIsModalOpenIp(false);
  };
  const handleCancelIp = () => {
    setIsModalOpenIp(false);
  };
  const onChangeIp = (e) => {
    changeIp(e.target.value);
  };
  const onChangePort = (e) => {
    changePort(e.target.value);
  };
  return (
    <div>
      <Button onClick={showModalIp}>IP설정</Button>
      <Modal
        title="IP,PORT 설정"
        open={isModalOpenIp}
        onOk={handleOkIp}
        onCancel={handleCancelIp}
      >
        <Input placeholder="IP" value={ip} onChange={onChangeIp} />
        <Input placeholder="PORT" value={port} onChange={onChangePort} />
      </Modal>
    </div>
  );
};

export default IpChange;
