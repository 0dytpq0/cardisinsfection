import React, { useState, useEffect } from "react";
import { Col, Row, Layout, Button, Modal, List } from "antd";
import { useInfo } from "../store";
import axios from "axios";

const ActorButtonContainer = () => {
  const [listData, setListData] = useState("");
  const { changeActorInfo, actorinfo } = useInfo();

  useEffect(() => {
    axios.get(`http://localhost:4000/OperatoritemsAll`).then((response) => {
      let data = response.data.map((_, i) => ({
        Name: `${response.data[i].Name}`,
        Attached: `${response.data[i].Attached}`,
        Position: `${response.data[i].Position}`,
        Phone: `${response.data[i].Phone}`,
        Type: `${response.data[i].Type}`,
        Selected: false,
        idx: i,
      }));
      data[0].Selected = true;
      setListData(data);
    });
  }, []);

  const onClickHandler = (e) => {
    let allData = listData;
    allData.map((item, idx) => {
      item.Selected = false;
      if (idx === Number(e.currentTarget.dataset.idx)) {
        item.Selected = true;
      }
    });
    setListData(allData);
    listData.map((item) => {
      if (item.Selected === true) {
        changeActorInfo(item);
        console.log("actorinfo", actorinfo);
      }
    });
  };

  return (
    <div>
      <List
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
                {item.Name}
              </h2>
              <div id={item.idx} style={{ width: "140px" }}>
                {item.Attached}
                {"\u00A0"}
                {item.Position}
                {"\u00A0"} <br />
                {item.Phone}
              </div>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ActorButtonContainer;
