import React, { useState, useEffect } from 'react';
import Pokemon from './Pokemon';

export default function Pokedex() {
    const [pokemonList, setPokemonList] = useState([]);
    const [language, setLanguage] = useState('english');
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        setLoading(true);
        fetch(`https://us-central1-it-sysarch32.cloudfunctions.net/pagination?page=${currentPage}`)
            .then(res => res.json())
            .then(data => {
                const modifiedData = data.data.map(pokemon => ({
                    ...pokemon,
                    pokeStats: pokemon.base,
                    // Include the name in the modified data
                    pokeName: pokemon.name[language]
                }));
                setPokemonList(modifiedData);
                setTotalPages(data.totalPages);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, [currentPage, language]);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleLanguageChange = (lang) => {
        setLanguage(lang);
        
    };

    return (
        <main>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div className="change_language">
                        <button onClick={() => handleLanguageChange('english')}>English</button>
                        <button onClick={() => handleLanguageChange('japanese')}>Japanese</button>
                        <button onClick={() => handleLanguageChange('chinese')}>Chinese</button>
                        <button onClick={() => handleLanguageChange('french')}>French</button>
                    </div>

                    <ul className="pokedex">
                        {pokemonList.map(pokemon => (
                            <Pokemon
                                key={pokemon.id}
                                {...pokemon}
                                language={language}
                            />
                        ))}
                    </ul>

                    <div className="pagination">
                        <button onClick={handlePrevPage} disabled={currentPage === 1}>
                            Back
                        </button>
                        <div className="page-numbers">
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => setCurrentPage(index + 1)}
                                    className={currentPage === index + 1 ? 'active' : ''}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                            Next
                        </button>
                    </div>
                </>
            )}
            <p>Page {currentPage} of {totalPages}</p>
        </main>
    );
}


