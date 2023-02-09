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
import ReactToPrint from 'react-to-print';
import arrivesound from './mp3/carArrived.mp3';
import notrecogsound from './mp3/carNotRecog.mp3';
import ReactDOM from 'react-dom/client';
import PrintCompleted from './components/PrintCompleted';
import Alarm from './components/Alarm';
import moment from 'moment';
import imageToBase64 from 'image-to-base64/browser';

import { useMqtt, useInfo, useWaitingCar } from './store';
import { WindowsFilled } from '@ant-design/icons';
export let client = null;

function App() {
  // const {client,changeClient,connectstatus,changeConnectStatus,payload, }
  // const [client, setClient] = useState(null);
  const [connectstatus, setConnectStatus] = useState('');
  const [payload, setPayload] = useState([]);
  const [isModalOpenPrint, setIsModalOpenPrint] = useState(false);
  const [isModalOpenFind, setIsModalOpenFind] = useState(false);
  const [dbImgUrl, setDbImgUrl] = useState('');
  const [printedList, setPrintedList] = useState([]);
  const {
    waitingcarimg,
    changeCarInfo,
    changeActorInfo,
    changeCheckerInfo,
    changeAreaInfo,
    changeWaitingCarImg,
    changePrintedCar,
    waitingcar,
    printedcar,
    waitingcurrentnumber,
    carinfo,
    actorinfo,
    checkerinfo,
    areainfo,
    deletewaitingcar,
    changeWaitingCar,
    changeCarInfoData,
    carinfodata,
    changeWaitingCurrentNumber,
  } = useInfo();
  const { trashwaitingcar, changeTrashWaitingCar } = useWaitingCar();
  const [carimg, setCarImg] = useState('');
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
  // let carImg = null;
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

  const mqttConnect = (host, options) => {
    setConnectStatus('Connecting');
    client = mqtt.connect(host, options);
  };
  useEffect(() => {
    if (!client) {
      mqttConnect('ws://' + window.location.hostname + ':9001', options);
    }
    if (client) {
      client?.on('connect', () => {
        setConnectStatus('Connected');
      });
      client?.subscribe('#', 0, (error) => {
        if (error) {
          console.log('Subscribe to topics error', error);
          return;
        }
      });
      client?.on('error', (err) => {
        console.error('Connection error: ', err);
        client?.end();
      });
      client?.on('reconnect', () => {
        setConnectStatus('Reconnecting');
      });
      client?.on('message', (topic, message) => {
        const payload = { topic, message: message.toString() };
        if (topic.includes('CCTV')) {
          message = message?.toString()?.replaceAll('\\', '/');

          let msg = JSON.parse(message?.toString());

          if (msg?.CARNUMBER === '미인식') {
            try {
              const audio = new Audio(notrecogsound);
              audio.play();
            } catch (error) {
              console.log('error', error);
            }
          } else if (msg?.CMD !== 'CCTVISOK') {
            try {
              const audio = new Audio(arrivesound);
              audio.play();
            } catch (error) {
              console.log('error', error);
            }
            imgurl = msg?.IMG;

            imgurl = imgurl?.replace('c:/LPR', 'http://127.0.0.1:4000/images');
            imageToBase64(`${imgurl}`) // Image URL
              .then((response) => {
                setDbImgUrl(response);
                // console.log(response); // "iVBORw0KGgoAAAANSwCAIA..."
              })
              .catch((error) => {
                console.log(error); // Logs an error if there was one
              });
            changeWaitingCarImg(imgurl);
          }
        }
        if (topic.includes('CarCleanDeviceRequest')) {
          const msg = message.toString();
          console.log('msg', msg);
          const jsonMsg = JSON.parse(msg);
          if (jsonMsg?.CMD === 'BREAKER') {
            gifImg = Breaker1;
          }
          if (jsonMsg?.CMD === 'REMOVE_WATER') {
            gifImg = Water2;
          }
          if (jsonMsg?.CMD === 'CLEAN_DRIVER') {
            gifImg = Move3;
          }
          if (jsonMsg?.CMD === 'AIR_DEODORIZATION') {
            gifImg = Disinfect4;
          }
          if (jsonMsg?.CMD === 'OUT_GATE') {
            gifImg = Out5;
          }
        }
        setPayload(payload);
      });
      client?.on('disconnect', () => client.end());
    }
  }, []);

  const showModalPrint = () => {
    setIsModalOpenPrint(true);
  };
  const handleOkPrint = (e) => {
    setIsModalOpenPrint(false);
  };
  const handleCancelPrint = () => {
    setIsModalOpenPrint(false);
  };
  const showModalFind = () => {
    setIsModalOpenFind(true);
  };
  const handleOkFind = (e) => {
    setIsModalOpenFind(false);
  };
  const handleCancelFind = () => {
    setIsModalOpenFind(false);
  };
  const onListChange = (e) => {
    let PrintIndex = '';
    let sql = '';
    console.log('e :>> ', e);
    PrintIndex = e.target.dataset.set;
    if (PrintIndex !== '') {
      sql = `http://localhost:4000/carinfoitemsallPrintIndex?PrintIndex=${PrintIndex}`;
    }
    axios.get(sql).then((res, error) => {
      if (error) {
        console.log('error :>> ', error);
      }
      let data = res.data[0];
      console.log('data :>> ', data);
      changeCarInfo({
        PrintIndex: `${data?.PrintIndex}`,
        Number: `${data?.Number}`,
        Address: `${data?.Address}`,
        RegNumber: `${data?.RegNumber}`,
        Phone: `${data?.Phone}`,
        GpsNumber: `${data?.GpsNumber}`,
        Owner: `${data?.Owner}`,
        SPoint: `${data?.SPoint}`,
        Purpose: `${data?.Purpose}`,
        EPoint: `${data?.EPoint}`,
        RegistryDate: `${data?.RegistryDate}`,
      });
      changeActorInfo({
        Attached: `${data?.CAttached}`,
        Name: `${data?.CName}`,
        Phone: `${data?.CPhone}`,
        Position: `${data?.CPosition}`,
        Type: `${data?.Type}`,
      });
      changeCheckerInfo({
        Attached: `${data?.EAttached}`,
        Name: `${data?.EName}`,
        Phone: `${data?.EPhone}`,
        Position: `${data?.EPosition}`,
        Type: `${data?.Type}`,
      });
      changeAreaInfo({
        Area: `${data?.Area}`,
        AreaType: `${data?.AreaType}`,
        DContent: `${data?.DContent}`,
      });
      changeCarInfoData({
        PrintIndex: `${data?.PrintIndex}`,
        Number: `${data?.Number}`,
        Address: `${data?.Address}`,
        RegNumber: `${data?.RegNumber}`,
        Phone: `${data?.Phone}`,
        GpsNumber: `${data?.GpsNumber}`,
        Owner: `${data?.Owner}`,
        SPoint: `${data?.SPoint}`,
        Purpose: `${data?.Purpose}`,
        EPoint: `${data?.EPoint}`,
      });
    });
    // if ((printedcar.length = 9)) {
    //   printedcar.unshift();
    // }
  };
  const onPrintedCar = () => {
    let crTime = moment().format('YYYYMMDDHHmmss');
    changePrintedCar(waitingcar[0]);
    let arr = [{ Number: carinfo.Number, printIndex: crTime }];

    if (arr.length > 9) {
      arr.pop();
    }
    let itemList =
      printedcar.length > 0
        ? printedcar.map((item, idx) => (
            <li
              data-set={item.printIndex}
              onClick={onListChange}
              key={idx}
              className='printedcar_list_item'
            >
              {item.Number}
            </li>
          ))
        : arr.map((item, idx) => (
            <li
              data-set={item.printIndex}
              onClick={onListChange}
              key={idx}
              className='printedcar_list_item'
            >
              {item.Number}
            </li>
          ));
    let rt1 = false;
    console.log(printedcar);
    changePrintedCar(arr);
    axios
      .post('http://localhost:4000/carinfoitems', {
        PrintIndex: crTime,
        Number: `${carinfo?.Number === undefined ? '' : carinfo?.Number}`,
        Address: `${carinfo?.Address}`,
        RegNumber: `${carinfo?.RegNumber}`,
        Phone: `${carinfo?.Phone}`,
        GpsNumber: `${carinfo?.GpsNumber}`,
        Owner: `${carinfo?.Owner}`,
        SPoint: `${carinfo?.SPoint}`,
        Purpose: `${carinfo?.Purpose}`,
        EPoint: `${carinfo?.EPoint}`,
        EAttached: `${actorinfo?.Attached}`,
        EName: `${actorinfo?.Name}`,
        EPhone: `${actorinfo?.Phone}`,
        EPosition: `${actorinfo?.Position}`,
        CAttached: `${checkerinfo?.Attached}`,
        CName: `${checkerinfo?.Name}`,
        CPhone: `${checkerinfo?.Phone}`,
        CPosition: `${checkerinfo?.Position}`,
        Area: `${areainfo?.Area}`,
        AreaType: `${areainfo?.AreaType}`,
        DContent: `${areainfo?.DContent}`,
        PointName: `${areainfo?.PointName}`,
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
      // console.log('dataparsed :>> ', parsedValue.WEPURL);

      // let URL = parsedValue.WEPURL.replace('/disinfect.post.php', '');

      axios
        .post(`http://localhost:4000/websend`, {
          PrintIndex: crTime,
          Number: `${carinfo?.Number}`,
          Address: `${carinfo?.Address}`,
          RegNumber: `${carinfo?.RegNumber}`,
          Phone: `${carinfo?.Phone}`,
          GpsNumber: `${carinfo?.GpsNumber}`,
          Owner: `${carinfo?.Owner}`,
          SPoint: `${carinfo?.SPoint}`,
          Purpose: `${carinfo?.Purpose}`,
          EPoint: `${carinfo?.EPoint}`,
          EAttached: `${actorinfo?.Attached}`,
          EName: `${actorinfo?.Name}`,
          EPhone: `${actorinfo?.Phone}`,
          EPosition: `${actorinfo?.Position}`,
          CAttached: `${checkerinfo?.Attached}`,
          CName: `${checkerinfo?.Name}`,
          CPhone: `${checkerinfo?.Phone}`,
          CPosition: `${checkerinfo?.Position}`,
          Area: `${areainfo?.Area}`,
          AreaType: `${areainfo?.AreaType}`,
          DContent: `${areainfo?.DContent}`,
          PointName: `${areainfo?.PointName}`,
          Image: `${dbImgUrl}`,
          RegistryDate: `${carinfo?.RegistryDate}`,
        })
        .then((res) => {
          console.log('111111 :>> ', 111111);
          console.log('res', res);
        });
    });
  };
  const printFunc = () => {
    if (carinfo?.Number === '' || carinfo?.Number === undefined) {
      message.error('차 번호를 입력해주세요');
      return;
    }

    onPrintedCar();
    let arr = [];
    let arr2 = [];
    arr = trashwaitingcar;
    arr.map((item, idx) =>
      item !== waitingcurrentnumber ? arr2.push(item) : null
    );
    changeTrashWaitingCar(arr2);
    changeCarInfoData({ ...carinfodata, Number: trashwaitingcar[0].Number });
    changeWaitingCar(trashwaitingcar);
    changeWaitingCurrentNumber(arr2[0]);

    let printContents = componentRef.current.innerHTML;
    let windowObject = window.open(
      '',
      'PrintWindow',
      'width=1000, height=1000, top=200, lefg=200, tollbars=no, scrollbars=no, resizeable=no'
    );

    windowObject.document.writeln(printContents);
    windowObject.document.close();

    windowObject.focus();
    setTimeout(() => {
      windowObject.print();
      windowObject.close();
      waitingcar.shift();
    }, 1500);

    console.log('waitingcar', waitingcar);
  };
  const componentRef = useRef(null);

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
            <Button onClick={printFunc}>출력</Button>
            {/* <ReactToPrint
              handleClick={() => {
                console.log("first");
              }}
              trigger={() => {
                return (
                  <Button
                    onClick={() => {
                      console.log("first");
                    }}
                  >
                    출력
                  </Button>
                );
              }}
              content={() => componentRef.current}
            /> */}
            <PrintInfo className='printarea' printRef={componentRef} />
          </Container>
        </Col>

        <Col flex={8}>
          <Col style={{ height: '425px' }}>
            <Row gutter={(8, 8)}>
              <Container
                minWidth={'400px'}
                height={'45vh'}
                width={'1000px'}
                span={6}
                title={'차량정보'}
              >
                <CarinfoContainer></CarinfoContainer>
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
                <div className='printedcar_container'>{printedList}</div>
              </Container>
              <Container
                maxWidth={'40%'}
                height={'45vh'}
                span={8}
                title={'알림'}
              >
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
