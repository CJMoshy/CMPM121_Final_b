import PlantType from "./PlantDSL.ts";

// type Plant = PlantType
const Plant = PlantType;
export const plants = [
    Plant.named("Wheat").growsWhen([
        {
            sunlevel: 3,
            waterlevel: 2,
            proximity: 1,
        },
        { sunlevel: 5, waterlevel: 3, proximity: 3 },
        {
            sunlevel: 5,
            waterlevel: 4,
            proximity: 5,
        },
    ]),
    Plant.named("Aloe Vera").growsWhen([
        {
            sunlevel: 2,
            waterlevel: 1,
            proximity: 0,
        },
        { sunlevel: 4, waterlevel: 2, proximity: 1 },
        {
            sunlevel: 5,
            waterlevel: 2,
            proximity: 2,
        },
    ]),
    Plant.named("Flytrap").growsWhen([
        { sunlevel: 3, waterlevel: 1, proximity: 0 },
        {
            sunlevel: 4,
            waterlevel: 3,
            proximity: 0,
        },
        {
            sunlevel: 5,
            waterlevel: 5,
            proximity: 2,
        },
    ]),
];

