// - Make sure you check and understand the data that is given to you!
// - Create a card using JS that represents a single pokemon, use the example image as a reference. You will also find an HTML example commented out in the index.html
// - Use the exact CSS classes you see in the example HTML to obtain the same style for each card
// - The cards should be nested inside <ul class="cards"></ul>
// - Use the official-artwork object key as the images for the card. The images are all inside of the sprites key, in each pokemon object
// pokemon.sprites.other['official-artwork'].front_default

// - Render all the cards on the page that represents all the pokemons, recreating the same layout, using JS
/* this is one card implementation 
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


function createCards(){ //main function calling all other functions
    
    for(let i = 0; i< data.length; i++){
        const card = document.createElement("li");
        const cardHolder = document.querySelector("ul");
        card.className = "card" + " " + i;
        cardHolder.appendChild(card);
        card.appendChild(genSelector(i, card));
        card.appendChild(createCardTitle(i));
        card.appendChild(createCardImage(i));
        card.appendChild(createCardStats(i));
        card.appendChild(createGames(i));
        
    }
}

function createCardTitle(index){ //creates the title section and returns it
    const title = document.createElement("h2");
    title.className = "card--title";
    title.innerText = data[index].name.toUpperCase();
    return title;
}

function createCardImage(index){ //creates the card img element and returns it
    const img = document.createElement("img");
    img.className = "card--img" + " " + index;
    img.setAttribute("width", 256);
    img.setAttribute("src", data[index].sprites.other["official-artwork"].front_default);
    img.setAttribute("onclick","clickHandlerImage(this)");
    return img;
}

function createCardStats(index){ // creates the card stats section of the card and returns it
    const stats = document.createElement("ul");
    stats.className = "card--text";
    for(let i = 0; i < data[index].stats.length; i++){
        const stat = document.createElement("li");
        stat.innerText = `${data[index].stats[i].stat.name.toUpperCase()}: ${data[index].stats[i].base_stat}`;
        stats.appendChild(stat);
    }
    return stats;
}

function createGames(index){ //creates the section about all the games this pokemon is in and returns it
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
    console.log(index);
    if(e.getAttribute("src") === data[index].sprites.other["official-artwork"].front_default)
    {
        e.setAttribute("src",data[index].sprites.other.dream_world.front_default);
    }
    else {
        e.setAttribute("src",data[index].sprites.other["official-artwork"].front_default);
    }
}





function genSelector(index, card){
    const genSelect = document.createElement("select");
    genSelect.setAttribute("className",index);
    genSelect.setAttribute("onchange", "createNewSelect(this)");

    const versions = data[index].sprites.versions;
    const gameSelect = document.createElement("select");
    

    
    for (let key in versions) {
        if (versions.hasOwnProperty(key)) {
           const generationName = key;
           const genOption = document.createElement("option");
           genOption.innerText = generationName;
           genOption.setAttribute("value", generationName);
           genSelect.appendChild(genOption);
           gameSelect.setAttribute("classname",index);
           gameSelect.setAttribute("onchange","updateCardImage(this)");

        }   
    }
    const gameType = genSelect.options[genSelect.selectedIndex].value;
    const gamesObject = data[index].sprites.versions[gameType];
    for (let key2 in gamesObject) {
        const gameOptionName = key2;
        const gameOption = document.createElement("option");
        gameOption.innerText = gameOptionName;
        gameOption.setAttribute("value", gameOptionName);
        
        gameSelect.appendChild(gameOption);


    }
    card.appendChild(genSelect);
    return gameSelect;
}

function createNewSelect(e){
    const index = e.getAttribute("className");
    //console.log(index);
    const cardEl = document.getElementsByClassName(`card ${index}`);
    //console.log(cardEl[0]);
    const selectArr = cardEl[0].querySelectorAll("select");
    selectArr[1].remove();

    const gameSelect = document.createElement("select");
    gameSelect.setAttribute("className",index);
    gameSelect.setAttribute("onchange","updateCardImage(this)");
    const gameType = e.value;
    const gamesObject = data[index].sprites.versions[gameType];
    for (let key in gamesObject) {
        const gameOptionName = key;
        const gameOption = document.createElement("option");
        gameOption.innerText = gameOptionName;
        gameOption.setAttribute("value", gameOptionName);
        gameSelect.appendChild(gameOption);
    }
    insertAfter(e,gameSelect);

}

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function updateCardImage(e){
    const image = e.closest(".card").querySelector("img");
    const select = e.closest(".card").querySelector("select");
   
    const index = e.getAttribute("className");
    console.log(Number(index));
    console.log(e.value);
    const gamesObject = data[Number(index)].sprites.versions[select.value];
    console.log(data[Number(index)]);

    for (let key in gamesObject) {
        if(key === e.value){
            image.setAttribute("src", gamesObject[e.value].front_default);
        }
    }
   // image.setAttribute("src",);
}

createCards();

