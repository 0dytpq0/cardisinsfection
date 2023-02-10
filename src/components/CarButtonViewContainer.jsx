// import React from 'react';
// import { Input } from 'antd';
// import { useInfo } from '../store';
// import CarButtonContainer from './CarButtonContainer';
// //미사용중, 차량 조회시 뜨는 input창
// const CarButtonViewContainer = () => {
//   const { ZcarModalInfo, ZsetCarModalInfo } = useInfo();
//   const onChangeCarNumber = (e) => {
//     ZsetCarModalInfo({ ...ZcarModalInfo, Number: e.target.value });
//   };
//   const onChangeCarOwner = (e) => {
//     ZsetCarModalInfo({ ...ZcarModalInfo, Owner: e.target.value });
//   };
//   const onChangeCarPurpose = (e) => {
//     ZsetCarModalInfo({ ...ZcarModalInfo, Purpose: e.target.value });
//   };
//   const onChangeCarRegNumber = (e) => {
//     ZsetCarModalInfo({ ...ZcarModalInfo, RegNumber: e.target.value });
//   };
//   const onChangeCarGpsNumber = (e) => {
//     ZsetCarModalInfo({ ...ZcarModalInfo, GpsNumber: e.target.value });
//   };
//   const onChangeCarAddress = (e) => {
//     ZsetCarModalInfo({ ...ZcarModalInfo, Address: e.target.value });
//   };
//   const onChangeCarPhone = (e) => {
//     ZsetCarModalInfo({ ...ZcarModalInfo, Phone: e.target.value });
//   };
//   const onChangeCarEPoint = (e) => {
//     ZsetCarModalInfo({ ...ZcarModalInfo, EPoint: e.target.value });
//   };
//   const onChangeCarSPoint = (e) => {
//     ZsetCarModalInfo({ ...ZcarModalInfo, SPoint: e.target.value });
//   };
//   return (
//     <div>
//       <CarButtonContainer title={'출입자 정보'}></CarButtonContainer>
//       <Input
//         onChange={onChangeCarNumber}
//         className='input'
//         value={ZcarModalInfo.Number}
//         placeholder='차량 번호'
//       />
//       <Input
//         onChange={onChangeCarPurpose}
//         className='input'
//         value={ZcarModalInfo.Purpose}
//         placeholder='목적'
//       />
//       <Input
//         onChange={onChangeCarRegNumber}
//         className='input'
//         value={ZcarModalInfo.RegNumber}
//         placeholder='등록번호'
//       />
//       <Input
//         onChange={onChangeCarGpsNumber}
//         className='input'
//         value={ZcarModalInfo.GpsNumber}
//         placeholder='GPS번호'
//       />
//       <Input
//         onChange={onChangeCarOwner}
//         className='input'
//         value={ZcarModalInfo.Owner}
//         placeholder='출입자'
//       />

//       <Input
//         onChange={onChangeCarAddress}
//         className='input'
//         value={ZcarModalInfo.Address}
//         placeholder='주소'
//       />
//       <Input
//         onChange={onChangeCarPhone}
//         className='input'
//         value={ZcarModalInfo.Phone}
//         placeholder='연락처'
//       />
//       <Input
//         onChange={onChangeCarSPoint}
//         className='input'
//         value={ZcarModalInfo.SPoint}
//         placeholder='출발지'
//       />
//       <Input
//         onChange={onChangeCarEPoint}
//         className='input'
//         value={ZcarModalInfo.EPoint}
//         placeholder='도착지'
//       />
//     </div>
//   );
// };

// export default CarButtonViewContainer;
