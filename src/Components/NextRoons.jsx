import { useEffect, useState, useRef } from "react";
import { formatTimeWithoutMs } from "../utils/formatTime.js";
import { RiTimeFill } from "react-icons/ri";
import { eventConfig } from "../constants/eventConfig.js"; // Импорт конфига
import { getFromLocalStorage, saveToLocalStorage } from "../utils/localStorage.js";

function NextRoons({ gameInfo, roshanSpawnTime, aegisDespawnTime, handleRoshanClick, handleAegisClick }) {
    const [nextRuneTimes, setNextRuneTimes] = useState([]);

    // Загрузим настройки аудио из localStorage при первом рендере
    const [soundEnabled, setSoundEnabled] = useState(() => getFromLocalStorage("audioSettings", {
        runeSpawn: false,
        runeSoon: false,
        timerStart: false,
    }));

    const [playedSounds, setPlayedSounds] = useState({
        runeSoon: {},
        runeSpawn: {},
        timerStart: false,
    });

    const lotusSoonSound = useRef(null); // Жёлтая иконка лотуса (скоро появится)
    const lotusSpawnSound = useRef(null); // Лотус появился
    const roshanSound = useRef(null); // Рошан появился
    const aegisSound = useRef(null); // Выпала Аега
    const timerSound = useRef(null); // Запуск таймера

    // Звук при первом рендере таймера (при старте)
    useEffect(() => {
        if (gameInfo.timer && soundEnabled.timerStart && !playedSounds.timerStart) {
            timerSound.current.play(); // Проигрываем звук "slava_kymisy.ogg"
            setPlayedSounds((prev) => ({ ...prev, timerStart: true }));
        }

        // Сброс состояния таймера при остановке
        if (!gameInfo.timer) {
            setPlayedSounds((prev) => ({ ...prev, timerStart: false }));
        }
    }, [gameInfo.timer, soundEnabled.timerStart, playedSounds.timerStart]);

    useEffect(() => {
        if (gameInfo.timer) {
            const nextTimes = eventConfig
                .filter((event) => event.interval) // Выбираем только руны с интервалами
                .map((event) => {
                    const timeSinceStart = gameInfo.time % event.interval;
                    const nextTime = event.interval - timeSinceStart;
                    return {
                        name: event.name,
                        timeUntilNext: nextTime,
                        img: event.img, // Путь к изображению
                        icon: event.icon, // Иконка руны
                    };
                });

            const sortedTimes = nextTimes.sort((a, b) => a.timeUntilNext - b.timeUntilNext);
            setNextRuneTimes(sortedTimes);

            sortedTimes.forEach((rune) => {
                if (rune.timeUntilNext <= rune.icon.soonThreshold && soundEnabled.runeSoon && !playedSounds.runeSoon[rune.name]) {
                    if (rune.name === "Lotus Pools") {
                        lotusSoonSound.current.play();
                    }
                    setPlayedSounds((prev) => ({ ...prev, runeSoon: { ...prev.runeSoon, [rune.name]: true } }));
                }

                if (rune.timeUntilNext <= 0 && soundEnabled.runeSpawn && !playedSounds.runeSpawn[rune.name]) {
                    if (rune.name === "Lotus Pools") {
                        lotusSpawnSound.current.play();
                    } else if (rune.name === "Bounty Runes") {
                        moneySound.current.play();
                    } else if (rune.name === "Wisdom Runes") {
                        wisdomSpawnSound.current.play();
                    }
                    setPlayedSounds((prev) => ({ ...prev, runeSpawn: { ...prev.runeSpawn, [rune.name]: true } }));
                }

                if (rune.timeUntilNext > rune.icon.soonThreshold) {
                    setPlayedSounds((prev) => ({
                        ...prev,
                        runeSoon: { ...prev.runeSoon, [rune.name]: false },
                        runeSpawn: { ...prev.runeSpawn, [rune.name]: false },
                    }));
                }
            });
        }
    }, [gameInfo.time, soundEnabled, playedSounds]);

    const getIconColor = (rune) => {
        if (!rune.icon?.show) return null;

        if (rune.timeUntilNext <= rune.icon.verySoonThreshold) return "#FF0000"; // Очень скоро
        if (rune.timeUntilNext <= rune.icon.soonThreshold) return "#FFFF00"; // Скоро

        return null;
    };

    // Сохраняем настройки аудио в localStorage при их изменении
    useEffect(() => {
        saveToLocalStorage("audioSettings", soundEnabled);
    }, [soundEnabled]);

    const toggleSound = (soundType) => {
        setSoundEnabled((prev) => ({
            ...prev,
            [soundType]: !prev[soundType],
        }));
    };

    return (
        <div className="bg-[#1a1a2e] p-[20px] m-auto mt-[20px] flex flex-col justify-start items-center border-2 rounded w-full max-w-[800px]">
            {/* Аудио для звуков */}
            <audio ref={lotusSoonSound} src="/sounds/lotus.ogg" />
            <audio ref={lotusSpawnSound} src="/sounds/my.ogg" />
            <audio ref={roshanSound} src="/sounds/privet_ot_roshana.ogg" />
            <audio ref={aegisSound} src="/sounds/I_am_immortal.ogg" />
            <audio ref={timerSound} src="/sounds/slava_kymisy.ogg" />

            {/* Рошан */}
            {roshanSpawnTime !== null && (
                <div className="mb-2 flex items-center justify-between w-full">
                    <div className="flex items-center">
                        {roshanSpawnTime - gameInfo.time <= 3 * 60 * 1000 ? (
                            <RiTimeFill className="mr-2 text-[1.5em]" style={{ color: "#FFFF00" }} />
                        ) : null}
                        <span className="text-[#9194C3] mr-2">Рошан появится через:</span>
                        <span className="text-white">
                            {roshanSpawnTime === null
                                ? "уже"
                                : formatTimeWithoutMs(roshanSpawnTime - gameInfo.time)}
                        </span>
                    </div>
                    <img
                        alt="roshan"
                        src="roshan.png"
                        className="w-[32px]"
                        onClick={() => {
                            handleRoshanClick(); // Логика клика по кнопке Рошана
                            roshanSound.current.play(); // Проигрываем звук при нажатии
                        }}
                    />
                </div>
            )}

            {/* Аегис */}
            {aegisDespawnTime !== null && (
                <div className="mb-2 flex items-center justify-between w-full">
                    <div className="flex items-center">
                        <RiTimeFill className="mr-2 text-[1.5em]" style={{ color: "#0000FF" }} />
                        <span className="text-[#9194C3] mr-2">Аегис пропадет через:</span>
                        <span className="text-white">
                            {formatTimeWithoutMs(aegisDespawnTime - gameInfo.time)}
                        </span>
                    </div>
                    <img
                        alt="aegis"
                        src="/aegis.png"
                        className="w-[32px]"
                        onClick={handleAegisClick}
                    />
                </div>
            )}

            {/* Остальные руны */}
            {nextRuneTimes && nextRuneTimes.length > 0 ? (
                nextRuneTimes.map((rune, index) => {
                    const iconColor = getIconColor(rune);
                    return (
                        <div key={index} className="mb-2 flex items-center justify-between w-full">
                            <div className="flex items-center">
                                {iconColor && (
                                    <RiTimeFill className="mr-2 text-[1.5em]" style={{ color: iconColor }} />
                                )}
                                <span className="text-[#9194C3] mr-2">
                                    Следующая руна {rune.name} через:
                                </span>
                                <span className="text-white">
                                    {formatTimeWithoutMs(rune.timeUntilNext)}
                                </span>
                            </div>
                            {rune.img && (
                                <img
                                    src={rune.img}
                                    alt={rune.name}
                                    className="w-8 h-8 ml-4"
                                />
                            )}
                        </div>
                    );
                })
            ) : (
                <h1>No upcoming runes</h1>
            )}

            {/* Управление звуками в самом низу страницы */}
            <div className="mt-5 fixed bottom-0 bg-[#282950] p-4 w-full flex justify-center items-center">
                <button
                    className={`bg-${soundEnabled.runeSpawn ? "green" : "red"}-500 text-white py-2 px-4 mr-2`}
                    onClick={() => toggleSound("runeSpawn")}
                >
                    Звук спавна рун: {soundEnabled.runeSpawn ? "Включён" : "Выключен"}
                </button>
                <button
                    className={`bg-${soundEnabled.runeSoon ? "green" : "red"}-500 text-white py-2 px-4 mr-2`}
                    onClick={() => toggleSound("runeSoon")}
                >
                    Звук о скором спавне: {soundEnabled.runeSoon ? "Включён" : "Выключен"}
                </button>
                <button
                    className={`bg-${soundEnabled.timerStart ? "green" : "red"}-500 text-white py-2 px-4`}
                    onClick={() => toggleSound("timerStart")}
                >
                    Звук запуска таймера: {soundEnabled.timerStart ? "Включён" : "Выключен"}
                </button>
            </div>
        </div>
    );
}

export default NextRoons;
