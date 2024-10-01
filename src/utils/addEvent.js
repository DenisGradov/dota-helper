const addEvent = (setEventsList, time, text) => {
    setEventsList(prevList => {
        const newList = [{ time, text }, ...prevList]; // Add new event at the end
        if (newList.length > 20) {
            newList.pop(); // Remove the oldest event from the beginning
        }
        return newList;
    });

};

export default addEvent;
