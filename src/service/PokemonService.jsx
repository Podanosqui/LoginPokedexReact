export const PokemonService = {
    getPokemonsData() {
        const pokemonsInitializer = [
            {
                id: '25',
                nome: 'Pikachu',
                descricao: 'Pokémon do tipo elétrico com alguma descrição sobre.',
                image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png',
                peso: 10,
                tipo: 'Elétrico',
                statusInventario: 'Disponivel',
                rating: 5
            },
            {
                id: '92',
                nome: 'Haunter',
                descricao: 'Pokémon do tipo fantasma com alguma descrição sobre.',
                image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/093.png',
                peso: 0.1,
                tipo: 'Fantasma',
                statusInventario: 'Indisponivel',
                rating: 3
            },
        ]

        return pokemonsInitializer;
    },

    getPokemonsMini() {
        return Promise.resolve(this.getPokemonsData().slice(0, 5));
    },

    getPokemonsSmall() {
        return Promise.resolve(this.getPokemonsData().slice(0, 10));
    },

    getPokemons() {
        return Promise.resolve(this.getPokemonsData());
    },

    getPokemonssWithOrdersSmall() {
        return Promise.resolve(this.getPokemonsWithOrdersData().slice(0, 10));
    },

    getPokemonsWithOrders() {
        return Promise.resolve(this.getPokemonsWithOrdersData());
    }
}