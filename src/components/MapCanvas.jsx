/* a canvas to travel between locations on the map */
import React, { useRef, useEffect, useState } from 'react'
import backgroundSrc from './../assets/maps/map3.png'
import playerSrc from './../assets/player/ash2.webp'

export default function MapCanvas(props) {

    //refs
    const canvasRef = useRef(null)

    //states
    const [playerState, setPlayerState] = useState({
        x: 530,
        y: 450,
        facing: 0
    })
    const [canvasPixel, setCanvasPixel] = useState({
        x: 1,
        y: 1,
        isSet: false
    })

    //imgs
    const backgroundImg = new Image()
    backgroundImg.src = backgroundSrc

    const playerImg = new Image()
    playerImg.src = playerSrc

    //local variables
    let playerPosition = null


    //local functions
    /**
     * @param {CanvasRenderingContext2D} context 
     */
    const draw = (context) => {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height)
        context.drawImage(backgroundImg, 0, 0, context.canvas.width, context.canvas.height)
        if (playerPosition !== null) {
            drawPlayer(context, playerImg, playerPosition.facing, 0, playerPosition.x, playerPosition.y)
        }

    }

    /**
     * 
     * @param {CanvasRenderingContext2D} context 
     * @param {ImageData} player 
     * @param {Number} facing 0-down, 1-left, 2-right, 3-top
     * @param {Number} animationStep Must be whole number, mod 4 will be taken as there are 4 animation steps
     * @param {Number} posx 
     * @param {Number} posy 
    */
    function drawPlayer(context, player, facing, animationStep, posx, posy) {
        context.drawImage(player, (animationStep % 4) * player.width / 4, facing * player.height / 4, player.width / 4, player.height / 4, posx, posy, player.width / 4, player.height / 4)
    }

    window.onkeydown = (e) => {

    }

    //use effects
    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        context.canvas.width = window.innerWidth * 0.987
        context.canvas.height = window.innerHeight * 0.98
        if (!canvasPixel.isSet) {
            setCanvasPixel({
                x: context.canvas.width / backgroundImg.width,
                y: context.canvas.height / backgroundImg.height,
                isSet: true
            })
        }

        let animationFrameId

        const render = () => {
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
            facing: playerState.facing
        }
    }, [canvasPixel, playerState])
    // useEffect(() => {
    //     console.log(canvasPixel)
    // }, [canvasPixel])

    return (
        <canvas ref={canvasRef} className='canvas-main'></canvas>
    )
}