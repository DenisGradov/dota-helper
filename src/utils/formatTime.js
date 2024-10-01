export const formatTime = (time) => {
    const milliseconds = `00${Math.floor((time % 1000) / 10)}`.slice(-2); // Только первые 2 цифры мс
    const seconds = `0${Math.floor((time / 1000) % 60)}`.slice(-2);
    const minutes = `0${Math.floor((time / 1000 / 60) % 60)}`.slice(-2);
    const hours = `0${Math.floor(time / 1000 / 60 / 60)}`.slice(-2);
    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
};
export const formatTimeWithoutMs = (time) => {
    const seconds = `0${Math.floor((time / 1000) % 60)}`.slice(-2);
    const minutes = `0${Math.floor((time / (1000 * 60)) % 60)}`.slice(-2);
    const hours = `0${Math.floor(time / (1000 * 60 * 60))}`.slice(-2);
    return `${hours}:${minutes}:${seconds}`;
};



