import { useContext, useEffect, useState } from "react";
import { CellIndexContext } from "../Context.ts";
import PlanterBoxUI from "./PlanterBoxUI.tsx";
import PlantManager from "../controller/PlantController.ts";

interface PlantableUIProps {
  plantManager: PlantManager;
}
const PlantableUI: React.FC<PlantableUIProps> = ({ plantManager }) => {
  const { selectedCellIndex, setSelectedCellIndex } = useContext(
    CellIndexContext,
  );
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Event listener for 'enterPlantable'
    const handleEnterPlantable = () => {
      console.log("listener for enter plantable");
      setIsVisible(true); // Set visibility to true when enterPlantable event occurs
    };

    // Event listener for 'exitPlantable'
    const handleExitPlantable = () => {
      console.log("listener for exit plantable");
      setIsVisible(false); // Set visibility to false when exitPlantable event occurs
      setSelectedCellIndex(undefined);
    };

    // Attach event listeners
    document.addEventListener("enterPlantable", handleEnterPlantable);
    document.addEventListener("exitPlantable", handleExitPlantable);

    // Check if cells are initialized and set loading state accordingly
    const checkInitialization = setInterval(() => {
      if (plantManager.isLoading === false) {
        setLoading(false); // Stop loading once cells are initialized
        clearInterval(checkInitialization); // Stop checking
      }
    }, 100); // Check every 100ms

    // Cleanup the event listeners when the component unmounts
    return () => {
      document.removeEventListener(
        "enterPlantable",
        handleEnterPlantable,
      );
      document.removeEventListener("exitPlantable", handleExitPlantable);
    };
  }, []);

  // Handle the change event when a radio button is selected
  const handleSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCellIndex(event.target.value);
  };

  return (
    <div
      className="plantable-ui-container"
      style={{ visibility: isVisible ? "visible" : "hidden" }}
    >
      {loading ? <p>Loading cells...</p> : (
        <div>
          <h3>Select a planterbox</h3>
          <form>
            {[...Array(8)].map((_, index) => {
              const cellNumber = index + 1;
              return (
                <div key={cellNumber}>
                  <input
                    type="radio"
                    id={`cell${cellNumber}`}
                    name="cell"
                    value={`${cellNumber}`}
                    onChange={handleSelection}
                  />
                  <label htmlFor={`cell${cellNumber}`}>
                    {`Cell ${cellNumber}`}
                  </label>
                </div>
              );
            })}
          </form>
          <p>Selected PlanterBox: {selectedCellIndex}</p>
          <PlanterBoxUI plantManager={plantManager} />
        </div>
      )}
    </div>
  );
};

export default PlantableUI;
