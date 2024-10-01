import './App.scss'
import TimerBlock from "./Components/TimerBlock.jsx";
import {useEffect, useState} from "react";
function App() {

    const [eventsList, setEventsList] = useState([])
    const [gameInfo, setGameInfo] = useState({
        timer: false,
        time: 0,
        pause: false,
    })
    useEffect(() => {
        console.log(eventsList)
    }, [eventsList]);
  return (
    <div className="flex flex-col items-center bg-[#282950] w-[100vw] h-[100vh]">
        <div className="flex justify-center items-center">
            <h1 className="m-[5px] text-[#F3F7FF] text-[50px] font-bold">Dota Helper</h1>
            <a href="https://github.com/DenisGradov" target="_blank" className="hover:text-[#946DFF] m-[5px] text-[14px] font-light text-[#9194C3] animate-tilt">by Denys Hradov</a>
        </div>
        <TimerBlock eventsList={eventsList} setEventsList={setEventsList} gameInfo={gameInfo} setGameInfo={setGameInfo}/>
    </div>
  )
}

export default App
