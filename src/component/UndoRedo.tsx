import { TranslateContext } from "../Context.ts";
import type CommandPipeline from "../util/CommandPipeline/CommandPipeline.ts";
import getTranslation from "../util/TranslateLanguage.ts";
import { useContext } from "react";

interface UndoRedoProps {
  cmdPipe: CommandPipeline;
}

const UndoRedo: React.FC<UndoRedoProps> = ({ cmdPipe }) => {
  const handleUndoRedo = (undo: boolean) => {
    undo ? cmdPipe.undo() : cmdPipe.redo();
    document.dispatchEvent(new Event("updateUI"));
  };
  const { currentLanguage } = useContext(TranslateContext);
  return (
    <div className="undo-redo-container">
      <button id="undoBtn" onClick={() => handleUndoRedo(true)}>
        {getTranslation("Undo", currentLanguage)}
      </button>
      <button id="redoBtn" onClick={() => handleUndoRedo(false)}>
        {getTranslation("Redo", currentLanguage)}
      </button>
    </div>
  );
};

export default UndoRedo;
