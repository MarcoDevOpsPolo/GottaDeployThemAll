import { useState, useEffect } from "react"
import "./../pages/Location.css"

export function TextBox({text, onComplete, speed = 30}) {

    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
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
    }, [currentIndex, text, speed, onComplete]);

    return <><p>{displayedText}</p></>;
}