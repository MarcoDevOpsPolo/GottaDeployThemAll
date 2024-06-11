/* a canvas to travel between locations on the map */
import React, { useRef, useEffect, useState } from 'react'
import backgroundSrc from './../assets/maps/map3.png'
import backgroundWallsSrc from './../assets/maps/map3_walls.png'
import playerSrc from './../assets/player/ash2.webp'

export default function MapCanvas(props) {

    // refs
    const canvasRef = useRef(null)
    const wallCanvasRef = useRef(null)

    // states
    const [playerState, setPlayerState] = useState({
        x: 537,
        y: 455,
        speed: 4,
        facing: 0
    })
    const [canvasPixel, setCanvasPixel] = useState({
        x: 1,
        y: 1,
        isSet: false
    })

    // imgs
    const backgroundImg = new Image()
    backgroundImg.src = backgroundSrc
    // backgroundImg.src = backgroundWallsSrc

    const playerImg = new Image()
    playerImg.src = playerSrc

    const wallImg = new Image()
    wallImg.src = backgroundWallsSrc

    // local variables
    let playerPosition = null
    let frameCount = 0
    let wallCanvas2dContext = null


    // local functions
    /**
     * @param {CanvasRenderingContext2D} context 
     */
    const draw = (context) => {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height)
        context.drawImage(backgroundImg, 0, 0, context.canvas.width, context.canvas.height)

        wallCanvas2dContext.clearRect(0, 0, wallCanvas2dContext.canvas.width, wallCanvas2dContext.canvas.height)
        wallCanvas2dContext.drawImage(wallImg, 0, 0, wallCanvas2dContext.canvas.width, wallCanvas2dContext.canvas.height)

        if (playerPosition !== null) {
            drawPlayer(context, playerImg, playerPosition.facing, playerPosition.animationStep, playerPosition.x, playerPosition.y)
        }

    }

    /**
     * @param {CanvasRenderingContext2D} context 
     * @param {ImageData} player 
     * @param {Number} facing 0-down, 1-left, 2-right, 3-top
     * @param {Number} animationStep Must be whole number, mod 4 will be taken as there are 4 animation steps
     * @param {Number} posx 
     * @param {Number} posy 
    */
    function drawPlayer(context, player, facing, animationStep, posx, posy) {
        const scaledPlayerWidth = (player.width / 4) * canvasPixel.x
        const scaledPlayerHeight = (player.height / 4) * 1.4 * canvasPixel.y
        context.drawImage(player, (animationStep % 4) * player.width / 4, facing * player.height / 4, player.width / 4, player.height / 4, posx - (scaledPlayerWidth / 2), posy - (scaledPlayerHeight / 2), scaledPlayerWidth, scaledPlayerHeight)
    }

    window.onkeydown = (e) => {
        const arrows = ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"]
        if (arrows.includes(e.key)) {
            let newX = playerPosition.x
            let newY = playerPosition.y
            if (frameCount % 3 === 0) {
                playerPosition.animationStep++
            }
            if (e.key === "ArrowDown") {
                playerPosition.facing = 0
                newY += playerPosition.speed * canvasPixel.y
                if (canYouGetThere(newX, newY, wallCanvas2dContext)) {
                    playerPosition.y = newY
                }
            }
            if (e.key === "ArrowLeft") {
                playerPosition.facing = 1
                newX -= playerPosition.speed * canvasPixel.x
                if (canYouGetThere(newX, newY, wallCanvas2dContext)) {
                    playerPosition.x = newX
                }
            }
            if (e.key === "ArrowRight") {
                playerPosition.facing = 2
                newX += playerPosition.speed * canvasPixel.x
                if (canYouGetThere(newX, newY, wallCanvas2dContext)) {
                    playerPosition.x = newX
                }
            }
            if (e.key === "ArrowUp") {
                playerPosition.facing = 3
                newY -= playerPosition.speed * canvasPixel.y
                if (canYouGetThere(newX, newY, wallCanvas2dContext)) {
                    playerPosition.y = newY
                }
            }


        }
    }

    function getColour(posx, posy, context) {
        return context.getImageData(Math.round(posx), Math.round(posy), 1, 1).data
    }

    function isBlocked(posx, posy, context) {
        const tolerance = 25
        const rgb = getColour(posx, posy, context)
        return (rgb[0] < tolerance && rgb[1] < tolerance && rgb[2] < tolerance)
    }

    function canYouGetThere(newPosx, newPosy, context) {
        const searchAreaRadius = 5
        for (let x = newPosx - searchAreaRadius * canvasPixel.x; x < newPosx + searchAreaRadius * canvasPixel.x; x++) {
            for (let y = newPosy - searchAreaRadius * canvasPixel.y; y < newPosy + searchAreaRadius * canvasPixel.y; y++) {
                if (isBlocked(x, y, context)) {
                    return false
                }
            }
        }
        return true
    }

    // use effects
    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        context.canvas.width = window.innerWidth * 0.987
        context.canvas.height = window.innerHeight * 0.98

        console.log("ugye nem crash? 😇")

        // ezt lehet nem itt kell beállítani? még nem tudom pontosan
        // console.log("na és ez?")
        // const context = canvasRef.current.getContext("2d")
        const wallCanvas = wallCanvasRef.current
        wallCanvas2dContext = wallCanvas.getContext('2d')
        wallCanvas2dContext.canvas.width = window.innerWidth * 0.987
        wallCanvas2dContext.canvas.height = window.innerHeight * 0.98

        console.log(wallCanvas2dContext)

        if (!canvasPixel.isSet) {
            setCanvasPixel({
                x: context.canvas.width / backgroundImg.width,
                y: context.canvas.height / backgroundImg.height,
                isSet: true
            })
        }

        let animationFrameId

        const render = () => {
            // console.log("render!")
            frameCount++
            draw(context)
            animationFrameId = window.requestAnimationFrame(render)
        }
        render()

        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }

    }, [draw])

    useEffect(() => {
        playerPosition = {
            x: playerState.x * canvasPixel.x,
            y: playerState.y * canvasPixel.y,
            speed: playerState.speed,
            facing: playerState.facing,
            animationStep: 0
        }
        console.log(playerPosition)
    }, [canvasPixel, playerState])


    return (
        <>
            <canvas ref={canvasRef} className='canvas-main'></canvas>
            <canvas ref={wallCanvasRef} className='hidden'></canvas>
        </>
    )
}