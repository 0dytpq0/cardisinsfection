import React, { useState, useEffect } from 'react';
import '../App.css';
import { Col, Row, Layout, Button, Modal, List } from 'antd';
import axios from 'axios';
import { useInfo, useListData } from '../store';

function CarButtonContainer({ title, children }) {
  const { Header } = Layout;
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [listData, setListData] = useState('');
  const { listData, changeListData } = useListData();
  const {
    changeActorInfo,
    changeCarModalInfo,
    carmodalinfo,
    waitingcurrentnumber,
    carinfodata,
  } = useInfo();
  console.log('waitingcurrentnumber', carinfodata);

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:4000/carinfoitemsall?CarNo=${carinfodata.Number}`)
  //     .then((response) => {
  //       let data = response.data.map((_, i) => ({
  //         Number: `${response.data[i].Number}`,
  //         RegNumber: `${response.data[i].RegNumber}`,
  //         SPoint: `${response.data[i].SPoint}`,
  //         EPoint: `${response.data[i].EPoint}`,
  //         GpsNumber: `${response.data[i].GpsNumber}`,
  //         Purpose: `${response.data[i].Purpose}`,
  //         Owner: `${response.data[i].Owner}`,
  //         Address: `${response.data[i].Address}`,
  //         Phone: `${response.data[i].Phone}`,

  //         Selected: false,
  //         idx: i,
  //       }));
  //       changeListData(data);
  //     });
  // }, [carinfodata.Number]);
  const onClickHandler = (e) => {
    let allData = listData;
    let newData = allData.map((item, idx) => {
      item.Selected = false;
      if (idx === Number(e.currentTarget.dataset.idx)) {
        item.Selected = true;
      }
      return item;
    });
    changeListData(newData);
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
    console.log('carmodalinfo', carmodalinfo);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Col className='buttoncontainer'>
        {/* <Header className='header'> */}
        {/* {title} */}

        {/* <Button onClick={showModal}>조회</Button> */}
        {/* <Modal
            title=''
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          > */}
        <List
          style={{ height: '400px', overflow: 'auto' }}
          className='list'
          itemLayout='horizontal'
          dataSource={listData}
          renderItem={(item) => (
            <List.Item
              onClick={onClickHandler}
              data-idx={item.idx}
              id={item.idx}
              className={item.Selected ? 'active' : null}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div id={item.idx}>
                <h2 id={item.idx} style={{ display: 'inline-block' }}>
                  {item.Number}
                </h2>
                <div id={item.idx} style={{ width: '140px' }}>
                  <div> {item.Owner}</div>
                  <div>{item.Purpose}</div>
                  <div>{item.Address}</div>
                  <div>{item.Phone}</div>
                </div>
              </div>
            </List.Item>
          )}
        />
        {/* </Modal> */}
        {/* </Header> */}
        {/* <Col>{children}</Col> */}
      </Col>
    </>
  );
}

export default CarButtonContainer;
