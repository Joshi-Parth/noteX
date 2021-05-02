import React, { useState, useEffect } from 'react'

function Pomodoro() {

    const [totalSeconds, setTotalSeconds] = useState(1500);

    const [start, setStart] = useState(false);
    
    let id = null;
    

    const formatTime = (totalSeconds) => {
        let minutes = parseInt(totalSeconds / 60) ;
        let seconds = totalSeconds % 60 ;
        
        if(minutes < 10){
            minutes = '0' + minutes;
        }
        if(seconds < 10){
            seconds = '0' + seconds ;
        }

        return <h1>
            {minutes} : {seconds}
        </h1>
    }

    const handleStart = () => {
        id = setInterval(myTimer, 1000);
    }

    const myTimer = () => {
        setTotalSeconds(totalSeconds => totalSeconds - 1);
    }

    const handleStop = () => {

    }
    return (
        <div>
            <div className="timer">
                {formatTime(totalSeconds)}
            </div>
            <button onClick={handleStart}>
                Start
            </button>
            <button onClick={handleStop}>
                Stop 
            </button>
        </div>
    )
}

export default Pomodoro
