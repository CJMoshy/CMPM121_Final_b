export const GAME_CONFIG = {
    player: {
        movementInterval: 10,
        heightBound: 120,
        widthBound: 250,
    },
    canvas: {
        width: 400,
        height: 400,
    },
    STORAGE: {
        CELL_SIZE_IN_BYTES: 24,
        CELLS_IN_GRID: 8,
    } as const,
};

export const enum plantGrowthLevel {
    seedling,
    sapling,
    adult,
}
