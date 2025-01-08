import { useEffect, useState } from "react";
import "./../pages/Location.css"
import upperCaseFirstLetter from "./stringManipulation"

export default function PokemonData({ myPokemon, opponentPokemon, pokemonHps, setPokemonHps, numberOfAttacks, setCurrentPage, setMyPokemons, setChoosedPokemon, counter, setCounter, stillFight, setStillFight }) {
    const [myTurn, setMyTurn] = useState(true);
    //const [attacker, setAttacker] = useState(null)
    //const [defender, setDefender] = useState(null)
    const [catched, setCatched] = useState(false)
    const attacker = myPokemon
    const defender = opponentPokemon

    // useEffect(() => {
    //     //Mount, choose pokemon
    //     console.log("Welcome to PokemonData.jsx!")

    //     setAttacker(myPokemon)
    //     setDefender(opponentPokemon);

    //     //unmount
    //     return() => {console.log("Leaving PokemonData.jsx")}
    // }, [])

    useEffect(() => {
        console.log(attacker)
        console.log(defender)
        if (attacker && defender && (pokemonHps.yourHp > 0 && pokemonHps.opponentHp > 0)) {

            let fight = setTimeout(() => {
                numberOfAttacks++;
                console.log(numberOfAttacks);
                handleAttack(attacker, defender, myTurn);
                return () => clearTimeout(fight);
            }, 1000);
        }

        if (pokemonHps.yourHp <= 0 || pokemonHps.opponentHp <= 0) {
            setStillFight(false)
        }
    }, [pokemonHps])

    // useEffect(() => {
    //     if (numberOfAttacks) {
    //         console.log(numberOfAttacks);
    //     }
    // }, [numberOfAttacks])

    function handleAttack(attacker, defender, myTurn) {
        setCounter(counter++)
        console.log(counter)
        const Z = 217 + Math.round(Math.random() * 39);
        console.log(Z);
        let property;
        let B;
        let D;
        if (myTurn) {
            B = attacker.stats[1].base_stat;
            D = defender.stats[2].base_stat;
            property = "opponentHp";
        } else {
            B = defender.stats[1].base_stat;
            D = attacker.stats[2].base_stat;
            property = "yourHp";
        }
        const damage = ((((2 / 5 + 2) * B * 60 / D) / 50) + 2) * Z / 255;
        console.log(damage);
        setPokemonHps({
            ...pokemonHps,
            [property]: pokemonHps[property] - damage
        })
        console.log(pokemonHps.opponentHp);
        console.log(pokemonHps.yourHp);
        setMyTurn(myTurn => {
            if (myTurn === true) {
                return false;
            } else {
                return true;
            }
        });
        console.log(myTurn);
    }


    return (
        <>
            <div className="showdownFighters">
                <div>
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${`back/${myPokemon.id}`}.gif`}
                        alt="Your Pokemon" className={myTurn && counter > 0 && stillFight ? "yourPok" : ""} />
                    <ul>
                        <li>HP: {pokemonHps.yourHp.toFixed(1)}</li>
                        <li>Attack: {myPokemon.stats[1].base_stat}</li>
                        <li>Defense: {myPokemon.stats[2].base_stat}</li>
                    </ul>
                </div>
                <div>
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${`${opponentPokemon.id}`}.gif`}
                        alt="Opponent Pokemon" className={!myTurn && stillFight ? "opponentPok" : ""} />
                    <ul>
                        <li>HP: {pokemonHps.opponentHp.toFixed(1)}</li>
                        <li>Attack: {opponentPokemon.stats[1].base_stat}</li>
                        <li>Defense: {opponentPokemon.stats[2].base_stat}</li>
                    </ul>
                </div>
            </div>
            {pokemonHps.yourHp <= 0 && <div className="showdownResult"><h1 >Noooo! {upperCaseFirstLetter(attacker.name)} has gone! You loose!</h1>
                <div className="buttons">
                    <button onClick={(e) => {
                        setChoosedPokemon(null)
                        setCurrentPage(3)
                    }}>Leave</button>
                </div>
            </div>}
            {pokemonHps.opponentHp <= 0 && <div className="showdownResult"><h1 >Yes! {upperCaseFirstLetter(defender.name)} has been defeated! You can catch'em now!</h1>
                <div className="buttons">
                    <button onClick={(e) => {
                        setCatched(true)
                    }}>Catch!</button>
                    <button onClick={(e) => {
                        setChoosedPokemon(null)
                        setCurrentPage(3)
                    }}>Leave</button>
                </div>
                {catched && <><h1>{upperCaseFirstLetter(defender.name)} is yours! Congratulation!</h1><div className="buttons"><button onClick={(e) => {
                    setMyPokemons((prev) => [...prev, defender])
                    setChoosedPokemon(null)
                    setCurrentPage(3)
                }}>Leave</button></div></>}
            </div>}
        </>
    );

}