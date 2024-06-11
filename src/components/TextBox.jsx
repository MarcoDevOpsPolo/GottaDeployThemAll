import { useState, useEffect } from "react"
import "./../pages/Location.css"
import React from "react";

export function TextBox({ text, onComplete, speed = 30, tag }) {

    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        console.log("textbox works")
        if (currentIndex < text.length) {
            const timeoutId = setTimeout(() => {
                setDisplayedText((prev) => prev + text[currentIndex]);
                setCurrentIndex(currentIndex + 1);
            }, speed);

            return () => clearTimeout(timeoutId);
        } else {
            if (onComplete) {
                onComplete();
            }
        }

        return () => { }
    }, [currentIndex, text, speed, onComplete]);

    return <>{tag ? React.createElement(tag, null, displayedText): <p>{displayedText}</p>}</>;
}