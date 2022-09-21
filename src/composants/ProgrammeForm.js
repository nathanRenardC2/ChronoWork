import "../styles/index.css";
import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";

function ProgrammeForm({addProgramme}) {
    const [name, setName] = useState("");
    const [time, setTime] = useState("");
    const [time_pause, setTime_pause] = useState("");


    function handleSubmit(e){
        e.preventDefault();
        var id = uuidv4();
        if(name !== "" && time !== "" && time_pause !== ""){
            addProgramme({id, name, time, time_pause});
            setName("");
            setTime("");
            setTime_pause("");
        }
    }

    return(
        <form onSubmit={handleSubmit} className="programme-form">
            <h2>Ajouter un programme</h2>
            <div className="programme-input">
                <label htmlFor="name">Nom du programme</label>
                <input 
                    className="input-name"
                    type="text"
                    value={name}
                    onChange={(e) => 
                        setName(e.target.value)
                }/>
            </div>
                <div className="programme-input">
                    <label htmlFor="time">Temps du programme</label>
                    <input 
                        type="time"
                        placeholder="hrs:mins"
                        value={time}
                        onChange={(e) =>
                            setTime(e.target.value)
                        }/>
                </div>
                <div className="programme-input">
                    <label htmlFor="time_pause">Temps de pause</label>
                    <input
                        type="time"
                        placeholder="hrs:mins"
                        value={time_pause}
                        onChange={(e) =>
                            setTime_pause(e.target.value)
                    }/>
                </div>
            <button type="submit">Ajouter</button>
        </form>
    )
}
export default ProgrammeForm

