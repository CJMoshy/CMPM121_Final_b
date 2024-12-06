import type CommandPipeline from "../util/CommandPipeline.ts";

interface UndoRedoProps {
  cmdPipe: CommandPipeline;
}

const UndoRedo: React.FC<UndoRedoProps> = ({ cmdPipe }) => {
  const handleUndoRedo = (undo: boolean) => {
    undo ? cmdPipe.undo() : cmdPipe.redo();
    document.dispatchEvent(new Event("updateUI"));
  };
  return (
    <div className="undo-redo-container">
      <button id="undoBtn" onClick={() => handleUndoRedo(true)}>Undo</button>
      <button id="redoBtn" onClick={() => handleUndoRedo(false)}>Redo</button>
    </div>
  );
};

export default UndoRedo;
