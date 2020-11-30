
//URL API POKEMON "https://pokeapi.co/"

const container = document.querySelector('.container');
const next = document.querySelector('.next');
const previous = document.querySelector('.previous');

let offset = 0;
let maxPokemon = 20;
let limit = 0;

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
    normal: '#F5F5F5'
};

const getPokemonsApi = async () => {
    
    for(let i = 1; i < maxPokemon; i++) {
        let descriptionPokemon = ''
        await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}limit=${limit}`, {
            method: 'GET',
            'content-type': 'application-json'
        })
        .then(response => response.json())
        .then(data => {
            fetch(`https://pokeapi.co/api/v2/pokemon-species/${i}`)
            .then(response => response.json())
            .then(data => {
                console.log(`https://pokeapi.co/api/v2/pokemon-species/${i}`)
                descriptionPokemon = data.flavor_text_entries[i].flavor_text
                console.log(data.flavor_text_entries[i])
            });
            
            fetch(`https://pokeapi.co/api/v2/pokemon/${data.results[i-1].name}`)
            .then(response => response.json())
            .then(data => {
                
                let type1 = data.types[0].type.name
                let type2 = ''
                data.types[1] === undefined ? type2 = '' : type2 = data.types[1].type.name
                let types = ''
                type2 === '' ? types = type1 : types = type1 + ' | ' + type2
                        
                const color = colors[type1]
                const pokemon = document.createElement('div')
                pokemon.classList.add('pokemon')
                pokemon.style.backgroundColor = color

                const createPokemon = `
                <h2 class="pokemon__name">${data.name}</h2>
                <div class="pokemon__img">
                    <img src = "https://pokeres.bastionbot.org/images/pokemon/${data.id}.png" alt="${data.name}"/>
                </div>
                <p class="pokemon__description">${descriptionPokemon}</p>
                <p class= "pokemon__type">Type: ${types}</p>
                <span class="pokemon__id">${data.id}</span>
                `;
                
                
                pokemon.innerHTML = `${createPokemon} `
                container.appendChild(pokemon)
            });
        })
    }
}

getPokemonsApi();

next.addEventListener('click', () => {

    container.innerHTML = ''
    offset += 20;
    limit += 20;
    getPokemonsApi();
})


previous.addEventListener('click', () => {
    if (offset >= 20) {

        container.innerHTML = ''
        offset -= 20;
        limit -= 20;
        getPokemonsApi();
    }

})