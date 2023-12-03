import { useState, useEffect } from 'react';
import axios from 'axios';

export const useGetAllPokemons = () => {
    const [pokemons, setPokemons] = useState([]);

    const callApi = async (name) => { // call api par name
        const { data: pokemon } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        return pokemon;
    };

    const getAllPokemonsInfo = async (results) => {
        Promise.all(results.map(({ name }) => callApi(name)))
            .then((values) => {
                setPokemons(values);

            });
    };

    useEffect(() => {
        const callAllPokemons = () => {
            try {
                axios.get('https://pokeapi.co/api/v2/pokemon?limit=100') // renvoi 100 pokemon avec ces caracteres
                    .then((response) => {
                        getAllPokemonsInfo(response.data.results);
                    });
            } catch (error) {
                console.log(error)
            }

        }
        callAllPokemons()
    }, []);
    console.log("useALl", pokemons)
    return pokemons
}
