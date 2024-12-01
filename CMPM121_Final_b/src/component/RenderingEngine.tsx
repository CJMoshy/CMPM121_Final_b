import { useEffect, useRef } from "react";
import "../styles/Engine.css";
import { GAME_CONFIG } from "../util/GameConfig.ts";
import Player from "../prefab/Player.ts";
import type PlantManager from "../controller/PlantController.ts";

interface EngineProps{
    plantManager: PlantManager
}

const RenderingEngine: React.FC<EngineProps> = ({plantManager}) => {

    // Create a reference to the canvas element
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    let ctx: CanvasRenderingContext2D;

    const player = new Player()

    const gameLoop =   () => {
        if (!ctx) return;
        ctx.clearRect(
            0,
            0,
            GAME_CONFIG.canvas.width,
            GAME_CONFIG.canvas.height,
        );
        ctx.fillStyle = '#7CFC00'
        ctx.fillRect(0,0,GAME_CONFIG.canvas.width, GAME_CONFIG.canvas.height)
        plantManager.display(ctx)
        player.display()
        requestAnimationFrame(gameLoop)
    }

    useEffect(() => {
        if (canvasRef.current) {
            ctx = canvasRef.current.getContext("2d") as CanvasRenderingContext2D;
            if (ctx) {
                player.setCtx(ctx)
                gameLoop()
            }
        }
    }, []);

    return (
        <div>
            <canvas ref={canvasRef} id="main-canvas">
            </canvas>
        </div>
    );
};


export default RenderingEngine;
