import ProgrammesList from "./ProgrammesList";
import {useState} from "react";
import ProgrammeForm from "./ProgrammeForm";
import Chronometre from "./Chronometre";
import { ChakraProvider } from '@chakra-ui/react'

function App() {

  const [programmesList, setProgrammesList] = useState([]);

  //Variable to store the total time of the programmes in seconds
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  //Variable to store the index of the current programme
  const [currentProgramme, setCurrentProgramme] = useState(null);

  //Duration of the current programme
  const [currentProgrammeDuration, setCurrentProgrammeDuration] = useState({time: 0, time_pause: 0});
  const [isInPausedTime, setIsInPausedTime] = useState(false);

  function addProgramme(programme){
    setProgrammesList([...programmesList, programme]);
    //We split the time and the time_pause
    var time = programme.time.split(":");
    var time_pause = programme.time_pause.split(":");

    //We convert the time and the time_pause to seconds
    var time_seconds = parseInt(time[0])*3600 + parseInt(time[1])*60;
    var time_pause_seconds = parseInt(time_pause[0])*3600 + parseInt(time_pause[1])*60;
    let time_global = time_seconds + time_pause_seconds;
    setCurrentTime(currentTime + time_global);
    setTotalTime(totalTime + time_global);
  }

  function removeProgramme(id){
    setProgrammesList(programmesList.filter((programme) => programme.id !== id));

    var programme = programmesList.filter((programme) => programme.id === id)[0]

    console.log('remove : ' + programme)
    console.log('index : ' + programmesList.indexOf(programme))

    var time = programme.time.split(":");
    var time_pause = programme.time_pause.split(":");

    //We convert the time and the time_pause to seconds
    var time_seconds = parseInt(time[0])*3600 + parseInt(time[1])*60;
    var time_pause_seconds = parseInt(time_pause[0])*3600 + parseInt(time_pause[1])*60;
    let time_global = time_seconds + time_pause_seconds;

    setTotalTime(totalTime - time_global);

    //Remove time from current time if the programme is the current one or if the programme is after the current one
    if(programmesList.indexOf(programme) > currentProgramme){
      setCurrentTime(currentTime - time_global);
    }else if(programmesList.indexOf(programme) === currentProgramme){
      //Remove passed time from current time
      setCurrentTime(currentTime - (currentProgrammeDuration.time + currentProgrammeDuration.time_pause));
    }

    setIsInPausedTime(false);
  }


  return (
    <ChakraProvider>
        <div className="app">
          <div className="legende">
              <div className="legende-bleu">
                Temps de travail
              </div>
              <div className="legende-violet">
                Temps de pause
              </div>
          </div>
          <div className="programme-list">
            <ProgrammeForm addProgramme={addProgramme}/>
            <ProgrammesList programmesList={programmesList} removeProgramme={removeProgramme} totalTime={totalTime}/>
          </div>
          <Chronometre setCurrentTime={setCurrentTime} 
            currentTime={currentTime} 
            totalTime={totalTime} 
            currentProgramme={currentProgramme} 
            setCurrentProgramme={setCurrentProgramme} 
            programmesList={programmesList} 
            currentProgrammeDuration={currentProgrammeDuration} 
            setCurrentProgrammeDuration={setCurrentProgrammeDuration}
            isInPausedTime={isInPausedTime}
            setIsInPausedTime={setIsInPausedTime}    
          />
        </div>
    </ChakraProvider>
  );
}

export default App;
