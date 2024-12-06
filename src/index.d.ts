type direction = "up" | "down" | "left" | "right" | "none";

interface PlayerPostionData {
  dx: number;
  dy: number;
}

interface Renderable {
  display: (ctx?: CanvasRenderingContext2D) => void;
}

interface Cell {
  readonly i: number;
  readonly j: number;
  planterBox: PlanterBox;
}

interface PlanterBox {
  waterLevel: number;
  sunLevel: number;
  plant: Plant;
}

type PlantSpecies = string;

type Language = string;

interface LanguageTranslations {
  [key: string]: string; // Key-value pairs for all translatable phrases
}

interface TranslateObject {
  [language: string]: LanguageTranslations;
}

interface Plant {
  species: PlantSpecies;
  growthLevel: number;
}

interface GrowthStage {
  sunlevel: number;
  waterlevel: number;
  proximity: number;
}

interface PlantRequirement {
  amount: number;
  growthLevel: number;
}

interface LevelRequirement {
  plants: Record<string, PlantRequirement>; // The key is the plant name (e.g., 'Flytrap', 'Wheat')
}

interface Level {
  levelNum: number;
  requirements: LevelRequirement;
}

interface LevelsData {
  levels: Level[];
}

interface GameState {
  currentLevel: number;
  currentTurn: number;
  plantData: Array<number>; // will become array buffer
}

interface AbstractGameCommand {
  executeUndo: () => void;
  executeRedo: () => void;
}
