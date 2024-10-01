import { formatTimeWithoutMs } from "../utils/formatTime.js";
import { RiTimeFill } from "react-icons/ri"; // Иконка для отображения внимания
import { eventConfig } from "../constants/eventConfig.js"; // Импорт конфига

function TimerInfoZone({ eventList, roshanSpawnTime, aegisDespawnTime }) {
    // Функция для получения иконки по имени события из конфига
    const getEventIcon = (eventName) => {
        const event = eventConfig.find((ev) => ev.name === eventName);
        return event ? event.img : null;
    };

    return (
        <div className="bg-[#1a1a2e] p-[20px] m-auto mt-[20px] flex flex-col justify-start items-center border-2 rounded w-full h-full max-h-[300px] overflow-auto max-w-[800px]">
            {/* Отображение евентов */}
            {eventList && eventList.length > 0 ? (
                eventList.map((event, index) => {
                    const icon = getEventIcon(event.text);
                    return (
                        <div key={index} className="mb-2 flex items-center justify-between w-full">
                            <div className="flex items-center">
                                <span className="text-[#9194C3] mr-2">{formatTimeWithoutMs(event.time)}</span>
                                <span className="text-white">{event.text}</span>
                            </div>
                            {icon && (
                                <img
                                    src={icon} // Иконка события
                                    alt={event.text}
                                    className="w-[32px] h-[32px] ml-2"
                                />
                            )}
                        </div>
                    );
                })
            ) : (
                <h1>No events</h1>
            )}

            {/* Рошан */}
            {roshanSpawnTime !== null && roshanSpawnTime - Date.now() > 0 && (
                <div className="mb-2 flex items-center justify-between w-full">
                    <div className="flex items-center">
                        <RiTimeFill className="mr-2" style={{ color: "#FFFF00" }} />
                        <span className="text-[#9194C3] mr-2">Рошан появится через:</span>
                        <span className="text-white">
                            {formatTimeWithoutMs(roshanSpawnTime - Date.now())}
                        </span>
                    </div>
                    <img
                        alt="roshan"
                        src="roshan.png"
                        className="w-[32px]"
                    />
                </div>
            )}

            {/* Аегис */}
            {aegisDespawnTime !== null && aegisDespawnTime - Date.now() > 0 && (
                <div className="mb-2 flex items-center justify-between w-full">
                    <div className="flex items-center">
                        <RiTimeFill className="mr-2" style={{ color: "#0000FF" }} />
                        <span className="text-[#9194C3] mr-2">Аегис пропадет через:</span>
                        <span className="text-white">
                            {formatTimeWithoutMs(aegisDespawnTime - Date.now())}
                        </span>
                    </div>
                    <img
                        alt="aegis"
                        src="/aegis.png"
                        className="w-[32px]"
                    />
                </div>
            )}
        </div>
    );
}

export default TimerInfoZone;
