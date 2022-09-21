function Programme({programme, removeProgramme}){

  return(
    <div className="recap-programme">
        <button onClick={() => removeProgramme(programme.id)}>X</button>
        <li>{programme.name}</li>
        <li>{programme.time}</li>
        <li>{programme.time_pause}</li>
    </div>
  )
}

export default Programme