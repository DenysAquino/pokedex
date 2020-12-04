//URL API POKEMON "https://pokeapi.co/"

const container = document.querySelector('.container');
const next = document.querySelector('.next');
const previous = document.querySelector('.previous');

let count = 1;
let offset = 0;
let limitPokemon = 20;
let descriptionPokemon = '';

const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5',
    dark: '#152f3e',
    ghost: '#152f3e'
};
//Definindo limites por página / Atualiza o contador.
const setOffsetAttCount = async() => {
    for (let i = 0; i < limitPokemon; i++) {

        await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}limit=${limitPokemon}`)
            .then(response => response.json())
            .then(getDescription())
            .catch(error => console.log("Deu ruim, erro: " + error))
        count++
    }
}
//Pegando descrição e chamando MountPokemon para concluir card;
const getDescription = () => {

    fetch(`https://pokeapi.co/api/v2/pokemon-species/${count}`)
        .then(response => response.json())
        .then(data => {
            descriptionPokemon = data.flavor_text_entries[13].flavor_text
           
        })
        .catch(error => console.log("Deu ruim, erro: " + error))
    mountPokemonData()    
}
//Montando objeto pokemon com dados do pokemon, e chamando creatElementPokemon
// para montar template.
const mountPokemonData = () =>{
    fetch(`https://pokeapi.co/api/v2/pokemon/${count}`)
        .then(response => response.json())
        .then(data => {

            let type1 = data.types[0].type.name
            let type2 = ''
            data.types[1] === undefined ? type2 = '' : type2 = data.types[1].type.name
            let types = ''
            type2 === '' ? types = type1 : types = type1 + ' | ' + type2

            const color = colors[type1] !== undefined ? colors[type1] : colors[type2];

            const pokemon = {
                type: types,
                id: data.id,
                name: data.name,
                description: descriptionPokemon,
                color: color
            }
            createElementPokemon(pokemon)

        })
        .catch(error => console.log("Deu ruim, erro: " + error))
}
//Finalmente cria no DOM o elemento com os dados;
const createElementPokemon = (pokemon) => {

    const pokemonCard = document.createElement('div')
    pokemonCard.classList.add('pokemon')
    pokemonCard.style.backgroundColor = pokemon.color

    const createPokemon = `
    <h2 class="pokemon__name">${pokemon.name}</h2>
    <div class="pokemon__img">
        <img src = "https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt="${pokemon.name}"/>
    </div>
    <p class="pokemon__description">${pokemon.description}</p>
    <p class= "pokemon__type">Type: ${pokemon.type}</p>
    <span class="pokemon__id">${pokemon.id}</span>
    `;
    pokemonCard.innerHTML = `${createPokemon} `
    container.appendChild(pokemonCard)
}
setOffsetAttCount();

next.addEventListener('click', () => {
    container.innerHTML = ''
    offset += 20;
    setOffsetAttCount();
})

previous.addEventListener('click', () => {
    if (offset >= 20) {
        container.innerHTML = ''
        offset -= 20;
        count -= 40
        setOffsetAttCount();
    }
})