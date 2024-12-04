class PlantType {
  private static existingPlants = new Set<string>();
  public readonly plantType: string;
  public growsWhen!: GrowthStage[];

  static create(name: string) {
    if (PlantType.existingPlants.has(name)) {
      console.warn(`PlantType "${name}" already exists. Ignoring duplicate.`);
      return;
    }
    PlantType.existingPlants.add(name);
    return new PlantType(name);
  }

  private constructor(name: string) {
    this.plantType = name;
  }

  setGrowsWhen(condtion: GrowthStage[]) {
    this.growsWhen = condtion;
    return this;
  }

  evaluate(cell: Cell, proximity: number) {
    if(this.growsWhen[cell.planterBox.plant.growthLevel]){
    return cell.planterBox.sunLevel >=
          this.growsWhen[cell.planterBox.plant.growthLevel].sunlevel &&
        cell.planterBox.waterLevel >=
          this.growsWhen[cell.planterBox.plant.growthLevel].waterlevel &&
        proximity >= this.growsWhen[cell.planterBox.plant.growthLevel].proximity
      ? true
      : false;
    }
  }
}

export default PlantType;
