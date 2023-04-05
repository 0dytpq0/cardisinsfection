import create from 'zustand';
import { persist } from 'zustand/middleware';
import moment from 'moment';

export const useInfo = create(
  persist((set) => ({
    ZcarInfoData: {},
    ZsetCarInfoData: (newData) =>
      set((state) => ({
        ZcarInfoData: newData,
      })),
    ZcarInfo: {},
    ZsetCarInfo: (newData) =>
      set((state) => ({
        ZcarInfo: newData,
      })),
    ZcarModalInfo: {},
    ZsetCarModalInfo: (newData) =>
      set((state) => ({
        ZcarModalInfo: newData,
      })),
    ZareaInfo: {},
    ZsetAreaInfo: (newData) =>
      set((state) => ({
        ZareaInfo: newData,
      })),
    ZcheckerInfo: {},
    ZsetCheckerInfo: (newData) =>
      set((state) => ({
        ZcheckerInfo: newData,
      })),
    ZcheckerModalInfo: {},
    ZsetCheckerModalInfo: (newData) =>
      set((state) => ({
        ZcheckerModalInfo: newData,
      })),
    ZactorInfo: {},
    ZsetActorInfo: (newData) =>
      set((state) => ({
        ZactorInfo: newData,
      })),
    ZactorModalInfo: {},
    ZsetActorModalInfo: (newData) =>
      set((state) => ({
        ZactorModalInfo: newData,
      })),
    ZwaitingCar: [],
    ZwaitingCurrentNumber: '',
    ZsetWaitingCar: (newData) =>
      set((state) => ({
        ZwaitingCar: newData,
      })),
    ZwaitingCarClear: (newData) =>
      set((state) => ({
        ZwaitingCar: [],
      })),
    ZdeleteWaitingCar: '',
    ZsetDeleteWaitingCar: (newData) =>
      set((state) => ({
        ZdeleteWaitingCar: newData,
      })),
    ZsetWaitingCurrentNumber: (newData) =>
      set((state) => ({
        ZwaitingCurrentNumber: newData,
      })),
    ZprintedCar: [],
    ZsetPrintedCar: (newData) =>
      set((state) => ({
        ZprintedCar: newData,
      })),
    ZwaitingCarImg: [],
    ZsetWaitingCarImg: (newData) =>
      set((state) => ({
        ZwaitingCarImg: newData,
      })),

    ZisPrint: false,
    ZsetIsPrint: (newData) =>
      set((state) => ({
        ZisPrint: newData,
      })),
    ZprintIndex: moment().format('YYYYMMDDHHmmss'),
    ZsetIsPrintIndex: (newData) =>
      set((state) => ({
        ZprintIndex: newData,
      })),
  }))
);

export const useListData = create(
  persist((set) => ({
    ZlistData: '',
    ZsetListData: (newData) =>
      set((state) => ({
        ZlistData: newData,
      })),
  }))
);

export const useMqtt = create(
  persist((set) => ({
    ZtcpIp: '',
    ZsetTcpIp: (newData) =>
      set((state) => ({
        ZtcpIp: newData,
      })),
    ZtcpPort: null,
    ZsetTcpPort: (newData) =>
      set((state) => ({
        ZtcpPort: newData,
      })),
    ZmqttUrl: '',
    ZsetMqttUrl: (newData) =>
      set((state) => ({
        ZmqttUrl: newData,
      })),
    ZmqttPort: null,
    ZsetMqttPort: (newData) =>
      set((state) => ({
        ZmqttPort: newData,
      })),
    ZcompCd: null,
    ZsetCompCd: (newData) =>
      set((state) => ({
        ZcompCd: newData,
      })),
    ZconnectStatus: 'Connecting',
    ZsetConnectStatus: (newData) =>
      set((state) => ({
        ZconnectStatus: newData,
      })),
    ZimgUrl: '',
    ZsetImgUrl: (newData) =>
      set((state) => ({
        ZimgUrl: newData,
      })),
  }))
);
export const useCheckNode = create(
  persist((set) => ({
    ZisNodeOk: false,
    ZsetIsNodeOk: (newData) =>
      set((state) => ({
        ZisNodeOk: newData,
      })),
  }))
);
export const useWaitingCar = create((set) => ({
  ZtrashWaitingCar: [],
  ZsetTrashWaitingCar: (newData) =>
    set((state) => ({
      ZtrashWaitingCar: newData,
    })),
  ZtrashWaitingCarClear: (newData) =>
    set((state) => ({
      ZtrashWaitingCar: [],
    })),
}));
