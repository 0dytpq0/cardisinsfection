import create from "zustand";
import { persist } from "zustand/middleware";

export const useInfo = create(
  persist((set) => ({
    carinfodata: {},
    changeCarInfoData: (newData) =>
      set((state) => ({
        carinfodata: newData,
      })),
    carinfo: {},
    changeCarInfo: (newData) =>
      set((state) => ({
        carinfo: newData,
      })),
    carmodalinfo: {},
    changeCarModalInfo: (newData) =>
      set((state) => ({
        carmodalinfo: newData,
      })),
    areainfo: {},
    changeAreaInfo: (newData) =>
      set((state) => ({
        areainfo: newData,
      })),
    checkerinfo: {},
    changeCheckerInfo: (newData) =>
      set((state) => ({
        checkerinfo: newData,
      })),
    checkermodalinfo: {},
    changeCheckerModalInfo: (newData) =>
      set((state) => ({
        checkermodalinfo: newData,
      })),
    actorinfo: {},
    changeActorInfo: (newData) =>
      set((state) => ({
        actorinfo: newData,
      })),
    actormodalinfo: {},
    changeActorModalInfo: (newData) =>
      set((state) => ({
        actormodalinfo: newData,
      })),
    waitingcar: [],
    waitingcurrentnumber: "",
    changeWaitingCar: (newData) =>
      set((state) => ({
        waitingcar: newData,
      })),
    deletewaitingcar: "",
    changeDeleteWaitingCar: (newData) =>
      set((state) => ({
        deletewaitingcar: newData,
      })),
    changeWaitingCurrentNumber: (newData) =>
      set((state) => ({
        waitingcurrentnumber: newData,
      })),
    printedcar: [],
    changePrintedCar: (newData) =>
      set((state) => ({
        printedcar: newData,
      })),
  }))
);

export const useMqtt = create(
  persist((set) => ({
    client: null,
    changeClient: (newData) =>
      set((state) => ({
        client: newData,
      })),
    connectstatus: "",
    changeConnectStatus: (newData) =>
      set((state) => ({
        connectstatus: newData,
      })),
    payload: [],
    changePayload: (newData) =>
      set((state) => ({
        payload: newData,
      })),
    options: {
      keepalive: 3000,
      protocolId: "MQTT",
      protocolVersion: 4,
      clean: true,
      reconnectPeriod: 1000,
      connectTimeout: 10 * 60 * 1000,
      will: {
        topic: "WillMsg",
        payload: "Connection Closed abnormally..!",
        qos: 0,
        retain: false,
      },
      rejectUnauthorized: false,
    },
    tcpip: "",
    changeTcpIp: (newData) =>
      set((state) => ({
        tcpip: newData,
      })),
    tcpport: null,
    changeTcpPort: (newData) =>
      set((state) => ({
        tcpport: newData,
      })),
    mqtturl: "",
    changeMqttUrl: (newData) =>
      set((state) => ({
        mqtturl: newData,
      })),
    mqttport: null,
    changeMqttPort: (newData) =>
      set((state) => ({
        mqttport: newData,
      })),
  }))
);

export const useWaitingCar = create((set) => ({
  trashwaitingcar: [],
  changeTrashWaitingCar: (newData) =>
    set((state) => ({
      trashwaitingcar: newData,
    })),
}));
