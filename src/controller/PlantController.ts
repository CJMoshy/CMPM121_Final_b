import { GAME_CONFIG, plantGrowthLevel } from "../util/GameConfig.ts";
import PlantType from "../util/DSL/PlantDSL.ts";
const plantSpriteMap: Record<string, string> = {
  "Aloe Vera0":
    new URL("/assets/Plants/AloeVeraLevel0.png", import.meta.url).href,
  "Aloe Vera1":
    new URL("/assets/Plants/AloeVeraLevel1.png", import.meta.url).href,
  "Aloe Vera2":
    new URL("/assets/Plants/AloeVeraLevel2.png", import.meta.url).href,
  "Aloe Vera3":
    new URL("/assets/Plants/AloeVeraLevel3.png", import.meta.url).href,
  "Flytrap0": new URL("/assets/Plants/FlytrapLevel0.png", import.meta.url).href,
  "Flytrap1": new URL("/assets/Plants/FlytrapLevel1.png", import.meta.url).href,
  "Flytrap2": new URL("/assets/Plants/FlytrapLevel2.png", import.meta.url).href,
  "Flytrap3": new URL("/assets/Plants/FlytrapLevel3.png", import.meta.url).href,
  "Wheat0": new URL("/assets/Plants/WheatLevel0.png", import.meta.url).href,
  "Wheat1": new URL("/assets/Plants/WheatLevel1.png", import.meta.url).href,
  "Wheat2": new URL("/assets/Plants/WheatLevel2.png", import.meta.url).href,
  "Wheat3": new URL("/assets/Plants/WheatLevel3.png", import.meta.url).href,
};
export default class PlantManager implements Renderable {
  private plantableCellsBuffer: ArrayBuffer; // updated storage mech
  private plantableCellsView: DataView; // used to set,get from array buffer
  public isLoading: boolean;
  private plants: PlantType[];
  public plantBoxLocations: [number, number][];
  constructor(plantDSL: PlantType[]) {
    this.plantBoxLocations = [
      [50, 110],
      [75, 110],
      [100, 110],
      [125, 110],
      [150, 110],
      [175, 110],
      [200, 110],
      [225, 110],
    ];
    this.plants = plantDSL;
    this.plantableCellsBuffer = new ArrayBuffer( // init a new buffer
      GAME_CONFIG.STORAGE.CELL_SIZE_IN_BYTES *
        GAME_CONFIG.STORAGE.CELLS_IN_GRID,
    );

    this.plantableCellsView = new DataView(this.plantableCellsBuffer); // tie view to buffer
    this.isLoading = true;

    document.addEventListener("newGameEvent", () => {
      console.log("new game");
      let count = 0;
      do {
        const [i, j] = this.plantBoxLocations[count];
        this.addPlantableCell(count, {
          i,
          j,
          planterBox: {
            waterLevel: 0,
            sunLevel: 0,
            plant: {
              species: "none",
              growthLevel: plantGrowthLevel.seedling,
            },
          },
        });
        count += 1;
      } while (count < 8);
      this.isLoading = false;
    });
  }

  // getter for buffer
  getPlantableCellBuffer() {
    return this.plantableCellsBuffer;
  }

  // setter
  setPlantableCellBuffer(buf: ArrayBuffer) {
    this.plantableCellsBuffer = buf;
    this.plantableCellsView = new DataView(buf);
  }

  getEnumeratedPlantTypes() {
    //deno-lint-ignore no-explicit-any
    const plantEnum: any = {
      "none": 0,
    };
    let count = 1;
    this.plants.forEach((plant) => {
      const plantType = plant.plantType;
      plantEnum[plantType] = count++;
    });
    return plantEnum;
  }
  // // works on cell type, must be deserialized from arraybuf
  updatePlantGrowth(cell: Cell, index: number): Cell {
    if (cell.planterBox.plant.species === "none") {
      console.log("no plant to grow");
      return cell;
    }
    const { planterBox } = cell;
    const plantRef = this.plants.find((e) =>
      e.plantType === cell.planterBox.plant.species
    )!;
    if (
      plantRef.evaluate(cell, this.getNearbyPlants())
    ) {
      console.log("plant Grew, index: ", index);

      let newSunLevel = planterBox.sunLevel -
        plantRef.growthStages[planterBox.plant.growthLevel].sunlevel;
      if (newSunLevel < 0) {
        newSunLevel = 0;
      }

      let newWaterLevel = planterBox.waterLevel -
        plantRef.growthStages[planterBox.plant.growthLevel].waterlevel;

      if (newWaterLevel < 0) {
        newWaterLevel = 0;
      }

      cell = {
        ...cell,
        planterBox: {
          sunLevel: newSunLevel,
          waterLevel: newWaterLevel,
          plant: {
            ...cell.planterBox.plant,
            growthLevel: cell.planterBox.plant.growthLevel + 1,
          },
        },
      };
    }
    console.log(cell);
    return cell;
  }

  // helper to get plants near the current plant
  public getNearbyPlants(): number {
    return this.getAllPlantableCells().filter((cell) =>
      cell.planterBox.plant.species !== "none"
    ).length - 1; // 'this' plant shouldnt be counted TODO FIX
  }

  addPlantableCell(index: number, cell: Cell) {
    const offset = index *
      GAME_CONFIG.STORAGE.CELL_SIZE_IN_BYTES;
    let byteOffset = offset;

    // helpers to step through the array
    const incrementByteOffset = (val: number) => byteOffset += val;

    // i and j
    this.plantableCellsView.setFloat64(byteOffset, cell.i);
    incrementByteOffset(8);
    this.plantableCellsView.setFloat64(byteOffset, cell.j);
    incrementByteOffset(8);

    // water and sun levels
    this.plantableCellsView.setUint8(
      byteOffset,
      cell.planterBox.waterLevel,
    );
    incrementByteOffset(1);
    this.plantableCellsView.setUint8(byteOffset, cell.planterBox.sunLevel);
    incrementByteOffset(1);

    // growth level
    console.log(cell.planterBox.plant.growthLevel);
    this.plantableCellsView.setUint8(
      byteOffset,
      cell.planterBox.plant.growthLevel,
    );
    incrementByteOffset(1);

    // map the plant names to numbers for less storage space
    const PlantSpeciesEnum = this.getEnumeratedPlantTypes();
    this.plantableCellsView.setUint8(
      byteOffset,
      PlantSpeciesEnum[cell.planterBox.plant.species],
    );
    incrementByteOffset(1);
  }
  // cani make these smaller
  // deserialization method for a given cell
  getPlantableCell(index: number): Cell {
    const offset = index * GAME_CONFIG.STORAGE.CELL_SIZE_IN_BYTES; // where in the buffer we at
    let byteOffset = offset;

    const incrementByteOffset = (val: number) => byteOffset += val;
    // Deserialize fields in order
    const i = this.plantableCellsView.getFloat64(byteOffset);
    incrementByteOffset(8);
    const j = this.plantableCellsView.getFloat64(byteOffset);
    incrementByteOffset(8);

    const waterLevel = this.plantableCellsView.getUint8(byteOffset);
    incrementByteOffset(1);
    const sunLevel = this.plantableCellsView.getUint8(byteOffset);
    incrementByteOffset(1);

    const growthLevel = this.plantableCellsView.getUint8(byteOffset);
    incrementByteOffset(1);

    const speciesIndex = this.plantableCellsView.getUint8(byteOffset);

    let species;
    if (speciesIndex === 0) {
      species = "none";
    } else species = this.plants[speciesIndex - 1].plantType;
    incrementByteOffset(1);

    // console.log(growthLevel);
    return {
      i,
      j,
      planterBox: {
        waterLevel,
        sunLevel,
        plant: {
          species,
          growthLevel,
        },
      },
    } as Cell;
  }

  // get all indexes as a Cell[]
  getAllPlantableCells() {
    const plantableCells: Cell[] = [];
    for (let x = 0; x < 8; x++) {
      plantableCells.push(this.getPlantableCell(x));
    }
    return plantableCells;
  }

  display(ctx?: CanvasRenderingContext2D) {
    if (!ctx || !this.plantBoxLocations) return;
    ctx.fillStyle = "#826A3B";
    for (const location of this.plantBoxLocations) {
      ctx.fillRect(location[0], location[1], 12, 12);
      const plantableCell = this.getAllPlantableCells().find((
        cell,
      ) => cell.i === location[0] && cell.j === location[1]);

      if (plantableCell && plantableCell.planterBox.plant.species != "none") {
        const plantSprite = new Image();
        const srcKey = plantableCell.planterBox.plant.species +
          plantableCell.planterBox.plant.growthLevel;
        plantSprite.src = plantSpriteMap[srcKey];
        ctx.drawImage(plantSprite, location[0], location[1], 12, 12);
      }
    }
  }

  loadSprites() {
    // const plantSprite = new Image();
    Object.values(plantSpriteMap).forEach((sprite) => {
      fetch(sprite);
    });
  }
}
