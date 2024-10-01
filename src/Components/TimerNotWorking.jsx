import { RiPlayLargeFill } from "react-icons/ri";
import { useRef } from "react";
import addEvent from "../utils/addEvent.js";

function TimerNotWorking({ gameInfo, setGameInfo, eventsList, setEventsList }) {
    // Создаём реф для звука
    const startSound = useRef(null);

    const handleClick = () => {
        // Добавляем событие в список
        addEvent(setEventsList, gameInfo.time, 'Start');

        // Воспроизводим звук при нажатии кнопки "Start"
        if (startSound.current) {
            startSound.current.play();
        }

        // Обновляем состояние таймера
        setGameInfo({ ...gameInfo, timer: !gameInfo.timer });
    };

    return (
        <div>
            {/* Аудио для звука запуска таймера */}
            <audio ref={startSound} src="/sounds/slava_kymisy.ogg" />

            <div
                onClick={handleClick}
                className="border-2 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[400px] select-none h-[74px] rounded-tl-[50px] rounded-br-[50px] rounded-tr-[100px] rounded-bl-[100px] flex justify-center items-center font-extrabold text-[26px] dark:text-[#F3F7FF] text-[#282950] dark:bg-[#333560]/50 bg-[#C1C3EC]/50 backdrop-blur-24 hover:scale-105 duration-300 cursor-pointer "
            >
                <div className="flex items-center">
                    <RiPlayLargeFill className="text-[#775CFF] text-[20px] mr-[16px]" />
                    Start
                </div>
            </div>
        </div>
    );
}

export default TimerNotWorking;
