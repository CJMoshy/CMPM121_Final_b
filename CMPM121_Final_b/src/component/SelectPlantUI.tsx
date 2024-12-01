import React, { useContext, useEffect, useState, FormEvent } from "react";
import { PlantContext } from "../Context";

type PlantSpecies = "none" | 'Wheat' | 'Aloe Vera' | 'FlyTrap';

const SelectPlantUI: React.FC = () => {

    const { selectedPlant, setSelectedPlant } = useContext(PlantContext)

    const handlePlantChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPlant(event.target.value as PlantSpecies);
    }

    return (
        <div className="plant-select-ui">
            <h3>Select a Plant Species</h3>
            <form>
                <select id="plants" value={selectedPlant} onChange={handlePlantChange}>
                    <option value="Wheat"> Wheat</option>
                    <option value="Aloe Vera">Aloe Vera</option>
                    <option value="FlyTrap">Flytrap</option>
                </select>
            </form>
        </div>
    );
}

export default SelectPlantUI;