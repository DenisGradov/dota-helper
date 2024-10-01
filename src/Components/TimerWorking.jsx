import { useState, useEffect, useRef } from "react";
import { formatTime } from "../utils/formatTime.js";
import { RiPauseCircleLine, RiPlayLargeFill, RiStopCircleLine } from "react-icons/ri";
import TimerInfoZone from "./TimerInfoZone.jsx";
import NextRoons from "./NextRoons.jsx";
import { eventConfig } from "../constants/eventConfig.js";

function TimerWorking({ gameInfo, setGameInfo, eventsList, setEventsList }) {
    const [hours, minutes, seconds] = formatTime(gameInfo.time).split(':');

    const roshanConfig = eventConfig.find(event => event.name === "Roshan");
    const aegisConfig = eventConfig.find(event => event.name === "Aegis");

    const [roshanSpawnTime, setRoshanSpawnTime] = useState(roshanConfig.spawnTime); // Таймер для Рошана
    const [aegisDespawnTime, setAegisDespawnTime] = useState(null); // Таймер для Аегиса

    // Добавляем реф для звука Рошана
    const roshanSound = useRef(null);

    // Обновление таймера для Рошана и Аегиса
    useEffect(() => {
        if (gameInfo.timer && !gameInfo.pause) {
            if (roshanSpawnTime !== null && gameInfo.time >= roshanSpawnTime) {
                setRoshanSpawnTime(null); // Рошан заспавнился
                roshanSound.current.play(); // Воспроизведение звука "privet_ot_roshana"
            }
            if (aegisDespawnTime !== null && gameInfo.time >= aegisDespawnTime) {
                setAegisDespawnTime(null); // Аегис пропал
            }
        }
    }, [gameInfo.time, roshanSpawnTime, aegisDespawnTime]);

    // Обработка клика по Рошану (когда Рошан умер)
    const handleRoshanClick = () => {
        setRoshanSpawnTime(gameInfo.time + roshanConfig.spawnTime); // Рошан респавнится через 11 минут
        setAegisDespawnTime(gameInfo.time + aegisConfig.despawnTime); // Аегис пропадает через 5 минут
        roshanSound.current.play(); // Проигрываем звук при клике
    };

    // Обработка клика по Аегису (если выбили Аегис)
    const handleAegisClick = () => {
        setAegisDespawnTime(null); // Убрать Аегис
    };

    const handlePauseClick = () => {
        setGameInfo({ ...gameInfo, pause: !gameInfo.pause });
    };

    const handleStopClick = () => {
        setGameInfo({ timer: false, time: 0, pause: false });
        setEventsList([]);
        setRoshanSpawnTime(roshanConfig.spawnTime); // Сброс таймера Рошана
        setAegisDespawnTime(null); // Удаление Аегиса
    };

    return (
        <div className="h-full w-full">
            <div className="flex justify-center">
                {/* Аудио для звука Рошана */}
                <audio ref={roshanSound} src="/sounds/privet_ot_roshana.ogg" />

                {/* Иконки Рошана и Аегиса */}
                <div className="flex flex-col justify-center items-center mx-[5px] px-[10px] border-2 border-white rounded-l-full bg-[#1a1a2e]">
                    <img
                        alt="roshan"
                        src="roshan.png"
                        onClick={handleRoshanClick} // Клик по иконке Рошана
                        className="my-[2px] w-[35px] rounded-full hover:scale-110 hover:opacity-80 duration-300 cursor-pointer"
                    />
                    <img
                        alt="aegis"
                        src="aegis.png"
                        onClick={handleAegisClick} // Клик по иконке Аегиса
                        className="my-[2px] w-[35px] rounded-full hover:scale-110 hover:opacity-80 duration-300 cursor-pointer"
                    />
                </div>

                {/* Таймер */}
                <div className="border-2 border-white mx-[5px] p-[20px] px-[30px] bg-[#1a1a2e] flex justify-center items-center space-x-2 text-[#FF97BB] text-[30px] font-bold">
                    <div className="flex flex-col items-center">
                        <div style={{ minWidth: '60px', textAlign: 'center' }}>{hours}</div>
                        <span className="text-[12px] text-[#9194C3]">h</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div style={{ minWidth: '60px', textAlign: 'center' }}>{minutes}</div>
                        <span className="text-[12px] text-[#9194C3]">m</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div style={{ minWidth: '60px', textAlign: 'center' }}>{seconds}</div>
                        <span className="text-[12px] text-[#9194C3]">s</span>
                    </div>
                </div>

                {/* Управление таймером */}
                <div className="flex flex-col justify-center items-center mx-[5px] px-[10px] border-2 border-white rounded-r-full bg-[#1a1a2e]">
                    {gameInfo.pause ? (
                        <RiPlayLargeFill
                            onClick={handlePauseClick}
                            className="text-[40px] text-[#68C144] hover:scale-110 hover:opacity-80 duration-300 cursor-pointer"
                        />
                    ) : (
                        <RiPauseCircleLine
                            onClick={handlePauseClick}
                            className="text-[40px] text-[#C1C144] hover:scale-110 hover:opacity-80 duration-300 cursor-pointer"
                        />
                    )}
                    <RiStopCircleLine
                        onClick={handleStopClick}
                        className="text-[40px] text-[#C14544] hover:scale-110 hover:opacity-80 duration-300 cursor-pointer"
                    />
                </div>
            </div>

            {/* Компонент NextRoons для отображения рун, Рошана и Аегиса */}
            <NextRoons
                gameInfo={gameInfo}
                roshanSpawnTime={roshanSpawnTime}
                aegisDespawnTime={aegisDespawnTime}
                handleRoshanClick={handleRoshanClick}
                handleAegisClick={handleAegisClick}
            />

            <TimerInfoZone eventList={eventsList} />
        </div>
    );
}

export default TimerWorking;
