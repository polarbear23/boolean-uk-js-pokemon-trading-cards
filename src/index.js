// - Make sure you check and understand the data that is given to you!
// - Create a card using JS that represents a single pokemon, use the example image as a reference. You will also find an HTML example commented out in the index.html
// - Use the exact CSS classes you see in the example HTML to obtain the same style for each card
// - The cards should be nested inside <ul class="cards"></ul>
// - Use the official-artwork object key as the images for the card. The images are all inside of the sprites key, in each pokemon object
// pokemon.sprites.other['official-artwork'].front_default

// - Render all the cards on the page that represents all the pokemons, recreating the same layout, using JS
/*
const card = document.createElement("li");
const title = document.createElement("h2");
const img = document.createElement("img");
const stats = document.createElement("ul");
const stat = document.createElement("li");

card.className = "card";
title.className = "card--title";
title.innerText = data[0].name;
img.className = "card--img";
img.setAttribute("width", 256);
img.setAttribute("src", data[0].sprites.other["official-artwork"].front_default);
stats.className = "card--text";
stat.innerText = `${data[0].stats[0].stat.name.toUpperCase()}: ${data[0].stats[0].base_stat}`;




card.appendChild(title);
card.appendChild(img);
card.appendChild(stats);
stats.appendChild(stat);
const cardHolder = document.querySelector("ul");
cardHolder.appendChild(card);

console.log(data);
*/


function createCards(){
    
    for(let i = 0; i< data.length; i++){
        console.log("a");
        const card = document.createElement("li");
        const cardHolder = document.querySelector("ul");
        card.className = "card";


        cardHolder.appendChild(card);
        card.appendChild(createCardTitle(i));
        card.appendChild(createCardImage(i));
        card.appendChild(createCardStats(i));
        card.appendChild(createGames(i));
    }
}

function createCardTitle(index){
    const title = document.createElement("h2");
    title.className = "card--title";
    title.innerText = data[index].name.toUpperCase();
    return title;
}

function createCardImage(index){
    const img = document.createElement("img");
    const img2 = document.createElement("img");
    img.className = "card--img" + " " + index;
    img.setAttribute("width", 256);
    img.setAttribute("src", data[index].sprites.other["official-artwork"].front_default);
    img.setAttribute("onclick","clickHandlerImage(this)");
    return img;
}

function createCardStats(index){
    const stats = document.createElement("ul");
    stats.className = "card--text";
    for(let i = 0; i < data[index].stats.length; i++){
        const stat = document.createElement("li");
        stat.innerText = `${data[index].stats[i].stat.name.toUpperCase()}: ${data[index].stats[i].base_stat}`;
        stats.appendChild(stat);
    }
    return stats;
}

function createGames(index){
    const games = document.createElement("ul");
    games.className = "card--text";
    games.innerText = "Games:";
    for(let i = 0; i < data[index].game_indices.length; i++)
    {
        const game = document.createElement("li");
        game.innerText = `${data[index].game_indices[i].version.name.toUpperCase()}`;
        games.appendChild(game);
    }
    return games;
}

//to pass the reference I pass an index to the html via attaching to the class name when creating each image
function clickHandlerImage(e){
    const classes = e.className.split(" ");
    const index = classes[1]; // index of what pokemon it is
    
    if(e.getAttribute("src") === data[index].sprites.other["official-artwork"].front_default)
    {
        e.setAttribute("src",data[index].sprites.other.dream_world.front_default);
        
    }
    else {
        e.setAttribute("src",data[index].sprites.other["official-artwork"].front_default);
    }
}

createCards();