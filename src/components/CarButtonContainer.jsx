import React, { useState, useEffect } from "react";
import "../App.css";
import { Col, Row, Layout, Button, Modal, List } from "antd";
import axios from "axios";
import { useInfo } from "../store";

function CarButtonContainer({ title, children }) {
  const { Header } = Layout;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listData, setListData] = useState("");
  const { changeActorInfo, changeCarModalInfo, carmodalinfo } = useInfo();

  useEffect(() => {
    axios.get(`http://localhost:4000/carinfoitemsall`).then((response) => {
      let data = response.data.map((_, i) => ({
        Number: `${response.data[i].Number}`,
        Purpose: `${response.data[i].Purpose}`,
        Owner: `${response.data[i].Owner}`,
        Address: `${response.data[i].Address}`,
        Phone: `${response.data[i].Phone}`,
        EPoint: `${response.data[i].EPoint}`,
        SPoint: `${response.data[i].SPoint}`,
        Selected: false,
        idx: i,
      }));
      setListData(data);
    });
  }, []);
  const onClickHandler = (e) => {
    let allData = listData;
    let newData = allData.map((item, idx) => {
      item.Selected = false;
      if (idx === Number(e.currentTarget.dataset.idx)) {
        item.Selected = true;
      }
      return item;
    });
    setListData(newData);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = (e) => {
    setIsModalOpen(false);
    // listData.map((item) => {
    //   if (item.Selected === true) {
    //     changeCarModalInfo(item);
    //   }
    // });
    const filteredData = listData.filter((item) => item.Selected === true);
    changeCarModalInfo(filteredData[0]);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Col className="buttoncontainer">
        <Header className="header">
          {title}

          <List
            style={{ height: "400px", overflow: "auto" }}
            className="list"
            itemLayout="horizontal"
            dataSource={listData}
            renderItem={(item) => (
              <List.Item
                onClick={onClickHandler}
                data-idx={item.idx}
                id={item.idx}
                className={item.Selected ? "active" : null}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div id={item.idx}>
                  <h2 id={item.idx} style={{ display: "inline-block" }}>
                    {item.Owner}
                  </h2>
                  <div id={item.idx} style={{ width: "140px" }}>
                    {item.Purpose}
                    {"\u00A0"}
                    {item.Address}
                    {"\u00A0"} <br />
                    {item.Phone}
                  </div>
                </div>
              </List.Item>
            )}
          />
        </Header>
        <Col>{children}</Col>
      </Col>
    </>
  );
}

export default CarButtonContainer;
