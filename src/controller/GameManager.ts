import PlantManager from "./PlantController.ts";
// import TimeManager from "./TimeController.ts";
import { loadGameState, saveGameState } from "../util/Storage.ts";
import Action from "../util/CommandPipeline/Action.ts";
import query from "../util/json/scenario.json" with { type: "json" };

const MAXLEVEL = query.levels.length;

export default class GameManager {
  public plantManager: PlantManager;
  public selectedCell!: Cell | undefined;
  public selectedCellIndex: number = 0;
  public currentLevel!: number;
  public turnCounter!: number;
  public savedGameSlot: number;
  public loadGameSlot: number;
  constructor(
    plantManager: PlantManager,
  ) {
    this.plantManager = plantManager;
    this.savedGameSlot = 1;
    this.loadGameSlot = 1;
  }

  initGame() {
    document.addEventListener("nextTurnEvent", () => this.advanceTurn());

    this.loadSavedGame(); // load saved game TODO -> load a specific save
  }

  // save game funciton
  saveGame() {
    saveGameState({
      currentLevel: this.currentLevel,
      currentTurn: this.turnCounter,
      plantData: Array.from(
        new Uint8Array(this.plantManager.getPlantableCellBuffer()),
      ),
    }, this.savedGameSlot); // pass in a 'slot' to save different instances of the game
  }

  // load game from local storage
  loadSavedGame() {
    if (!loadGameState(this.loadGameSlot)) { // loadGameState can return false
      document.dispatchEvent(new Event("newGameEvent"));
      this.turnCounter = 1; // so we set defaults
      this.currentLevel = 1; // so we set defaults
    } else { // otherwise we found some data
      let plantData: ArrayBuffer; // so we load it
      [this.currentLevel, this.turnCounter, plantData] = loadGameState(
        this.loadGameSlot,
      ) as [number, number, ArrayBuffer];
      this.plantManager.setPlantableCellBuffer(plantData); // set all the cells to the loaded data
      this.plantManager.isLoading = false;
      document.dispatchEvent(new Event("updateUI"));
      //add in additional uI updates for the controller and display
    }
  }

  // logic for advancing turn
  advanceTurn() {
    this.turnCounter += 1;

    const asCells = this.plantManager.getAllPlantableCells(); // get all cells as Cell[] type for easy manip
    let arrayBufferOffset = 0; // this is needed for the arraybuffer
    asCells.forEach((cell: Cell) => {
      this.generateSun(cell);
      this.generateWater(cell);
      cell = this.plantManager.updatePlantGrowth(cell, arrayBufferOffset);
      this.plantManager.addPlantableCell(arrayBufferOffset, cell); // write to the buffer the updated cells
      arrayBufferOffset += 1;
    });

    // query level status
    this.handleCompleteLevel();

    // save game
    this.saveGame();
  }

  getCurrentState() {
    return new Action({
      currentTurn: this.turnCounter,
      currentLevel: this.currentLevel,
      plantData: Array.from(
        new Uint8Array(this.plantManager.getPlantableCellBuffer()),
      ),
    });
  }

  generateSun(currentCell: Cell) {
    currentCell.planterBox.sunLevel = Math.floor(Math.random() * 6); // Random integer between 0 and 5
  }

  generateWater(currentCell: Cell) {
    currentCell.planterBox.waterLevel += parseFloat(
      (Math.random() * 3).toFixed(3),
    ); // Random float between 0 and 3, rounded to 3 decimals
    if (currentCell.planterBox.waterLevel >= 5) {
      currentCell.planterBox.waterLevel = 5; // Cap the water level at 5
    }
  }

  // deals with beating a level
  handleCompleteLevel() {
    if (this.currentLevel > MAXLEVEL) {
      return;
    }
    const levelRequirement =
      (query as LevelsData).levels.find((e) =>
        e.levelNum === this.currentLevel
      )!.requirements;

    // Convert the plant requirements to an array
    const plants = Object.entries(levelRequirement.plants); // We use `Object.entries` to get both the plant name and the requirement

    for (const [species, x] of plants) {
      // Check if there's a planter box that matches the growth level of this plant
      const hasMatchingGrowthLevel = this.plantManager.getAllPlantableCells()
        .find((e) => e.planterBox.plant.growthLevel === x.growthLevel);

      if (!hasMatchingGrowthLevel) {
        console.log("no plant found at correct growth level ");
        return;
      }

      // Find the plantable cells that match the species name (e.g., "Flytrap")
      const matchingCells =
        this.plantManager.getAllPlantableCells().filter((e) =>
          e.planterBox.plant.species === species
        ).length;

      if (matchingCells < x.amount) {
        console.log("not enough plants for level to beat");
        return;
      }

      // Now, you can handle the matching cells for the current species (e.g., Flytrap)
      console.log(
        `Found ${matchingCells} plantable cells for ${species} with growth level ${x.growthLevel}, LEVEL COMPLETE!`,
      );
    }

    this.currentLevel += 1;
    const ev = new CustomEvent("levelComplete", { detail: this.currentLevel });
    self.dispatchEvent(ev);
  }
}
