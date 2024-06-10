/* for all time multi use functions */

export default function calculatePokemonEncounter(options) {
    const randomNumber = Math.floor(Math.random() * options.length);
    const pokemon = options[randomNumber];
    return pokemon
}