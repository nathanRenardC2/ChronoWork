import Timer from "./Timer"
import {useEffect, useState, useRef} from "react"
import ControlButtons from "./ControlButtons"
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'

function Chronometre({setCurrentTime, currentTime, totalTime, currentProgramme, setCurrentProgramme, programmesList, currentProgrammeDuration, setCurrentProgrammeDuration, isInPausedTime, setIsInPausedTime}) {
    const [isActive, setIsActive] = useState(false)
    const [isPaused, setIsPaused] = useState(true)

    let initialised = useRef(false);

    //Function to convert times in seconds
    function convertTimeToSeconds(time){
      var time_split = time.split(":");
      var time_seconds = parseInt(time_split[0])*3600 + parseInt(time_split[1])*60;
      return time_seconds;
    }

    //Function switching the current programme to the next one
    useEffect(() => {

      //Switch to pause state
      if(!isInPausedTime && currentProgrammeDuration.time === 0 && programmesList[currentProgramme]){
        setIsInPausedTime(true);

      //Switch to next programme
      }else if(isInPausedTime && programmesList[currentProgramme] && programmesList[currentProgramme + 1] && currentProgrammeDuration.time_pause === 0){
        setCurrentProgrammeDuration({time : convertTimeToSeconds(programmesList[currentProgramme + 1].time), time_pause: convertTimeToSeconds(programmesList[currentProgramme + 1].time_pause)})
        setCurrentProgramme(currentProgramme + 1)

        //Switch to pause state
        setIsInPausedTime(false);
      }
    }, [currentProgrammeDuration, setCurrentProgrammeDuration, programmesList, currentProgramme, setCurrentProgramme, isInPausedTime, setIsInPausedTime])

    //Function to decrease the current time
    useEffect(() => {
        let interval = null;

        //If it's the very start of the programme, we set the current time duration to the time of the programme
        if(currentTime === totalTime && programmesList[0] && initialised.current === false){
          setCurrentProgramme(0)
          setCurrentProgrammeDuration({time : convertTimeToSeconds(programmesList[0].time), time_pause: convertTimeToSeconds(programmesList[0].time_pause)})
          initialised.current = true;
        }
      
        //Reduce the current time by 1 second
        if (isActive && isPaused === false && currentTime > 0) {
          interval = setInterval(() => {
            setCurrentTime((current) => current - 1);
            isInPausedTime ? setCurrentProgrammeDuration({time: currentProgrammeDuration.time, time_pause: currentProgrammeDuration.time_pause - 1}) : setCurrentProgrammeDuration({time: currentProgrammeDuration.time - 1, time_pause: currentProgrammeDuration.time_pause})
          }, 1000);
        } else {
          clearInterval(interval);
        }
        return () => {
          clearInterval(interval);
        };
      }, [isActive, isPaused, setCurrentTime, currentTime, currentProgramme, setCurrentProgramme, programmesList, totalTime, currentProgrammeDuration, setCurrentProgrammeDuration, isInPausedTime]);

    const handleStart = () => {
      setIsActive(true);
      setIsPaused(false);
    };

    const handlePauseResume = () => {
      setIsPaused(!isPaused);
    };

    return (
      <div className="stop-watch">
        {
          programmesList[currentProgramme] ?
          <CircularProgress 
            value={isInPausedTime ? 
              (currentProgrammeDuration.time_pause / convertTimeToSeconds(programmesList[currentProgramme].time_pause)) * 100
              :
              (currentProgrammeDuration.time / convertTimeToSeconds(programmesList[currentProgramme].time)) * 100
            } 
            color={isInPausedTime ? 'purple.400' : 'blue.600'} 
            size='360px'>
            <CircularProgressLabel>
              <Timer time={isInPausedTime ? currentProgrammeDuration.time_pause : currentProgrammeDuration.time} color={isInPausedTime}/>
            </CircularProgressLabel>
          </CircularProgress>
          :
          <CircularProgress value={(currentProgrammeDuration.time / currentProgrammeDuration.time ) * 100} color='blue.600' size='360px'>
            <CircularProgressLabel>
              <Timer time={currentTime} color={isInPausedTime}/>
            </CircularProgressLabel>
          </CircularProgress>
        }
        

        
        <CircularProgress value={(currentTime / totalTime) * 100} color='blue.600' size='440px' style={{marginTop: -400}}>
          <CircularProgressLabel style={{marginTop: 50, fontSize: 30}}>
            <Timer time={currentTime} color={isInPausedTime}/>
          </CircularProgressLabel>
        </CircularProgress>

        <ControlButtons
          active={isActive}
          isPaused={isPaused}
          handleStart={handleStart}
          handlePauseResume={handlePauseResume}
        />
      </div>
    );

}

export default Chronometre