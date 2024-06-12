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

    // imgs
    const backgroundImg = new Image()
    let backgroundLoaded = false
    backgroundImg.src = backgroundSrc
    backgroundImg.onload = () => backgroundLoaded = true

    const playerImg = new Image()
    let playerLoaded = false
    playerImg.src = playerSrc
    playerImg.onload = () => playerLoaded = true

    const wallImg = new Image()
    wallImg.src = backgroundWallsSrc
    let wallLoaded = false
    wallImg.onload = () => wallLoaded = true

    // local variables
    let canvasPixel = {
        x: 1,
        y: 1,
        isSet: false
    }
    let playerPosition = props.playerState
    let frameCount = 0
    let wallCanvas2dContext = null
    let localLocations = false
    let wallsSet = false
    let currentLocation = false


    // local functions
    /**
     * @param {CanvasRenderingContext2D} context 
     */
    const draw = (context) => {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height)
        // context.drawImage(backgroundImg, 0, 0, context.canvas.width, context.canvas.height)

        if (!canvasPixel.isSet && backgroundLoaded) {
            canvasPixel = {
                x: context.canvas.width / backgroundImg.width,
                y: context.canvas.height / backgroundImg.height,
                isSet: true
            }
            playerPosition = {
                x: playerPosition.x * canvasPixel.x,
                y: playerPosition.y * canvasPixel.y,
                speed: playerPosition.speed,
                facing: playerPosition.facing,
                animationStep: 0
            }
        }

        if (!wallsSet && wallLoaded) {
            wallCanvas2dContext.clearRect(0, 0, wallCanvas2dContext.canvas.width, wallCanvas2dContext.canvas.height)
            wallCanvas2dContext.drawImage(wallImg, 0, 0, wallCanvas2dContext.canvas.width, wallCanvas2dContext.canvas.height)
            wallsSet = true
        }

        if (playerLoaded && (playerPosition !== null)) {
            drawPlayer(context, playerImg, playerPosition.facing, playerPosition.animationStep, playerPosition.x, playerPosition.y)
        }
        if (localLocations) {
            drawLocations(context, localLocations)
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
        context.drawImage(player, Math.round((animationStep % 4) * player.width / 4), Math.round(facing * player.height / 4), Math.round(player.width / 4), Math.round(player.height / 4), Math.round(posx - (scaledPlayerWidth / 2)), Math.round(posy - (scaledPlayerHeight / 2)), Math.round(scaledPlayerWidth), Math.round(scaledPlayerHeight))
    }

    /**
     * draw a location to the map
     * @param {CanvasRenderingContext2D} context 
     * @param {Object} locationsArr pos: { topLeft: {x,y} bottomRight: {x,y}}
     */
    function drawLocations(context, locationsArr) {
        let currentCounter = 0
        const fontSizePixel = 32 * canvasPixel.y
        locationsArr.forEach(location => {
            const adjustedTopX = location.pos.topLeft.x * canvasPixel.x
            const adjustedTopY = location.pos.topLeft.y * canvasPixel.y
            const adjustedBottomX = location.pos.bottomRight.x * canvasPixel.x
            const adjustedBottomY = location.pos.bottomRight.y * canvasPixel.y
            if (adjustedTopX < playerPosition.x && adjustedBottomX > playerPosition.x && adjustedTopY < playerPosition.y && adjustedBottomY > playerPosition.y) {
                currentLocation = location
                currentCounter++
                if (!location.isDiscovered) {
                    location.isDiscovered = true
                }
            }
            if (location.isDiscovered) {
                const width = adjustedBottomX - adjustedTopX
                const height = adjustedBottomY - adjustedTopY
                context.rect(Math.round(adjustedTopX), Math.round(adjustedTopY), Math.round(width), Math.round(height))
                // if (current) {
                //     context.fillStyle = `rgba(255,255,255,1)`
                //     context.font = `${fontSizePixel}px serif`
                //     context.fillText(locationName, width * 0.6 / 2, (height + fontSizePixel) / 2)
                // }
            }
        })
        context.fillStyle = `rgba(242,226,145,0.33)`
        context.fill()
        if (currentCounter === 0) {
            currentLocation = false
        }
    }


    window.onkeydown = (e) => {
        const arrows = ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"]
        if (arrows.includes(e.key)) {
            let newX = playerPosition.x
            let newY = playerPosition.y
            if (frameCount % 2 === 0) {
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
        if (e.key === "Enter" && currentLocation) {
            props.setCurrentLocation({
                name: currentLocation.name,
                url: currentLocation.url
            })
            props.setCurrentPage(4)
        }
    }

    /**
     * @param {Number} posx 
     * @param {Number} posy 
     * @param {CanvasRenderingContext2D} context 
     * @returns {Uint8ClampedArray} RGBA colors
     */
    function getColour(posx, posy, context) {
        return context.getImageData(Math.round(posx), Math.round(posy), 1, 1).data
    }

    /**
     * Tests wheter position is accessible or not
     * @param {Number} posx 
     * @param {Number} posy 
     * @param {CanvasRenderingContext2D} context 
     * @returns {Boolean} 
     */
    function isBlocked(posx, posy, context) {
        const tolerance = 25
        const rgb = getColour(posx, posy, context)
        return (rgb[0] < tolerance && rgb[1] < tolerance && rgb[2] < tolerance)
    }

    /**
     * Wheter all pixels in the search area are accessible 
     * @param {Number} newPosx 
     * @param {Number} newPosy 
     * @param {CanvasRenderingContext2D} context 
     * @returns {Boolean}
     */
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

    /**
     * "victory-road" -> "Victory Road"
     * @param {String} name fucked name (with hyphens)
     * @returns {String} unfucked name (without hyphens, UppperCase first letters)
     */
    function properName(name) {
        return name.split("-").map(word => [word[0].toUpperCase(), ...word.slice(1)].join("")).join(" ")
    }

    // use effects
    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        context.canvas.width = window.innerWidth * 0.987
        context.canvas.height = window.innerHeight * 0.98

        console.log("ugye nem crash? 😇")

        const wallCanvas = wallCanvasRef.current
        wallCanvas2dContext = wallCanvas.getContext('2d', { alpha: false })
        wallCanvas2dContext.canvas.width = window.innerWidth * 0.987
        wallCanvas2dContext.canvas.height = window.innerHeight * 0.98

        let animationFrameId

        const render = () => {
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
        const fetchData = async () => {
            const areas = [
                {
                    topLeft: {
                        x: 615,
                        y: 251
                    },
                    bottomRight: {
                        x: 760,
                        y: 370
                    }
                },
                {
                    topLeft: {
                        x: 1305,
                        y: 54
                    },
                    bottomRight: {
                        x: 1457,
                        y: 194
                    }
                },
                {
                    topLeft: {
                        x: 185,
                        y: 950
                    },
                    bottomRight: {
                        x: 290,
                        y: 1020
                    }
                },
                {
                    topLeft: {
                        x: 1353,
                        y: 840
                    },
                    bottomRight: {
                        x: 1534,
                        y: 960
                    }
                },
                {
                    topLeft: {
                        x: 580,
                        y: 26
                    },
                    bottomRight: {
                        x: 785,
                        y: 177
                    }
                },
                {
                    topLeft: {
                        x: 18,
                        y: 397
                    },
                    bottomRight: {
                        x: 217,
                        y: 558
                    }
                },
                {
                    topLeft: {
                        x: 57,
                        y: 703
                    },
                    bottomRight: {
                        x: 188,
                        y: 892
                    }
                },
                {
                    topLeft: {
                        x: 1263,
                        y: 216
                    },
                    bottomRight: {
                        x: 1523,
                        y: 421
                    }
                },
                {
                    topLeft: {
                        x: 970,
                        y: 175
                    },
                    bottomRight: {
                        x: 1133,
                        y: 338
                    }
                },
                {
                    topLeft: {
                        x: 229,
                        y: 124
                    },
                    bottomRight: {
                        x: 496,
                        y: 280
                    }
                },
                {
                    topLeft: {
                        x: 1019,
                        y: 598
                    },
                    bottomRight: {
                        x: 1195,
                        y: 758
                    }
                },
                {
                    topLeft: {
                        x: 820,
                        y: 713
                    },
                    bottomRight: {
                        x: 1006,
                        y: 873
                    }
                },
                {
                    topLeft: {
                        x: 1232,
                        y: 452
                    },
                    bottomRight: {
                        x: 1428,
                        y: 573
                    }
                },
                {
                    topLeft: {
                        x: 283,
                        y: 751
                    },
                    bottomRight: {
                        x: 436,
                        y: 860
                    }
                },
                {
                    topLeft: {
                        x: 1111,
                        y: 27
                    },
                    bottomRight: {
                        x: 1271,
                        y: 138
                    }
                },
                {
                    topLeft: {
                        x: 820,
                        y: 197
                    },
                    bottomRight: {
                        x: 920,
                        y: 340
                    }
                },
                {
                    topLeft: {
                        x: 1084,
                        y: 801
                    },
                    bottomRight: {
                        x: 1266,
                        y: 966
                    }
                },
                {
                    topLeft: {
                        x: 402,
                        y: 872
                    },
                    bottomRight: {
                        x: 667,
                        y: 1018
                    }
                },
                {
                    topLeft: {
                        x: 552,
                        y: 695
                    },
                    bottomRight: {
                        x: 790,
                        y: 851
                    }
                },
                {
                    topLeft: {
                        x: 251,
                        y: 503
                    },
                    bottomRight: {
                        x: 462,
                        y: 682
                    }
                },
            ]
            const response = await fetch('https://pokeapi.co/api/v2/location');
            const jsonData = await response.json();

            const locationsApiData = jsonData.results.map((location, i) => ({
                name: location.name,
                properName: properName(location.name),
                id: i + 1,
                isDiscovered: false,
                pos: areas[i] ? areas[i] : {
                    topLeft: {
                        x: 0,
                        y: 0
                    },
                    bottomRight: {
                        x: 100,
                        y: 100
                    }
                },
                url: location.url
            }))
            localLocations = locationsApiData
        };
        fetchData();
    }, []);

    return (
        <>
            <canvas ref={canvasRef} className='canvas-main'></canvas>
            <canvas ref={wallCanvasRef} className='hidden'></canvas>
        </>
    )
}