// Variables
let pokemonContainer = document.querySelector(".container")
let modal = document.querySelector('.modal-container')
let types = {
    fire: "#FDDFDF",
    grass:"#DEFDE0",
    eletric:"#FCF7DE",
    water:"#DEF3FD",
    ground:"#f4e7da",
    rock:"#d5d5d4",
    fairy:"#fceaff",
    poison:"#98d7a5",
    bug:"#f8d5a3",
    dragon:"#97b3e6",
    psychic:"#eaeda1",
    flying:"#F5F5F5",
    fighting:"#E6E0D4",
    normaç:"#F5F5F5",
}
let inicialPokemon = 1
let pokemon_count = 50 

// Numbers of pokemons request
singleFetch()
async function singleFetch(){
    for(inicialPokemon; inicialPokemon <= pokemon_count; inicialPokemon++){
        await getPokemon(inicialPokemon)
    }
}

//Resquest for card 
async function getPokemon(id){
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    let response = await fetch(url)
    let data = await response.json()

    // Writeing html card
    pokemonContainer.innerHTML += `
        <div class="card" data-key="${data.id}">
            <div class="circle">
                <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${data.id.toString().padStart(3,"0")}.png" class="pokeimg">
            </div>
            <div class="idpoke">#${data.id.toString().padStart(3,"0")}</div>
            <div class="name">${data.name}</div>
            <div class="type">Type: ${data.types[0].type.name}</div>
        </div>`

    // Select background color card    
    let typeCard = data.types[0].type.name
    let typesPokemon = Object.keys(types)
    if(typesPokemon.includes(typeCard)){
        document.querySelector(`.card[data-key="${data.id}"]`).style.backgroundColor = types[typeCard]
    }    
}