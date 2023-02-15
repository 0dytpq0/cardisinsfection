import React, { useState, useEffect } from 'react';
import '../App.css';
import { Col, Row, Layout, Button, Modal, List } from 'antd';
import axios from 'axios';

//버튼 클릭시 modal창 띄우는 컨테이너
function AreaButtonHeader({ title, children }) {
  const { Header } = Layout;

  return (
    <>
      <Col className='buttoncontainer'>
        <Header className='header'>{title}</Header>
        <Col>{children}</Col>
      </Col>
    </>
  );
}

export default AreaButtonHeader;
