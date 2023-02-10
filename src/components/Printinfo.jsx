import React from 'react';
import '../App.css';
import { Button, Row, Col, Divider } from 'antd';
import { useInfo } from '../store';
import { ArrowRightOutlined } from '@ant-design/icons';
//왼쪽 영수증에 입력되는 부분
export default function Printinfo({ printRef }) {
  const {
    ZcarInfo,
    ZareaInfo,
    ZactorInfo,
    ZcheckerInfo,
    ZwaitingCar,
    ZcarInfoData,
    ZwaitingCurrentNumber,
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
          <span>일련번호 - {ZcarInfoData?.PrintIndex} </span>
          <h2 style={{ textAlign: 'center' }}>소 독 필 증</h2>
          <span>운전자 정보</span>
          <Row className='innerinfo'>
            <Row>
              <Col className='font'>
                성명 :{' '}
                {ZcarInfoData?.Owner === 'undefined' ? '' : ZcarInfoData?.Owner}
              </Col>
            </Row>
            <Row>
              <Col className='font'>
                차량 번호 :{' '}
                {ZcarInfoData?.Number === 'undefined'
                  ? ''
                  : ZcarInfoData?.Number}
              </Col>
            </Row>
            <Row>
              <Col className='font'>
                등록 번호 :{' '}
                {ZcarInfoData?.RegNumber === 'undefined'
                  ? ''
                  : ZcarInfoData?.RegNumber}
              </Col>
            </Row>
            <Row>
              <Col className='font'>
                GPS 번호 :{' '}
                {ZcarInfoData?.GpsNumber === 'undefined'
                  ? ''
                  : ZcarInfoData?.GpsNumber}
              </Col>
            </Row>

            <Row>
              <Col className='font'>
                주소 :{' '}
                {ZcarInfoData?.Address === 'undefined'
                  ? ''
                  : ZcarInfoData?.Address}
              </Col>
            </Row>
            <Row>
              <Col className='font'>
                연락처 :{' '}
                {ZcarInfoData?.Phone === 'undefined' ? '' : ZcarInfoData?.Phone}
              </Col>
            </Row>
            <Row>
              <Col className='font'>
                차량 목적 :{' '}
                {ZcarInfoData?.Purpose === 'undefined'
                  ? ''
                  : ZcarInfoData?.Purpose}
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
                {ZcarInfoData?.EPoint === 'undefined'
                  ? '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'
                  : ZcarInfoData?.SPoint}
                <ArrowRightOutlined />
                {ZcarInfoData?.EPoint === 'undefined'
                  ? ''
                  : ZcarInfoData?.EPoint}
              </Col>
            </Row>
            <Row>
              <Col className='font'>소독내용 : {ZareaInfo.DContent}</Col>
            </Row>
          </div>
          <Divider style={{ border: '1px solid rgba(0,0,0,0.8)' }} />
          <span>소득 실시자</span>
          <div className='innerinfo'>
            <Row>
              <Col className='font'>소독 지역 : {ZareaInfo.Area}</Col>
            </Row>
            <Row>
              <Col className='font'>소독 장소명 : {ZareaInfo.PointName}</Col>
            </Row>
            <Row>
              <Col className='font'>소속 : {ZactorInfo.Attached}</Col>
            </Row>
            <Row>
              <Col className='font'>직급 : {ZactorInfo.Position}</Col>
            </Row>
            <Row>
              <Col className='font'>성명 : {ZactorInfo.Name}</Col>
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
              <Col className='font'>소속 - {ZcheckerInfo.Attached}</Col>
              <Col className='font'>직급 - {ZcheckerInfo.Position}</Col>
              <Col className='font auth_name'>성명 - {ZcheckerInfo.Name}</Col>
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
