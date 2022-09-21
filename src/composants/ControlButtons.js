function ControlButtons({active, isPaused, handleStart, handlePauseResume}) {
  const StartButton = (
    <div className="btn btn-one btn-start"
         onClick={handleStart}>
      Start
    </div>
  );
  
  const ActiveButtons = (
    <div className="btn-grp">
      <div className="btn btn-one" 
           onClick={handlePauseResume}>
        {isPaused ? "Resume" : "Pause"}
      </div>
    </div>
  );
  
  return (
    <div className="Control-Buttons">
      <div>{active ? ActiveButtons : StartButton}</div>
    </div>
  );
}

export default ControlButtons