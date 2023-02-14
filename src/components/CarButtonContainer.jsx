//미사용중, 차량 조회 버튼 클릭시 인풋창에서 조회버튼을 누르면 드는 정보
import React, { useState, useEffect } from 'react';
import '../App.css';
import { Col, List } from 'antd';
import { useListData } from '../store';

function CarButtonContainer({ title, children, dbClick }) {
  const { ZlistData, ZsetListData } = useListData();

  //
  const onClickHandler = (e) => {
    let allData = ZlistData;
    let newData = allData.map((item, idx) => {
      item.Selected = false;
      if (idx === Number(e.currentTarget.dataset.idx)) {
        item.Selected = true;
      }
      return item;
    });
    ZsetListData(newData);
  };

  return (
    <>
      <Col className='buttoncontainer'>
        <List
          style={{ height: '400px', overflow: 'auto' }}
          className='list'
          itemLayout='horizontal'
          dataSource={ZlistData}
          renderItem={(item) => (
            <List.Item
              onDoubleClick={dbClick}
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
