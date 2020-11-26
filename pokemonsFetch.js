
//
//URL API POKEMON "https://pokeapi.co/"

const container = document.querySelector('.container')

function searchData() {

    const maxPokemons = 20;

    for(let i = 1; i <= maxPokemons; i++){
        let idPokemon = i;

        
        const urlApi = `https://pokeapi.co/api/v2/pokemon/${idPokemon}`;
        
        fetch(urlApi ,{
            method: "GET",
            'content-type': 'application/json',
        })
        .then(response =>  response.json())
        .then(data => {
            const divPokemon = document.createElement('div');
            divPokemon.classList.add('pokemon');
            container.appendChild(divPokemon)

            const namePokemon = document.createElement('p');
            namePokemon.classList.add('pokemon__name')
            divPokemon.appendChild(namePokemon)
            namePokemon.innerHTML = data.name;
            console.log(data.sprites)

            const imagem = document.createElement('img');
            divPokemon.appendChild(imagem);
            imagem.src = data.sprites.front_default;
            imagem.classList.add('pokemon__img');
        })
    }
} 

searchData();




    
