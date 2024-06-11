import { useState, useEffect } from "react"
import './../pages/Location.css'

export function GameBoard(props) {

    const [backgroundImg, setBackgroundImg] = useState("")

    useEffect(() => {
        //Mount
        const parts = props.location.split("-")
        let name = "/"
        if (parts[0] === "oreburgh" || parts[0] === "sinnoh" || parts[0] === "eterna") {
            name += parts[0] + "_" + parts[1] + ".png"
        } else {
            name += parts[0] + ".png"
        }

        setBackgroundImg(name)

        if (backgroundImg) {
            console.log(backgroundImg)
        }

        //Unmount
        return () => {
            
        }
    }, [backgroundImg])

    return (
        <div id="gameBoard" style={ {'--img': `url(${backgroundImg})`}}>
        </div>
    )
}