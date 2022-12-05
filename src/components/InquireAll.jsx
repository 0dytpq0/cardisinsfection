import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col, Button, Table } from "antd";

const InquireAll = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [carInfoItems, setCarInfoItems] = useState({});
  const columns = [
    {
      title: "출력일",
      dataIndex: "IssueDate",
    },
    {
      title: "차량번호",
      dataIndex: "Number",
    },
    {
      title: "차주성명",
      dataIndex: "Owner",
    },
    {
      title: "주소",
      dataIndex: "Address",
    },
    {
      title: "연락처",
      dataIndex: "Phone",
    },
    {
      title: "목적",
      dataIndex: "Purpose",
    },
    {
      title: "출발지",
      dataIndex: "EPoint",
    },
    {
      title: "도착지",
      dataIndex: "SPoint",
    },
    {
      title: "소독지역종류",
      dataIndex: "AreaType",
    },
    {
      title: "소독지역",
      dataIndex: "Area",
    },
    {
      title: "소독장소명",
      dataIndex: "PointName",
    },
    {
      title: "소독내용",
      dataIndex: "DContent",
    },
    {
      title: "실시자",
      dataIndex: "EName",
    },
    {
      title: "확인자",
      dataIndex: "CName",
    },
  ];
  const data = [];
  for (let i = 0; i < carInfoItems.length; i++) {
    data.push({
      IssueDate: carInfoItems[i].IssueDate,
      Number: carInfoItems[i].Number,
      Owner: carInfoItems[i].Owner,
      Address: carInfoItems[i].Address,
      Phone: carInfoItems[i].Phone,
      Purpose: carInfoItems[i].Purpose,
      EPoint: carInfoItems[i].EPoint,
      SPoint: carInfoItems[i].SPoint,
      AreaType: carInfoItems[i].AreaType,
      Area: carInfoItems[i].Area,
      PointName: carInfoItems[i].PointName,
      DContent: carInfoItems[i].DContent,
      EName: carInfoItems[i].EName,
      CName: carInfoItems[i].CName,
    });
  }

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  useEffect(() => {
    axios.get("http://localhost:4000/carinfoitemsall").then((res) => {
      let data = res.data.map((_, i) => ({
        IssueDate: `${res.data[i].IssueDate}`,
        Number: `${res.data[i].Number}`,
        Phone: `${res.data[i].Phone}`,
        Owner: `${res.data[i].Owner}`,
        Address: `${res.data[i].Address}`,
        Purpose: `${res.data[i].Purpose}`,
        EPoint: `${res.data[i].EPoint}`,
        SPoint: `${res.data[i].SPoint}`,
        AreaType: `${res.data[i].AreaType}`,
        Area: `${res.data[i].Area}`,
        PointName: `${res.data[i].PointName}`,
        DContent: `${res.data[i].DContent}`,
        EName: `${res.data[i].EName}`,
        CName: `${res.data[i].CName}`,
        Selected: false,
        idx: i,
      }));
      setCarInfoItems(data);
      console.log("data :>> ", data);
    });
  }, []);
  console.log("carInfoItems", carInfoItems);

  return (
    <div>
      <div
        style={{
          marginBottom: 16,
        }}
      >
        <Button
          type="primary"
          onClick={start}
          disabled={!hasSelected}
          loading={loading}
        >
          Reload
        </Button>
        <span
          style={{
            marginLeft: 8,
          }}
        >
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
        </span>
      </div>
      <Table
        scrollToFirstRowOnChange={false}
        scroll={{ x: 500, y: 500 }}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};

export default InquireAll;
