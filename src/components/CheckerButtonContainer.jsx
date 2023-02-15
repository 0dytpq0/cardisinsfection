import React, { useState, useEffect } from 'react';
import '../App.css';
import { Col, Layout, Button, Modal, List } from 'antd';
import axios from 'axios';

import { useInfo } from '../store';

//확인자 정보 조회 클릭시
function CheckerButtonContainer({ title, children }) {
  const { Header } = Layout;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ZlistData, setZlistData] = useState('');
  const { ZsetCheckerInfo, ZsetCheckerModalInfo } = useInfo();
  //Type이 C인 근무자 전부 get
  useEffect(() => {
    axios.get(`http://localhost:4000/OperatoritemsAllC`).then((response) => {
      let data = response.data.map((_, i) => ({
        Name: `${response.data[i].Name}`,
        Attached: `${response.data[i].Attached}`,
        Position: `${response.data[i].Position}`,
        Phone: `${response.data[i].Phone}`,
        Type: `${response.data[i].Type}`,
        Selected: false,
        idx: i,
      }));
      setZlistData(data);
    });
  }, []);
  //데이터 클릭시 핸들러
  const onClickHandler = (e) => {
    let allData = ZlistData;
    let newData = allData.map((item, idx) => {
      item.Selected = false;
      if (idx === Number(e.currentTarget.dataset.idx)) {
        item.Selected = true;
      }
      return item;
    });
    setZlistData(newData);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  //클릭한 데이터 정보 전달
  const handleOk = (e) => {
    setIsModalOpen(false);
    // ZlistData.map((item) => {
    //   if (item.Selected === true) {
    //     ZsetCheckerModalInfo(item);
    //   }
    // });

    const filteredData = ZlistData.filter((item) => item.Selected === true);
    ZsetCheckerModalInfo(filteredData[0]);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Col className='buttoncontainer'>
        <Header className='header'>
          {title}

          <Button onClick={showModal}>조회</Button>
          <Modal
            title=''
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <List
              style={{ height: '400px', overflow: 'auto' }}
              className='list'
              itemLayout='horizontal'
              dataSource={ZlistData}
              renderItem={(item) => (
                <List.Item
                  onDoubleClick={handleOk}
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
                      {item.Name}
                    </h2>
                    <div id={item.idx} style={{ width: '140px' }}>
                      {item.Attached}
                      {'\u00A0'}
                      {item.Position}
                      {'\u00A0'} <br />
                      {item.Phone}
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </Modal>
        </Header>
        <Col>{children}</Col>
      </Col>
    </>
  );
}

export default CheckerButtonContainer;
