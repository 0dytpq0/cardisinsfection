import React from 'react';
import { useEffect } from 'react';
import { client } from "../App";

const Alarm = () => {
    
    useEffect(()=>{
        client?.on("message", (topic, message) => {
            if (topic.includes("dawoon/iotCtrl")) {
              const msg = message.toString();
              const jsonMsg = JSON.parse(msg);
              if (jsonMsg.CMD === "STATUS_RESPONE") {
                setOpen(jsonMsg.AUTO_MODE === 1 ? true : false);
                setIsClickedBreaker(jsonMsg.BREAKER === 1 ? true : false);
                setIsClickedCleanWater(jsonMsg.REMOVE_WATER === 1 ? true : false);
                setIsClickedCleanDriver(jsonMsg.CLEAN_DRIVER === 1 ? true : false);
                setIsClickedInGate(jsonMsg.IN_GATE === 1 ? true : false);
                setIsClickedCarClean(jsonMsg.CARCLEAN === 1 ? true : false);
                setIsClickedAirDeo(jsonMsg.AIR_DEODORIZATION === 1 ? true : false);
                setIsClickedOutGate(jsonMsg.OUT_GATE === 1 ? true : false);
                setIsClickedPipeAir(jsonMsg.PIPE_AIR_WATERDRAIN === 1 ? true : false);
                setInputStatus(jsonMsg.INPUT_STATUS);
                setOutputStatus(jsonMsg.OUPUT_STATUS);
              }
            }
          });
    }.[])
    return (
        <div>
            
        </div>
    );
};

export default Alarm;