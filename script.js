// Variables
// Variables
let pokemonContainer = document.querySelector(".container")
let modal = document.querySelector('.modal-container')
let page = document.querySelector(".currentPage")
let currentPage = 1
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
let prev = document.querySelector(".prev")
let next = document.querySelector(".next")
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

    next.removeEventListener('click', nextPage)
    prev.removeEventListener('click', prevPage)

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
    pokeModal()

    //  load pages for add next page
    let loaded = document.querySelectorAll(".card")
    if(loaded.length == 50){
        callPages()
    }
}

// Add click card 
function pokeModal(){
    document.querySelectorAll(".card").forEach(item =>{
        item.addEventListener('click', () =>{
            let id = item.getAttribute("data-key")
            fillModal(id)
        })
    });
};

// Resquest for modal fill
async function fillModal(id){

    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    let response = await fetch(url)
    let data = await response.json()

    // Select background modal 
    modal.setAttribute("data-key", data.id)
    let typeCard = data.types[0].type.name
    let typesPokemon = Object.keys(types)
    if(typesPokemon.includes(typeCard)){
        document.querySelector(`.modal-container[data-key="${data.id}"]`).style.backgroundColor = types[typeCard]
    }    
    
    //Writeing modal 
    modal.innerHTML = `
        <div class="modal-left">
            <div class="circle-modal">
                <img class="img-modal" src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${data.id.toString().padStart(3,"0")}.png">
            </div>
            <div class="modal-name">${data.name}</div>
            <div class="modal-id">#${data.id.toString().padStart(3,"0")}</div>
            <div class="modal-type">Type: ${data.types[0].type.name}</div>
        </div>
        <div class="modal-right">
            <div class="poke-info">
                <div class="experience">Experience: ${data.base_experience}</div>
                <div class="weight">Weight: ${data.weight} Kg</div>
                <div class="height">Height: ${data.height * 10}cm</div>
            </div>
            <div class="poke-game">
                <div class="abylities">
                    <span class="title-abylities">Abylities</span>
                </div>
                <div class="types">
                    <span class="title-types">Types</span>
                </div>
        </div>
        </div>
       `
       
    // Writeing pokemon abilities 
    let abilityArray = data.abilities
    for (let i = 0; i < abilityArray.length; i++){
        let ability =  abilityArray[i].ability.name
        document.querySelector(".abylities").innerHTML += `<div class="ability">${ability}</div>` 
    }

    // Writing pokemon types 
    let typesArray = data.types
    for (let i = 0; i < typesArray.length; i++){
        let type =  data.types[i].type.name
        document.querySelector(".types").innerHTML += `<div class="type-modal">${type}</div>` 
    }

    // Open and Close modal 

        // Open 
    document.querySelector(".modal").style.display = "flex"
    setTimeout(()=>{
        document.querySelector(".modal").style.opacity = "1"
    },80)

        //Close
    document.querySelector(".modal").addEventListener("click", (e)=>{
        if(e.target.classList.contains("modal")){
            document.querySelector(".modal").style.opacity = "0"
            setTimeout(()=>{
                document.querySelector(".modal").style.display = "none"
            },300)
        }
    })
}

//Event buttons 
function callPages(){
    next.addEventListener('click', nextPage)
    prev.addEventListener('click', prevPage)
}

//function Buttons    
function nextPage(){
    event.preventDefault()
    if(currentPage < 17){
        pokemonContainer.innerHTML = ""
        inicialPokemon = pokemon_count + 1
         pokemon_count = pokemon_count + 50
         currentPage ++
         page.innerHTML = currentPage
        singleFetch()
    }
}

function prevPage(){
    event.preventDefault()
    if(currentPage > 1){
        pokemonContainer.innerHTML = ""
        inicialPokemon =  inicialPokemon - 100
        pokemon_count = pokemon_count - 50
        currentPage --
        page.innerHTML = currentPage
        singleFetch()
    }
}