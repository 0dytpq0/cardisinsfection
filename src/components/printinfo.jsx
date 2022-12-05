import React from "react";
import "../App.css";
import { Row, Col, Divider } from "antd";
import { useInfo } from "../store";
import { ArrowRightOutlined } from "@ant-design/icons";

export default function Printinfo() {
  const { carinfo, areainfo, actorinfo, checkerinfo } = useInfo();
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();
  let date = today.getDate();
  return (
    <>
      <div
        style={{
          padding: "10px",
          overflow: "auto",
          height: "570px",
        }}
      >
        <div className="printinfo">
          <span>일련번호 -</span>
          <h2 style={{ textAlign: "center" }}>소 독 필 증</h2>
          <span>운전자 정보</span>
          <Row className="innerinfo">
            <Row>
              <Col className="font">성명 :</Col>
              <Col className="font">{carinfo?.Owner}</Col>
            </Row>
            <Row>
              <Col className="font">차량 번호 :</Col>
              <Col className="font">{carinfo?.Number}</Col>
            </Row>
            <Row>
              <Col className="font"> 등록 번호 :</Col>
              <Col className="font">{carinfo?.RegNumber}</Col>
            </Row>
            <Row>
              <Col className="font"> GPS 번호 :</Col>
              <Col className="font">{carinfo?.GpsNumber}</Col>
            </Row>

            <Row>
              <Col className="font">주소 :</Col>
              <Col className="font">{carinfo?.Address}</Col>
            </Row>
            <Row>
              <Col className="font">연락처 :</Col>
              <Col className="font">{carinfo?.Phone}</Col>
            </Row>
            <Row>
              <Col className="font">차량 목적 :</Col>
              <Col className="font">{carinfo?.Purpose}</Col>
            </Row>
          </Row>
          <Divider style={{ border: "1px solid rgba(0,0,0,0.8)" }} />
          <span>소득내역</span>
          <div className="innerinfo">
            <Row>
              <Col className="font">소독일시 :</Col>
              <Col className="font">
                {year}/{month}/{date}
              </Col>
            </Row>
            <Row>
              <Col className="font">이동경로 :</Col>
              <Col className="font">
                {carinfo?.SPoint
                  ? carinfo?.SPoint
                  : "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}
                <ArrowRightOutlined />
                {carinfo?.EPoint}
              </Col>
            </Row>
            <Row>
              <Col className="font">소독내용 :</Col>
              <Col className="font">{areainfo.DContent}</Col>
            </Row>
          </div>
          <Divider style={{ border: "1px solid rgba(0,0,0,0.8)" }} />
          <span>소득 실시자</span>
          <div className="innerinfo">
            <Row>
              <Col className="font">소독 지역</Col>
              <Col className="font">{areainfo.Area}</Col>
            </Row>
            <Row>
              <Col className="font">소독 장소명</Col>
              <Col className="font">{areainfo.PointName}</Col>
            </Row>
            <Row>
              <Col className="font">소속</Col>
              <Col className="font">{actorinfo.Attached}</Col>
            </Row>
            <Row>
              <Col className="font">직급</Col>
              <Col className="font">{actorinfo.Position}</Col>
            </Row>
            <Row>
              <Col className="font">성명</Col>
              <Col className="font">{actorinfo.Name}</Col>
            </Row>
          </div>
          <Divider style={{ border: "1px solid rgba(0,0,0,0.8)" }} />
          <h3>
            가축전염병예방법 제 17조 제 3항에 따라 위와 같이 소독을 실시하였음을
            증명합니다
          </h3>
          <div className="checkman">
            소독 실시 확인자
            <Row className="checkman__font">
              <Col className="font">소속 - {checkerinfo.Attached}</Col>
              <Col className="font">직급 - {checkerinfo.Position}</Col>
              <Col className="font">성명 - {checkerinfo.Name}</Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
}
