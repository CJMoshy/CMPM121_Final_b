import { GAME_CONFIG } from "../util/GameConfig.ts";
const playerSrc = new URL("../assets/player/player.png", import.meta.url).href;

const INITIALPLAYERX = 30;
const INITIALPLAYERY = 70;
export default class Player implements Renderable {
  private image: HTMLImageElement;
  private ctx!: CanvasRenderingContext2D;
  private playerPos: PlayerPostionData;
  private inPlantable: boolean;
  constructor() {
    // image logic
    this.image = new Image();
    this.image.src = playerSrc;
    this.image.onload = () => this.display();

    this.playerPos = {
      dx: INITIALPLAYERX,
      dy: INITIALPLAYERY,
    };

    document.addEventListener(
      "playerMoveEvent",
      (e) => this.handleMove(e as CustomEvent),
    );

    this.inPlantable = false;
  }

  setCtx(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  display() {
    if (!this.ctx) return;
    this.ctx.drawImage(
      this.image,
      0,
      0,
      32,
      32, // Crop area (x, y, width, height)
      this.playerPos.dx,
      this.playerPos.dy,
      32,
      32, // Destination on canvas (x, y, width, height)
    );
  }

  handleMove(e: CustomEvent) {
    const { movementInterval } = GAME_CONFIG.player;
    switch (e.detail) {
      case "up":
        if (this.playerPos.dy <= 0) return;
        this.playerPos.dy -= movementInterval;
        break;
      case "down":
        if (this.playerPos.dy >= GAME_CONFIG.player.heightBound) return;
        this.playerPos.dy += movementInterval;
        break;
      case "left":
        if (this.playerPos.dx <= 0) return;
        this.playerPos.dx -= movementInterval;
        break;

      case "right":
        if (this.playerPos.dx >= GAME_CONFIG.player.widthBound) return;
        this.playerPos.dx += movementInterval;
        break;
    }
    const { dx, dy } = this.playerPos;
    if (dx >= 30 && dx <= 230 && dy >= 80 && dy <= 110) {
      if (!this.inPlantable) {
        this.inPlantable = true;
        document.dispatchEvent(new Event("enterPlantable"));
      }
    } else {
      if (this.inPlantable) {
        this.inPlantable = false;
        document.dispatchEvent(new Event("exitPlantable"));
      }
    }
  }
}
