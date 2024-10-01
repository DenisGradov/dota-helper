import { useEffect, useRef } from "react";
import TimerWorking from "./TimerWorking.jsx";
import TimerNotWorking from "./TimerNotWorking.jsx";
import addEvent from "../utils/addEvent.js";
import {eventConfig} from "../constants/eventConfig.js"; // Import addEvent function

function TimerBlock({ eventsList, setEventsList, gameInfo, setGameInfo }) {
    const nextEventTimesRef = useRef({});

    useEffect(() => {
        if (gameInfo.timer) {
            // Initialize nextEventTimesRef
            const initialNextEventTimes = {};
            eventConfig.forEach(event => {
                initialNextEventTimes[event.name] = event.startTime;
            });
            nextEventTimesRef.current = initialNextEventTimes;
        } else {
            // Reset nextEventTimesRef when timer stops
            nextEventTimesRef.current = {};
        }
    }, [gameInfo.timer]);

    useEffect(() => {
        if (gameInfo.timer && !gameInfo.pause) {
            const interval = setInterval(() => {
                setGameInfo((prev) => ({
                    ...prev,
                    time: prev.time + 100, // Increase time by 100 ms
                }));
            }, 100); // Update every 100 ms
            return () => clearInterval(interval);
        }
    }, [gameInfo.pause, gameInfo.timer]);

    useEffect(() => {
        // Check for events when gameInfo.time changes
        const newTime = gameInfo.time;
        if (gameInfo.timer && !gameInfo.pause) {
            const updatedNextEventTimes = { ...nextEventTimesRef.current };
            eventConfig.forEach(event => {
                if (newTime >= nextEventTimesRef.current[event.name]) {
                    // Add event
                    addEvent(setEventsList, newTime, event.name);
                    // Update next event time
                    updatedNextEventTimes[event.name] += event.interval;
                }
            });
            nextEventTimesRef.current = updatedNextEventTimes;
        }
    }, [gameInfo.time]);

    return (
        <div className="h-full w-full">
            {gameInfo.timer ? (
                <TimerWorking
                    setGameInfo={setGameInfo}
                    gameInfo={gameInfo}
                    eventsList={eventsList}
                    setEventsList={setEventsList}
                />
            ) : (
                <TimerNotWorking
                    setGameInfo={setGameInfo}
                    gameInfo={gameInfo}
                    eventsList={eventsList}
                    setEventsList={setEventsList}
                />
            )}
        </div>
    );
}

export default TimerBlock;
