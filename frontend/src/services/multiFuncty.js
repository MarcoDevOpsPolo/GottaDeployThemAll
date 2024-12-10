/* for all time multi use functions */

/**
 * @StefanovEmilia
 * @param {Array} options 
 * @returns {Object} pokemon
 * This function gets an array of pokemons you might encounter and randomly selects one to do so. 
 * When this function has been called, the encounter is already settled, the only question is what pokemon will you bump in. 
 */
export default function calculatePokemonEncounter(options) {
    const randomNumber = Math.floor(Math.random() * options.length);
    const pokemon = options[randomNumber];
    return pokemon
}