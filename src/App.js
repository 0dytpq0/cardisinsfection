import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import { Col, Row, Button, Layout, Modal, message } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';
import axios from 'axios';
import Container from './components/Container';
import WaitingContainer from './components/WaitingContainer';
import CarinfoContainer from './components/CarinfoContainer';
import IpChange from './components/IpChange';
import gifImg from './image/disinfection.gif';
import Breaker1 from './image/Breaker1.gif';
import Water2 from './image/Water2.gif';
import Move3 from './image/Move3.gif';
import Disinfect4 from './image/Disinfect4.gif';
import Out5 from './image/Out5.gif';
import PrintInfo from './components/PrintInfo';
import AutoSwitch from './components/AutoSwitch';
import * as mqtt from 'mqtt/dist/mqtt.min';
import WaitingCar from './components/WaitingCar';
import InquireAll from './components/InquireAll';
import arrivesound from './mp3/carArrived.mp3';
import notrecogsound from './mp3/carNotRecog.mp3';
import ReactDOM from 'react-dom/client';
import PrintCompleted from './components/PrintCompleted';
import Alarm from './components/Alarm';
import moment from 'moment';
import imageToBase64 from 'image-to-base64/browser';
import ReactToPrint from 'react-to-print';
import PrintButton from './components/PrintButton';
import { useMqtt, useInfo, useWaitingCar, useCheckNode } from './store';
import { WindowsFilled } from '@ant-design/icons';
export let client = null;

function App() {
  // const {client,changeClient,connectstatus,changeConnectStatus,payload, }
  // const [client, setClient] = useState(null);
  const [payload, setPayload] = useState([]);
  const [isModalOpenFind, setIsModalOpenFind] = useState(false);
  const [dbImgUrl, setDbImgUrl] = useState('');
  const {
    ZsetWaitingCarImg,
    ZsetPrintedCar,
    ZwaitingCar,
    ZprintedCar,
    ZwaitingCurrentNumber,
    ZcarInfo,
    ZactorInfo,
    ZcheckerInfo,
    ZareaInfo,
    ZsetWaitingCar,
    ZsetCarInfoData,
    ZcarInfoData,
    ZsetWaitingCurrentNumber,
    ZisPrint,
    ZsetIsPrintIndex,
  } = useInfo();
  const { ZsetConnectStatus, ZconnectStatus, ZimgUrl, ZsetImgUrl } = useMqtt();
  const { ZisNodeOk, ZsetIsNodeOk } = useCheckNode();
  const { ZtrashWaitingCar, ZsetTrashWaitingCar } = useWaitingCar();
  //mqtt 옵션
  const options = {
    keepalive: 3000,
    protocolId: 'MQTT',
    protocolVersion: 4,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 10 * 60 * 1000,
    will: {
      topic: 'WillMsg',
      payload: 'Connection Closed abnormally..!',
      qos: 0,
      retain: false,
    },
    rejectUnauthorized: false,
  };
  let imgurl = '';
  var str = 'TIME20221201113500';
  let bytes = []; // char codes
  var bytesv2 = []; // char codes
  for (var i = 0; i < str.length; ++i) {
    var code = str.charCodeAt(i);

    bytes = bytes.concat([code]);

    bytesv2 = bytesv2.concat([code & 0xff, (code / 256) >>> 0]);
  }
  bytes.unshift(2);
  bytes.push(3);

  //mqtt connect
  const mqttConnect = (host, options) => {
    ZsetConnectStatus('Connecting');
    client = mqtt.connect(host, options);
  };
  //client가 없으면 재시도, 있으면 커넥트
  useEffect(() => {
    ZsetIsPrintIndex(moment().format('YYYYMMDDHHmmss'));
    if (!client) {
      console.log('mqtt 연결 실패');
      mqttConnect('ws://' + window.location.hostname + ':9001', options);
    }
    if (client) {
      console.log('client null 아님');
      client?.on('connect', () => {
        console.log('mqtt연결성공');
        ZsetConnectStatus('Connected');
        client.publish('mqtt-client', 'mqtt-client connected');
      });
      client?.subscribe('#', 0, (error) => {
        if (error) {
          console.log('Subscribe to topics error', error);

          return;
        }
      });
      client?.on('error', (err) => {
        console.error('Connection error: ', err);
        client.publish('mqtt-client', 'mqtt-client disconnected');

        client?.end();
      });
      client?.on('reconnect', () => {
        console.log('reconnect');
        client.publish('mqtt-client', 'mqtt-client reconnected');

        ZsetConnectStatus('Reconnecting');
      });
      client?.on('message', (topic, message) => {
        const payload = { topic, message: message.toString() };
        console.log('message받았습니다.');
        //카메라에서 차량이 인식인지 미인식인지에 대한 오디오 출력 밑 이미지 변환
        if (topic.includes('CCTV')) {
          console.log('CCTV topic 있습니다.');
          message = message?.toString()?.replaceAll('\\', '/');

          let msg = JSON.parse(message?.toString());
          console.log('받은 메세지', msg);
          if (msg?.CARNUMBER === '미인식') {
            try {
              console.log('차 번호 미인식 받은 메세지', msg);
              const audio = new Audio(notrecogsound);
              audio.play();
            } catch (error) {
              console.log('error', error);
            }
          } else if (msg?.CMD !== 'CCTVISOK') {
            try {
              console.log('cmd cctvisok 받은 메세지', msg);
              const audio = new Audio(arrivesound);
              audio.play();
            } catch (error) {
              console.log('error', error);
            }
            imgurl = msg?.IMG;
            console.log('ZimgUrl', ZimgUrl);
            // imgurl = imgurl?.replace('c:/LPR', ZimgUrl);
            console.log('imgurl', imgurl);
            if (imgurl) {
              imageToBase64(`${imgurl}`) // Image URL
                .then((response) => {
                  setDbImgUrl(response);
                })
                .catch((error) => {
                  console.log(error); // Logs an error if there was one
                });
              ZsetWaitingCarImg(imgurl);
              let arr = [];

              arr = ZwaitingCar;
              arr.push(msg?.CARNUMBER);

              arr = arr.filter((item) => item !== undefined);
              arr = arr.filter((item) => item !== null);
              ZsetTrashWaitingCar(arr);
              if (ZwaitingCar.length === 1) {
                ZsetWaitingCurrentNumber(arr[0]);
              }

              arr = [];
            }
          }
        }
        //상태정보창의 gif를 CMD에 따라서 변화시킨다.
        if (topic.includes('CarCleanDeviceRequest')) {
          console.log('topic CarCleanDeviceRequest 받았어요');
          const msg = message.toString();
          const jsonMsg = JSON.parse(msg);
          if (jsonMsg?.CMD === 'BREAKER') {
            console.log('cmd breaker 받았어요');
            gifImg = Breaker1;
          }
          if (jsonMsg?.CMD === 'REMOVE_WATER') {
            console.log('cmd REMOVE_WATER 받았어요');
            gifImg = Water2;
          }
          if (jsonMsg?.CMD === 'CLEAN_DRIVER') {
            console.log('cmd CLEAN_DRIVER 받았어요');
            gifImg = Move3;
          }
          if (jsonMsg?.CMD === 'AIR_DEODORIZATION') {
            console.log('cmd AIR_DEODORIZATION 받았어요');
            gifImg = Disinfect4;
          }
          if (jsonMsg?.CMD === 'OUT_GATE') {
            console.log('cmd OUT_GATE 받았어요');
            gifImg = Out5;
          }
        }
        setPayload(payload);
      });
      client?.on(
        'disconnect',
        () => client.end(),
        console.log('연결 끊겼어요')
      );
    }
    //node와 통신이 되는지 확인
    axios.get('http://localhost:4000/Time').then((res) => {
      if (res.data.Time !== undefined) {
        ZsetIsNodeOk(true);
      }
    });
  }, [ZprintedCar]);

  const showModalFind = () => {
    setIsModalOpenFind(true);
  };
  const handleOkFind = (e) => {
    setIsModalOpenFind(false);
  };
  const handleCancelFind = () => {
    setIsModalOpenFind(false);
  };

  //출력 함수

  const onPrintedCar = () => {
    let crTime = moment().format('YYYYMMDDHHmmss');
    //ZprintedCar에 초기값을 넣어줘서 arr.unshift 에러가 안나게하였다.
    ZsetPrintedCar(ZtrashWaitingCar[0]);
    let arr = ZprintedCar;
    arr.unshift({ Number: ZcarInfoData?.Number, PrintIndex: crTime });

    if (arr.length > 8) {
      arr.pop();
    }

    let rt1 = false;
    ZsetPrintedCar(arr);
    axios
      .post('http://localhost:4000/carInfoitems', {
        PrintIndex: crTime,
        Number: `${
          ZcarInfoData?.Number === undefined ? '' : ZcarInfoData?.Number
        }`,
        Address: `${ZcarInfoData?.Address}`,
        RegNumber: `${ZcarInfoData?.RegNumber}`,
        Phone: `${ZcarInfoData?.Phone}`,
        GpsNumber: `${ZcarInfoData?.GpsNumber}`,
        Owner: `${ZcarInfoData?.Owner}`,
        SPoint: `${ZcarInfoData?.SPoint}`,
        Purpose: `${ZcarInfoData?.Purpose}`,
        EPoint: `${ZcarInfoData?.EPoint}`,
        EAttached: `${ZactorInfo?.Attached}`,
        EName: `${ZactorInfo?.Name}`,
        EPhone: `${ZactorInfo?.Phone}`,
        EPosition: `${ZactorInfo?.Position}`,
        CAttached: `${ZcheckerInfo?.Attached}`,
        CName: `${ZcheckerInfo?.Name}`,
        CPhone: `${ZcheckerInfo?.Phone}`,
        CPosition: `${ZcheckerInfo?.Position}`,
        Area: `${ZareaInfo?.Area}`,
        AreaType: `${ZareaInfo?.AreaType}`,
        DContent: `${ZareaInfo?.DContent}`,
        PointName: `${ZareaInfo?.PointName}`,
        ImagePath: `${dbImgUrl}`,
      })
      .then((res) => {
        console.log('res :>> ', res);
        if (res.statusText === 'OK') {
          rt1 = true;
          Modal.success({
            content: `저장 성공!`,
          });
        } else {
          rt1 = false;
          Modal.error({
            content: `저장 실패!`,
          });
        }
      });

    axios.get('http://localhost:4000/settingitemsConfig').then((res) => {
      let data = res.data[0].Value;
      data = data.replaceAll('`', '"');
      let parsedValue = JSON.parse(data);

      // let URL = parsedValue.WEPURL.replace('/disinfect.post.php', '');

      axios
        .post(`http://localhost:4000/websend`, {
          PrintIndex: crTime,
          Number: `${ZcarInfoData?.Number}`,
          Address: `${ZcarInfoData?.Address}`,
          RegNumber: `${ZcarInfoData?.RegNumber}`,
          Phone: `${ZcarInfoData?.Phone}`,
          GpsNumber: `${ZcarInfoData?.GpsNumber}`,
          Owner: `${ZcarInfoData?.Owner}`,
          SPoint: `${ZcarInfoData?.SPoint}`,
          Purpose: `${ZcarInfoData?.Purpose}`,
          EPoint: `${ZcarInfoData?.EPoint}`,
          EAttached: `${ZactorInfo?.Attached}`,
          EName: `${ZactorInfo?.Name}`,
          EPhone: `${ZactorInfo?.Phone}`,
          EPosition: `${ZactorInfo?.Position}`,
          CAttached: `${ZcheckerInfo?.Attached}`,
          CName: `${ZcheckerInfo?.Name}`,
          CPhone: `${ZcheckerInfo?.Phone}`,
          CPosition: `${ZcheckerInfo?.Position}`,
          Area: `${ZareaInfo?.Area}`,
          AreaType: `${ZareaInfo?.AreaType}`,
          DContent: `${ZareaInfo?.DContent}`,
          PointName: `${ZareaInfo?.PointName}`,
          Image: `${dbImgUrl}`,
          RegistryDate: `${ZcarInfoData?.RegistryDate}`,
        })
        .then((res) => {});
    });
  };
  const componentRef = useRef(null);

  const printFunc = () => {
    // if (ZcarInfo?.Number === '' || ZcarInfo.Number === undefined) {
    //   message.error('차 번호를 입력해주세요');
    //   return;
    // }

    onPrintedCar();
    //ZisPrint로 false시에는 대기저장의 자동차 목록을 지우지않고 true시에만 지우게 했다.
    //대기저장을 클릭한다면 true 아니라면 false
    //이 것으로 대기저장에 목록ㅇ리 없을 시에 Number를 못읽어서 출력이 안되던 것도 사라짐
    if (ZisPrint === true) {
      let arr = [];
      let arr2 = [];
      arr = ZtrashWaitingCar;
      arr2 =
        arr &&
        arr.map((item, idx) =>
          item !== ZwaitingCurrentNumber ? arr2.push(item) : null
        );

      ZsetTrashWaitingCar(arr2);
      ZsetCarInfoData({ ...ZcarInfoData, Number: arr2[0].Number });
      ZsetWaitingCurrentNumber(arr2[0]);
    }

    // let printContents = componentRef.current.innerHTML;
    // let windowObject = window.open(
    //   '',
    //   'PrintWindow',
    //   'width=700, height=1000, top=200, lefg=200, tollbars=no, scrollbars=no, resizeable=no,itemSize=50'
    // );

    // windowObject.document.writeln(printContents);
    // windowObject.document.close();

    // windowObject.focus();
    // setTimeout(() => {
    //   windowObject.print();
    //   windowObject.close();
    //   ZwaitingCar.shift();
    // }, 1500);
  };

  return (
    <>
      <Row>
        <Col>
          <Button onClick={showModalFind}>조회</Button>
          <Modal
            style={{ height: '60vh' }}
            bodyStyle={{ overflowX: 'auto', overflowY: 'auto' }}
            width='700'
            open={isModalOpenFind}
            onOk={handleOkFind}
            onCancel={handleCancelFind}
            footer={[
              <Button key='submit' type='primary' onClick={handleOkFind}>
                닫기
              </Button>,
            ]}
          >
            <InquireAll />
          </Modal>
        </Col>
        <Col>
          <IpChange />
        </Col>
      </Row>

      <Row
        wrap={false}
        style={{ height: '93vh', overflow: 'hidden' }}
        gutter={(8, 8)}
      >
        <Col style={{ width: '300px' }} flex={2}>
          <Container title={'소독필증'}>
            {/* <Button onClick={printFunc}>출력</Button> */}
            <PrintButton onPrintedCar={printFunc} />

            <PrintInfo className='printarea' printRef={componentRef} />
          </Container>
        </Col>

        <Col flex={8}>
          <Col
            style={{
              height: '425px',
            }}
          >
            <Row
              style={{ display: 'flex', flexWrap: 'nowrap' }}
              gutter={(8, 8)}
            >
              <Container
                minWidth={'400px'}
                height={'45vh'}
                span={6}
                title={'차량정보'}
              >
                <CarinfoContainer />
              </Container>
              <WaitingContainer height={'45vh'} span={5} title={'대기저장'}>
                <WaitingCar />
              </WaitingContainer>
              <Container
                maxWidth={'200px'}
                height={'45vh'}
                span={5}
                title={'프린트완료차량'}
              >
                <PrintCompleted />
              </Container>
              <Container height={'45vh'} span={8} title={'알림'}>
                <Alarm />
              </Container>
            </Row>
          </Col>
          <Col>
            <AutoSwitch title={'상태정보'}>
              <img
                style={{ width: '99%', height: '50vh', marginTop: '10px' }}
                src={gifImg}
              />
            </AutoSwitch>
          </Col>
        </Col>
      </Row>
    </>
  );
}

export default App;
