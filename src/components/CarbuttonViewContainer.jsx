import React, { useState, useEffect } from "react";
import axios from "axios";

const CarbuttonViewContainer = () => {
  const [listData, setListData] = useState("");
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
  console.log("listData :>> ", listData);
  return <div></div>;
};

export default CarbuttonViewContainer;
