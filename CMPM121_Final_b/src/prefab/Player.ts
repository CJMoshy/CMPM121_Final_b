import { GAME_CONFIG } from "../util/GameConfig.ts";
const playerSrc = new URL("../assets/player/player.png", import.meta.url).href;

export default class Player implements Renderable {
    private image: HTMLImageElement;
    private ctx!: CanvasRenderingContext2D;
    private playerPos: PlayerPostionData;
    private inPlantable: boolean
    private PLAYERX: number;
    private PLAYERY: number;
    constructor() {
        // image logic
        this.image = new Image();
        this.image.src = playerSrc;
        this.image.onload = () => this.display();
        this.PLAYERX = 30;
        this.PLAYERY = 70;

        this.playerPos = {
            dx: this.PLAYERX,
            dy: this.PLAYERY,
        };

        document.addEventListener(
            "playerMoveEvent",
            (e) => this.handleMove(e as CustomEvent),
        );

        this.inPlantable = false
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
        const { movementInterval } = GAME_CONFIG.player
        switch (e.detail) {
            case "up":
                if (this.playerPos.dy <= 0) return
                this.playerPos.dy -= movementInterval
                console.log("we go up");
                break;
            case "down":
                if (this.playerPos.dy >= GAME_CONFIG.player.heightBound) return
                console.log(this.playerPos.dy)
                this.playerPos.dy += movementInterval
                console.log("we go down");
                break;
            case "left":
                if (this.playerPos.dx <= 0) return
                this.playerPos.dx -= movementInterval
                console.log("we go left");
                break;

            case "right":
                if (this.playerPos.dx >= GAME_CONFIG.player.widthBound) return
                this.playerPos.dx += movementInterval
                console.log("we go right");
                break;
        }
        const { dx, dy } = this.playerPos
        if (dx >= 30 && dx <= 230 && dy >= 80 && dy <= 110) {
            if (!this.inPlantable) {
                this.inPlantable = true
                document.dispatchEvent(new Event('enterPlantable'))
                console.log('enter plantable')
            }
            console.log('in plantable zone')
        } else {
            if (this.inPlantable) {
                this.inPlantable = false
                document.dispatchEvent(new Event('exitPlantable'))
                console.log('exit plantable')
            }
            console.log('not in plantable zone')
        }
    }
}

// const img = new Image();
// img.src = 'spritesheet.png'; // Path to your spritesheet
// img.onload = () => {
//   // Step 2: Get canvas and context
//   const canvas = document.getElementById('canvas');
//   const ctx = canvas.getContext('2d');

//   // Step 3: Specify the position and size of the frame to extract
//   const frameWidth = 100;  // Width of one frame
//   const frameHeight = 100; // Height of one frame
//   const frameX = 0;        // X position of the frame in the spritesheet (horizontal offset)
//   const frameY = 0;        // Y position of the frame in the spritesheet (vertical offset)
