class PlantType {
  private static existingPlants = new Set<string>();
  public readonly plantType: string;
  public growthStages!: GrowthStage[];

  static named(name: string): PlantType {
    if (PlantType.existingPlants.has(name)) {
      console.warn(`PlantType "${name}" already exists. Ignoring duplicate.`);
      throw new Error('dup plant name')
    }
    PlantType.existingPlants.add(name);
    return new PlantType(name);
  }

  private constructor(name: string) {
    this.plantType = name;
  }

  growsWhen(condtion: GrowthStage[]) {
    this.growthStages = condtion;
    return this;
  }

  evaluate(cell: Cell, proximity: number) {
    if(this.growthStages[cell.planterBox.plant.growthLevel]){
    return cell.planterBox.sunLevel >=
          this.growthStages[cell.planterBox.plant.growthLevel].sunlevel &&
        cell.planterBox.waterLevel >=
          this.growthStages[cell.planterBox.plant.growthLevel].waterlevel &&
        proximity >= this.growthStages[cell.planterBox.plant.growthLevel].proximity
      ? true
      : false;
    }
  }
}

export default PlantType;
