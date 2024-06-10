/* a canvas to travel between locations on the map */
import React, { useRef, useEffect, useState } from 'react'
import background3Src from './../assets/maps/map3.png'

export default function MapCanvas(props) {

    //refs
    const canvasRef = useRef(null)

    //states
    const [playerState, setPlayerState] = useState({})
    const [canvasPixel, setCanvasPixel] = useState({
        x: 1,
        y: 1,
        isSet: false
    })

    //imgs
    const backgroundImg = new Image()
    backgroundImg.src = background3Src

    //local variables


    //local functions
    /**
     * @param {CanvasRenderingContext2D} context 
     */
    const draw = (context) => {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height)
        context.drawImage(backgroundImg, 0, 0, context.canvas.width, context.canvas.height)
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
        console.log(canvasPixel)
    }, [canvasPixel])

    return (
        <canvas ref={canvasRef} className='canvas-main'></canvas>
    )
}