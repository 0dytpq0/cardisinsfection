import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Button, Table, DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import { Excel } from 'antd-table-saveas-excel';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const InquireAll = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [carInfoItems, setCarInfoItems] = useState([]);
  const dateFormat = 'YYYY/MM/DD';

  const [startDate, setStartDate] = useState(moment().format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(moment().format('YYYY-MM-DD'));
  const columns = [
    {
      title: '출력일',
      dataIndex: 'PrintIndex',
    },
    {
      title: '차량번호',
      dataIndex: 'Number',
    },
    {
      title: '차주성명',
      dataIndex: 'Owner',
    },
    {
      title: '주소',
      dataIndex: 'Address',
    },
    {
      title: '연락처',
      dataIndex: 'Phone',
    },
    {
      title: '목적',
      dataIndex: 'Purpose',
    },
    {
      title: '출발지',
      dataIndex: 'EPoint',
    },
    {
      title: '도착지',
      dataIndex: 'SPoint',
    },
    {
      title: '소독지역종류',
      dataIndex: 'AreaType',
    },
    {
      title: '소독지역',
      dataIndex: 'Area',
    },
    {
      title: '소독장소명',
      dataIndex: 'PointName',
    },
    {
      title: '소독내용',
      dataIndex: 'DContent',
    },
    {
      title: '실시자',
      dataIndex: 'EName',
    },
    {
      title: '확인자',
      dataIndex: 'CName',
    },
  ];

  const { RangePicker } = DatePicker;

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const excelButton = () => {
    const excel = new Excel();
    excel
      .addSheet(startDate + '-' + endDate)
      .addColumns(columns)
      .addDataSource(carInfoItems, {
        str2Percent: true,
      })
      .saveAs(startDate + '-' + endDate + '-소독데이터.xlsx');
  };
  const searchButton = () => {
    searchData();
  };
  const searchData = () => {
    console.log('startDate', startDate);
    console.log('endDate', endDate);
    let sql =
      'http://localhost:4000/carinfoitemsDate?SDate=' +
      startDate +
      '&EDate=' +
      endDate +
      '';
    console.log('sql :>> ', sql);
    axios.get(sql).then((res) => {
      console.log('res.data', res);
      let arr = res.data;
      arr.map((item, i) => {
        item = { ...item, key: i };
      });
      console.log('arr', arr);
      setCarInfoItems(arr);
    });
  };

  useEffect(() => {
    searchData();
  }, [startDate, endDate]);
  const onHandleCalender = (e) => {
    console.log('e', e);
    if (e !== null) {
      if (e[0] !== null) {
        let Sday = e[0].$D.toString().padStart(2, '0');
        let Syear = e[0].$y;
        let Smonth = (e[0].$M + 1).toString().padStart(2, '0');
        setStartDate(`${Syear}-${Smonth}-${Sday}`);
        console.log('startDate', startDate);
      }
      if (e[1] !== null) {
        let Eday = e[1].$D.toString().padStart(2, '0');
        let Eyear = e[1].$y;
        let Emonth = (e[1].$M + 1).toString().padStart(2, '0');
        setEndDate(`${Eyear}-${Emonth}-${Eday}`);
        console.log('EndDate', endDate);
      }
    }
  };

  return (
    <div>
      <div
        style={{
          marginBottom: 16,
        }}
      >
        <span
          style={{
            marginLeft: 8,
          }}
        ></span>
      </div>
      <Table scroll={{ y: 400 }} columns={columns} dataSource={carInfoItems} />
      <RangePicker
        onChange={onHandleCalender}
        defaultValue={[
          dayjs('2022-02-01', dateFormat),
          dayjs('2022-12-06', dateFormat),
        ]}
        format={dateFormat}
      />
      <Button onClick={searchButton}>조회</Button>
      <Button onClick={excelButton}>엑셀</Button>
    </div>
  );
};

export default InquireAll;
