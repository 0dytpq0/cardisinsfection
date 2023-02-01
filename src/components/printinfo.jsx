import React from 'react';
import '../App.css';
import { Button, Row, Col, Divider } from 'antd';
import { useInfo } from '../store';
import { ArrowRightOutlined } from '@ant-design/icons';
//왼쪽 영수증에 입력되는 부분
export default function Printinfo({ printRef }) {
  const {
    carinfo,
    areainfo,
    actorinfo,
    checkerinfo,
    waitingcar,
    carinfodata,
    waitingcurrentnumber,
  } = useInfo();
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();
  let date = today.getDate();

  return (
    <>
      <div
        className='printarea'
        ref={printRef}
        style={{
          padding: '10px',
          height: '80vh',
        }}
      >
        <div className='printinfo'>
          <span>일련번호 - {carinfodata?.PrintIndex} </span>
          <h2 style={{ textAlign: 'center' }}>소 독 필 증</h2>
          <span>운전자 정보</span>
          <Row className='innerinfo'>
            <Row>
              <Col className='font'>
                성명 :{' '}
                {carinfodata?.Owner === 'undefined' ? '' : carinfodata?.Owner}
              </Col>
            </Row>
            <Row>
              <Col className='font'>
                차량 번호 :{' '}
                {carinfodata?.Number === 'undefined' ? '' : carinfodata?.Number}
              </Col>
            </Row>
            <Row>
              <Col className='font'>
                등록 번호 :{' '}
                {carinfodata?.RegNumber === 'undefined'
                  ? ''
                  : carinfodata?.RegNumber}
              </Col>
            </Row>
            <Row>
              <Col className='font'>
                GPS 번호 :{' '}
                {carinfodata?.GpsNumber === 'undefined'
                  ? ''
                  : carinfodata?.GpsNumber}
              </Col>
            </Row>

            <Row>
              <Col className='font'>
                주소 :{' '}
                {carinfodata?.Address === 'undefined'
                  ? ''
                  : carinfodata?.Address}
              </Col>
            </Row>
            <Row>
              <Col className='font'>
                연락처 :{' '}
                {carinfodata?.Phone === 'undefined' ? '' : carinfodata?.Phone}
              </Col>
            </Row>
            <Row>
              <Col className='font'>
                차량 목적 :{' '}
                {carinfodata?.Purpose === 'undefined'
                  ? ''
                  : carinfodata?.Purpose}
              </Col>
            </Row>
          </Row>
          <Divider style={{ border: '1px solid rgba(0,0,0,0.8)' }} />
          <span>소득내역</span>
          <div className='innerinfo'>
            <Row>
              <Col className='font'>
                소독일시 : {year}/{month}/{date}
              </Col>
            </Row>
            <Row>
              <Col className='font'>
                이동경로 :{' '}
                {carinfodata?.EPoint === 'undefined'
                  ? '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'
                  : carinfodata?.SPoint}
                <ArrowRightOutlined />
                {carinfodata?.EPoint === 'undefined' ? '' : carinfodata?.EPoint}
              </Col>
            </Row>
            <Row>
              <Col className='font'>소독내용 : {areainfo.DContent}</Col>
            </Row>
          </div>
          <Divider style={{ border: '1px solid rgba(0,0,0,0.8)' }} />
          <span>소득 실시자</span>
          <div className='innerinfo'>
            <Row>
              <Col className='font'>소독 지역 : {areainfo.Area}</Col>
            </Row>
            <Row>
              <Col className='font'>소독 장소명 : {areainfo.PointName}</Col>
            </Row>
            <Row>
              <Col className='font'>소속 : {actorinfo.Attached}</Col>
            </Row>
            <Row>
              <Col className='font'>직급 : {actorinfo.Position}</Col>
            </Row>
            <Row>
              <Col className='font'>성명 : {actorinfo.Name}</Col>
            </Row>
          </div>
          <Divider style={{ border: '1px solid rgba(0,0,0,0.8)' }} />
          <h3>
            가축전염병예방법 제 17조 제 3항에 따라 위와 같이 소독을 실시하였음을
            증명합니다
          </h3>
          <div className='checkman'>
            소독 실시 확인자
            <Row className='checkman__font'>
              <Col className='font'>소속 - {checkerinfo.Attached}</Col>
              <Col className='font'>직급 - {checkerinfo.Position}</Col>
              <Col className='font auth_name'>성명 - {checkerinfo.Name}</Col>
              <img
                className='auth_img'
                src='http://127.0.0.1:4000/images/auth.png'
              />
            </Row>
          </div>
        </div>
      </div>
    </>
  );
}
