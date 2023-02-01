import React, { useState, useEffect } from 'react';
import '../App.css';
import { Col, Layout, Button, Modal, List } from 'antd';
import axios from 'axios';
import { useInfo } from '../store';

function ActorButtonContainer({ title, children }) {
  const { Header } = Layout;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listData, setListData] = useState('');
  const { changeActorModalInfo } = useInfo();

  //Type이 E인 것들 get
  useEffect(() => {
    axios.get(`http://localhost:4000/OperatoritemsAllE`).then((response) => {
      let data = response.data.map((_, i) => ({
        Name: `${response.data[i].Name}`,
        Attached: `${response.data[i].Attached}`,
        Position: `${response.data[i].Position}`,
        Phone: `${response.data[i].Phone}`,
        Type: `${response.data[i].Type}`,
        Selected: false,
        idx: i,
      }));
      setListData(data);
    });
  }, []);
  //실시자 정보 조회 리스트 클릭 핸들러
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
  //선택된 리스트 정보 input으로 전송
  const handleOk = (e) => {
    setIsModalOpen(false);
    listData.map((item) => {
      if (item.Selected === true) {
        changeActorModalInfo(item);
      }
    });
    const filteredData = listData.filter((item) => item.Selected === true);
    changeActorModalInfo(filteredData[0]);
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

export default ActorButtonContainer;
