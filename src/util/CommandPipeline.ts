/**
 * @file CommandPipeline.ts
 * @purpose defines high level asbtraction to handle undo and redo with associated commands
 * @author CJ Moshy
 */

import Action from "./Action.ts";
import type GameManager from "../controller/GameManager.ts";

export default class CommandPipeline {
  private actionStack!: Action[];
  private redoStack!: Action[];
  private gameManager: GameManager;

  constructor(gameManager: GameManager) {
    this.loadFromLocalStorage();
    this.gameManager = gameManager;
  }

  addCommand(cmd: Action) {
    this.actionStack.push(cmd);
  }

  undo() {
    if (this.actionStack.length === 0) return;
    const action = this.actionStack.pop()!;

    const currentState = this.gameManager.getCurrentState(); // Get the current state of the game.
    this.redoStack.push(currentState);

    action.execute(this.gameManager);
  }

  redo() {
    if (this.redoStack.length === 0) return;
    const action = this.redoStack.pop()!;

    const currentState = this.gameManager.getCurrentState(); // Get the current state of the game.
    this.actionStack.push(currentState);

    action.execute(this.gameManager);
  }

  clearRedoStack() {
    this.redoStack.length = 0;
  }

  saveToLocalStorage() {
    const actionStackState = [];
    const redoStackState = [];
    for (const x of this.actionStack) {
      actionStackState.push(x.getState());
    }
    for (const y of this.redoStack) {
      redoStackState.push(y.getState());
    }
    localStorage.setItem(
      "cmd",
      JSON.stringify([actionStackState, redoStackState]),
    );
  }

  loadFromLocalStorage() {
    const cmd = localStorage.getItem("cmd");
    this.actionStack = [];
    this.redoStack = [];
    if (cmd) {
      const parsed = JSON.parse(cmd);
      for (const x of parsed[0]) {
        this.actionStack.push(new Action(x));
      }
      for (const y of parsed[1]) {
        this.redoStack.push(new Action(y));
      }
    }
  }
}
