export const eventConfig = [
    {
        name: "Bounty Runes",
        interval: 180000,
        startTime: 0,
        img: "gold.png",
        icon: {
            show: false,
        },
    },
    {
        name: "Wisdom Runes",
        interval: 420000,
        startTime: 420000,
        img: "wisdom.png",
        icon: {
            show: true,
            soonThreshold: 50000,
            verySoonThreshold: 15000,
        },
    },
    {
        name: "Lotus Pools",
        interval: 180000,
        startTime: 180000,
        img: "lotus.png",
        icon: {
            show: true,
            soonThreshold: 20000,
            verySoonThreshold: 15000,
        },
    },
    {
        name: "Roshan",
        spawnTime: 11 * 60 * 1000,
        img: "roshan.png",
    },
    {
        name: "Aegis",
        despawnTime: 5 * 60 * 1000,
        img: "aegis.png",
    },
];
