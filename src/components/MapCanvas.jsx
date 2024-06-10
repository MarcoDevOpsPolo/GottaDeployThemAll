/* a canvas to travel between locations on the map */
import React, { useRef, useEffect, useState } from 'react'

export default function MapCanvas(props) {

    //refs
    const canvasRef = useRef(null)

    //states
    const [playerState, setPlayerState] = useState({})

    //local functions
    const draw = (context) => {

    }

    window.onkeydown = (e) => {

    }

    //use effects
    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
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

    return (
        <canvas ref={canvasRef} className='canvas-main'></canvas>
    )
}