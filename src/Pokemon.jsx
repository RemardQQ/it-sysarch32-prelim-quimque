import React from 'react';

export default function Pokemon({ id, pokeName, type, image, pokeStats }) {
    return (
        <li>
            <img src={image} alt={pokeName} />

            <h3>
                [{id}] {pokeName}
            </h3>
            
            <ul className="pokeTypes">
                {type.map((typeName, index) => (
                    <li key={index}>{typeName}</li>
                ))}
            </ul>

            <ul className='thisColumn'>
                <li>HP: {pokeStats['HP']}</li>
                <li>Speed: {pokeStats['Speed']}</li>
                <li>Attack: {pokeStats['Attack']}</li>
                <li>Sp. Attk: {pokeStats['Sp. Attack']}</li>
                <li>Defense: {pokeStats['Defense']}</li>
                <li>Sp. Def: {pokeStats['Sp. Defense']}</li> {/* Corrected attribute name */}
            </ul>
        </li>
    )
}

