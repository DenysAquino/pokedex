
//URL API POKEMON "https://pokeapi.co/"

const container = document.querySelector('.container');

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

const creatElementPokemon = async ()=>{

    const maxPokemons = 60;

    for (let i = 1; i <= maxPokemons; i++) {
        let idPokemon = i;
        let descriptionPokemon = ''
    
        await fetch(`https://pokeapi.co/api/v2/pokemon-species/${idPokemon}`)
        .then(response => response.json())
        .then(data => {
            // console.log(data.flavor_text_entries[idPokemon])
            descriptionPokemon = data.flavor_text_entries[idPokemon].flavor_text
        })
    
        await fetch(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`)
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

            const createPokemon =  `
                <h2 class="pokemon__name">${data.name}</h2>
                <div class="pokemon__img">
                    <img src = "https://pokeres.bastionbot.org/images/pokemon/${idPokemon}.png" alt="${data.name}"/>
                </div>
                <p class="pokemon__description">${descriptionPokemon}</p>
                <p class= "pokemon__type">Type: ${types}</p>
                <span class="pokemon__id">${idPokemon}</span>
            `;    
            
            pokemon.innerHTML = `${createPokemon} ` 
            container.appendChild(pokemon)        
        });
    }   
}

creatElementPokemon();


// fetch('https://pokeapi.co/api/v2/pokemon/?limit=20')
// .then(response => response.json())
// .then(data => {
//     console.log(data)
// })