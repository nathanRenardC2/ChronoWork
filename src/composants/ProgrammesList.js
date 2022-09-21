import Programme from "./Programme"

function ProgrammesList({programmesList, removeProgramme, totalTime}) {

    //Function converting the total time in hours and minutes
    //Can be updated later with parameters to choose export format
    function convertTotalTime(){
        var hours = Math.floor(totalTime / 3600);
        var minutes = Math.floor((totalTime - (hours * 3600)) / 60);
        return hours + "h " + minutes + "min";
    }

    return(
        <div>
            <h2>Programmes</h2>
            <ul className="all-programmes">
                {programmesList.map((programme) => 
                    <Programme programme={programme} removeProgramme={removeProgramme} key={programme.id}></Programme>
                )}
            </ul>
            <div>
                    <p>Temps total de révision : {convertTotalTime()} </p>
            </div>
        </div>
    )
}

export default ProgrammesList
