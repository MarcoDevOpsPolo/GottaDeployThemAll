/**
     * Change the first letter to uppercase in a string.
     * E.g. "magikarp" -> "Magikarp"
     * @param {String} str Any given string
     */
export default function upperCaseFirstLetter(str) {
    return String(str).split("").map((letter, i) => i === 0 ? letter.toUpperCase() : letter).join("")
}