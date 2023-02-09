import React from 'react';
import '../App.css';
import { Col, Row, Layout } from 'antd';
import AutoButton from './AutoSwitch';

function Container({
  title,
  children,
  span,
  height,
  width,
  minWidth,
  maxWidth,
}) {
  const { Header } = Layout;
  return (
    <>
      <Col
        span={span}
        style={{
          height: height,
          width: width,
          minWidth: minWidth,
          maxWidth: maxWidth,
        }}
      >
        <Header className='header'>{title}</Header>
        <Col>{children}</Col>
      </Col>
    </>
  );
}

export default Container;
