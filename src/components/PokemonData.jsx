import { useEffect, useState } from "react";

export default function PokemonData({ myPokemon, opponentPokemon }){
    const [myTurn, setMyTurn] = useState(true);
   
    useEffect(() => {
        setPokemonHps({yourHp: myPokemon.stats[0].base_stat, opponentHp: opponentPokemon.stats[0].base_stat});
        let attacker = myPokemon;
        let defender = opponentPokemon;
        console.log(opponentPokemon);
        let fight = setInterval(() => {
            handleAttack(attacker, defender, myTurn);
            console.log("asd");
            if(pokemonHps.yourHp <= 0 || pokemonHps.opponentHp <= 0){
                clearInterval(fight);
            }
            }, 2000)
    }, [])

    function handleAttack(attacker, defender, myTurn){
        const Z = 217 + Math.round(Math.random() *39);
        console.log(Z);
        let property;
        let B;
        let D;
        if(myTurn){
            B = attacker.stats[1].base_stat;
            D = defender.stats[2].base_stat;
            property = "opponentHp";
        } else {
            B = defender.stats[1].base_stat;
            D = attacker.stats[2].base_stat;
            property = "yourHp";
        }
        const damage = ((((2/5+2)*B*60/D)/50)+2)*Z/255;
        console.log(damage);
        setPokemonHps({
            ...pokemonHps,
            [property] : pokemonHps[property] - damage
        })
        setMyTurn(myTurn => {
            if (myTurn === true){
                return false;
            } else {
                return true;
            }
        });
        console.log(myTurn);
    }

    
    return(
        <>
            <div>
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${`back/${myPokemon.id}`}.gif`} 
                alt="Your Pokemon" className="yourPok"/>
                <ul>
                    <li>HP: {myPokemon.stats[0].base_stat}</li>
                    <li>Attack: {myPokemon.stats[1].base_stat}</li>
                    <li>Defense: {myPokemon.stats[2].base_stat}</li>
                </ul>
            </div>
            <div>
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${`${opponentPokemon.id}`}.gif`} 
                alt= "Opponent Pokemon" className= "opponentPok"/>
                <ul>
                    <li>HP: {opponentPokemon.stats[0].base_stat}</li>
                    <li>Attack: {opponentPokemon.stats[1].base_stat}</li>
                    <li>Defense: {opponentPokemon.stats[2].base_stat}</li>
                </ul>
            </div>
        </>
    );

}