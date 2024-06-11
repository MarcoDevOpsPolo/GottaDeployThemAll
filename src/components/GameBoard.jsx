import { useState, useEffect, useCallback } from "react";
import './../pages/Location.css';
import { TextBox } from "./TextBox";

export function GameBoard(props) {
    const [backgroundImg, setBackgroundImg] = useState("");
    const [texts, setTexts] = useState([]);
    const [currentBox, setCurrentBox] = useState(0);

    const handleComplete = useCallback(() => {
        setCurrentBox((prev) => prev + 1);
    }, []);

    useEffect(() => {
        //Mount
        const parts = props.location.split("-");
        let name = "/";
        if (parts[0] === "oreburgh" || parts[0] === "sinnoh" || parts[0] === "eterna") {
            name += parts[0] + "_" + parts[1] + ".png";
        } else {
            name += parts[0] + ".png";
        }
        setBackgroundImg(name);

        const textRows = [
            "Welcome in Eterna City!",
            "You might encounter here a lot of exciting pokemons!",
            "Let's take a walk and try to find one..."
        ];
        setTexts(textRows);

        //Unmount
        return () => {};
    }, []);

    return (
        <div id="gameBoard" style={{ '--img': `url(${backgroundImg})` }}>
            <div className="textBox">
                {texts.map((text, index) => (
                    index <= currentBox && (
                        <TextBox
                            key={index}
                            text={text}
                            onComplete={handleComplete}
                        />
                    )
                ))}
            </div>    
        </div>
    );
}
