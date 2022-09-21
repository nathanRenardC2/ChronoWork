function Timer({time, color}) {

    return (
      <div className={color === false ? "blue-600" : "purple-400"}>
        {Math.floor((time / 3600) % 60) !== 0 ? 
          <span className="digits">
            {("0" + Math.floor((time / 3600) % 60)).slice(-2)}:
          </span>
      : null}
        <span className="digits">
          {("0" + Math.floor((time / 60) % 60)).slice(-2)}:
        </span>
        <span className="digits">
          {("0" + Math.floor(time % 60)).slice(-2)}
        </span>
      </div>
    );
  }

  export default Timer