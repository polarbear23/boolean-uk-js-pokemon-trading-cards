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


function cards(){ //Attaching a card to the cards holder// creates all the cards by looping through the data
    const cardHolder = document.querySelector("ul");
    for(let i = 0; i< data.length; i++){
        cardHolder.appendChild(createACard(i));
    }
    cardHolder.appendChild(createForm());
}

function updateCards(card){
    const cardHolder = document.querySelector("ul");
    cardHolder.append(card);
}

function createACard(index){ //main function calling all the other functions to create a card
    const card = document.createElement("li");
    card.className = "card" + " " + index;
    card.appendChild(genSelector(index, card));
    card.appendChild(createCardTitle(index));
    card.appendChild(createCardImage(index));
    card.appendChild(createCardStats(index));
    const arrow = createArrow(card, index, createGames(index));
    card.appendChild(arrow);
    return card;
}

function createCardTitle(index = 0){ //creates the title section and returns it
    const title = document.createElement("h2");
    title.className = "card--title";
    title.innerText = data[index].name.toUpperCase();
    return title;
}

function createCardImage(index = 0){ //creates the card img element and returns it
    const img = document.createElement("img");
    img.className = "card--img" + " " + index;
    img.setAttribute("width", 256);
    img.setAttribute("src", data[index].sprites.other["official-artwork"].front_default);
    img.setAttribute("onclick","clickHandlerImage(this)");
    return img;
}

function createCardStats(index = 0){ // creates the card stats section of the card and returns it
    const stats = document.createElement("ul");
    stats.className = "card--text";
    for(let i = 0; i < data[index].stats.length; i++){
        const stat = document.createElement("li");
        stat.innerText = `${data[index].stats[i].stat.name.toUpperCase()}: ${data[index].stats[i].base_stat}`;
        stats.appendChild(stat);
    }
    return stats;
}

function createArrow(card, index = 0, games){
    const arrowImage = document.createElement("img");
    const container = document.createElement("div");
    const arrowContainer = document.createElement("div");
    arrowImage.setAttribute("height", "30px");
    arrowImage.setAttribute("onclick", "");
    arrowImage.setAttribute("className", `arrow ${index}`);
    arrowImage.src = "images/arrow.svg";

    arrowImage.addEventListener("click",() => {
        const gameList = container.querySelector("ul");
        console.log(gameList);
        if(gameList.classList.contains("hide")){
            gameList.classList.remove("hide");
            arrowImage.style.transform = "scaleY(-1)";
        }
        else{
            gameList.classList.remove("show");
            gameList.classList.add("hide");
            arrowImage.removeAttribute("style");
        }
    });
    container.style.display = "grid";
    container.style.gridTemplateRows = "1fr 0.1fr";
    container.appendChild(games);
    arrowContainer.style.display = "grid";
    arrowContainer.style.placeItems = "center";
    arrowContainer.appendChild(arrowImage);
    container.appendChild(arrowContainer);
    return container;
}

function createGames(index = 0){ //creates the section about all the games this pokemon is in and returns it
    const games = document.createElement("ul");
    games.className = "card--text hide";
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

function genSelector(index = 0, card){
    const genSelect = document.createElement("select");
    genSelect.setAttribute("className",index);
    genSelect.setAttribute("onchange", "createNewSelect(this)");
    genSelect.style.border = "none";
    genSelect.style.margin = "15px";
    const versions = data[index].sprites.versions;
    const gameSelect = document.createElement("select");
    gameSelect.style.border = "none";

    
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
    //console.log(Number(index));
   // console.log(e.value);
    const gamesObject = data[Number(index)].sprites.versions[select.value];
   // console.log(data[Number(index)]);

    for (let key in gamesObject) {
        if(key === e.value){
            image.setAttribute("src", gamesObject[e.value].front_default);
        }
    }
}

function createForm(){
    const formHolder = document.createElement("li");
    formHolder.setAttribute("class","card");
    formHolder.style.padding = "20px";
    const form = document.createElement("form");
    const heading = document.createElement("h2");
    const name = document.createElement("input");
    const nameLabel = document.createElement("label");
    const mainImage = document.createElement("input");
    const mainImageLabel = document.createElement("label");
    const altImage = document.createElement("input");
    const altImageLabel = document.createElement("label");
    const submit = document.createElement("input");
    
    form.style.display = "grid";
    heading.innerText = "Add a Card";
    nameLabel.innerText = "Pokemon name:";
    nameLabel.setAttribute("id","name");
    name.setAttribute("id","name");
    mainImageLabel.innerText = "Main Image src:"
    mainImageLabel.setAttribute("id", "mainImageSRC");
    mainImage.setAttribute("id", "mainImageSRC");
    altImageLabel.setAttribute("id","altImageSRC");
    altImage.setAttribute("id", "altImageSRC");
    altImageLabel.innerText = "Alt Image src:"
    submit.setAttribute("type", "submit");
    
    form.addEventListener('submit', (event) => {
        // stop form submission
        event.preventDefault();
        //form.submit();
        addNewCard();
    });    formHolder.appendChild(form);
    form.appendChild(heading);
    form.appendChild(nameLabel);
    form.appendChild(mainImageLabel);
    form.appendChild(altImageLabel);
    form.appendChild(submit);
    nameLabel.appendChild(name);
    mainImageLabel.appendChild(mainImage);
    altImageLabel.appendChild(altImage);
    return formHolder;
}


function addNewCard(){
    const form = document.querySelector("form");
    const name = form.elements['name'];
    const mainImage = form.elements['mainImageSRC'];
    const altImage = form.elements['altImageSRC'];

    const newCard = {
        name: name.value,
        sprites: {
            other: {
                dream_world: {
                    front_default: mainImage.value,
                },
                "official-artwork": {
                    front_default: altImage.value,
                }
            }
        },
        versions: {
            "generation-i": {
              "red-blue": {
                back_default:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/back/1.png",
                back_gray:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/back/gray/1.png",
                front_default:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/1.png",
                front_gray:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/gray/1.png"
              },
              yellow: {
                back_default:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/yellow/back/1.png",
                back_gray:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/yellow/back/gray/1.png",
                front_default:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/yellow/1.png",
                front_gray:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/yellow/gray/1.png"
              }
            },
            "generation-ii": {
              crystal: {
                back_default:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/back/1.png",
                back_shiny:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/back/shiny/1.png",
                front_default:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/1.png",
                front_shiny:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/shiny/1.png"
              },
              gold: {
                back_default:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/gold/back/1.png",
                back_shiny:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/gold/back/shiny/1.png",
                front_default:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/gold/1.png",
                front_shiny:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/gold/shiny/1.png"
              },
              silver: {
                back_default:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/silver/back/1.png",
                back_shiny:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/silver/back/shiny/1.png",
                front_default:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/silver/1.png",
                front_shiny:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/silver/shiny/1.png"
              }
            },
            "generation-iii": {
              emerald: {
                front_default:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/1.png",
                front_shiny:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/shiny/1.png"
              },
              "firered-leafgreen": {
                back_default:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/back/1.png",
                back_shiny:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/back/shiny/1.png",
                front_default:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/1.png",
                front_shiny:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/shiny/1.png"
              },
              "ruby-sapphire": {
                back_default:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/ruby-sapphire/back/1.png",
                back_shiny:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/ruby-sapphire/back/shiny/1.png",
                front_default:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/ruby-sapphire/1.png",
                front_shiny:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/ruby-sapphire/shiny/1.png"
              }
            },
            "generation-iv": {
              "diamond-pearl": {
                back_default:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/diamond-pearl/back/1.png",
                back_female: null,
                back_shiny:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/diamond-pearl/back/shiny/1.png",
                back_shiny_female: null,
                front_default:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/diamond-pearl/1.png",
                front_female: null,
                front_shiny:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/diamond-pearl/shiny/1.png",
                front_shiny_female: null
              },
              "heartgold-soulsilver": {
                back_default:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/heartgold-soulsilver/back/1.png",
                back_female: null,
                back_shiny:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/heartgold-soulsilver/back/shiny/1.png",
                back_shiny_female: null,
                front_default:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/heartgold-soulsilver/1.png",
                front_female: null,
                front_shiny:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/heartgold-soulsilver/shiny/1.png",
                front_shiny_female: null
              },
              platinum: {
                back_default:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/platinum/back/1.png",
                back_female: null,
                back_shiny:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/platinum/back/shiny/1.png",
                back_shiny_female: null,
                front_default:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/platinum/1.png",
                front_female: null,
                front_shiny:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/platinum/shiny/1.png",
                front_shiny_female: null
              }
            },
            "generation-v": {
              "black-white": {
                animated: {
                  back_default:
                    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/1.gif",
                  back_female: null,
                  back_shiny:
                    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/shiny/1.gif",
                  back_shiny_female: null,
                  front_default:
                    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/1.gif",
                  front_female: null,
                  front_shiny:
                    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/1.gif",
                  front_shiny_female: null
                },
                back_default:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/back/1.png",
                back_female: null,
                back_shiny:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/back/shiny/1.png",
                back_shiny_female: null,
                front_default:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/1.png",
                front_female: null,
                front_shiny:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/shiny/1.png",
                front_shiny_female: null
              }
            },
            "generation-vi": {
              "omegaruby-alphasapphire": {
                front_default:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vi/omegaruby-alphasapphire/1.png",
                front_female: null,
                front_shiny:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vi/omegaruby-alphasapphire/shiny/1.png",
                front_shiny_female: null
              },
              "x-y": {
                front_default:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vi/x-y/1.png",
                front_female: null,
                front_shiny:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vi/x-y/shiny/1.png",
                front_shiny_female: null
              }
            },
            "generation-vii": {
              icons: {
                front_default:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/1.png",
                front_female: null
              },
              "ultra-sun-ultra-moon": {
                front_default:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/ultra-sun-ultra-moon/1.png",
                front_female: null,
                front_shiny:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/ultra-sun-ultra-moon/shiny/1.png",
                front_shiny_female: null
              }
            },
            "generation-viii": {
              icons: {
                front_default:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/1.png",
                front_female: null
              }
            }
          }, 
        stats: [
          {
            base_stat: 45,
            effort: 0,
            stat: {
              name: "hp",
              url: "https://pokeapi.co/api/v2/stat/1/"
            }
          },
          {
            base_stat: 49,
            effort: 0,
            stat: {
              name: "attack",
              url: "https://pokeapi.co/api/v2/stat/2/"
            }
          },
          {
            base_stat: 49,
            effort: 0,
            stat: {
              name: "defense",
              url: "https://pokeapi.co/api/v2/stat/3/"
            }
          },
          {
            base_stat: 65,
            effort: 1,
            stat: {
              name: "special-attack",
              url: "https://pokeapi.co/api/v2/stat/4/"
            }
          },
          {
            base_stat: 65,
            effort: 0,
            stat: {
              name: "special-defense",
              url: "https://pokeapi.co/api/v2/stat/5/"
            }
          },
          {
            base_stat: 45,
            effort: 0,
            stat: {
              name: "speed",
              url: "https://pokeapi.co/api/v2/stat/6/"
            }
          }
        ],
        game_indices: [
          {
            game_index: 153,
            version: {
              name: "red",
              url: "https://pokeapi.co/api/v2/version/1/"
            }
          },
          {
            game_index: 153,
            version: {
              name: "blue",
              url: "https://pokeapi.co/api/v2/version/2/"
            }
          },
          {
            game_index: 153,
            version: {
              name: "yellow",
              url: "https://pokeapi.co/api/v2/version/3/"
            }
          },
          {
            game_index: 1,
            version: {
              name: "gold",
              url: "https://pokeapi.co/api/v2/version/4/"
            }
          },
          {
            game_index: 1,
            version: {
              name: "silver",
              url: "https://pokeapi.co/api/v2/version/5/"
            }
          },
          {
            game_index: 1,
            version: {
              name: "crystal",
              url: "https://pokeapi.co/api/v2/version/6/"
            }
          },
          {
            game_index: 1,
            version: {
              name: "ruby",
              url: "https://pokeapi.co/api/v2/version/7/"
            }
          },
          {
            game_index: 1,
            version: {
              name: "sapphire",
              url: "https://pokeapi.co/api/v2/version/8/"
            }
          },
          {
            game_index: 1,
            version: {
              name: "emerald",
              url: "https://pokeapi.co/api/v2/version/9/"
            }
          },
          {
            game_index: 1,
            version: {
              name: "firered",
              url: "https://pokeapi.co/api/v2/version/10/"
            }
          },
          {
            game_index: 1,
            version: {
              name: "leafgreen",
              url: "https://pokeapi.co/api/v2/version/11/"
            }
          },
          {
            game_index: 1,
            version: {
              name: "diamond",
              url: "https://pokeapi.co/api/v2/version/12/"
            }
          },
          {
            game_index: 1,
            version: {
              name: "pearl",
              url: "https://pokeapi.co/api/v2/version/13/"
            }
          },
          {
            game_index: 1,
            version: {
              name: "platinum",
              url: "https://pokeapi.co/api/v2/version/14/"
            }
          },
          {
            game_index: 1,
            version: {
              name: "heartgold",
              url: "https://pokeapi.co/api/v2/version/15/"
            }
          },
          {
            game_index: 1,
            version: {
              name: "soulsilver",
              url: "https://pokeapi.co/api/v2/version/16/"
            }
          },
          {
            game_index: 1,
            version: {
              name: "black",
              url: "https://pokeapi.co/api/v2/version/17/"
            }
          },
          {
            game_index: 1,
            version: {
              name: "white",
              url: "https://pokeapi.co/api/v2/version/18/"
            }
          },
          {
            game_index: 1,
            version: {
              name: "black-2",
              url: "https://pokeapi.co/api/v2/version/21/"
            }
          },
          {
            game_index: 1,
            version: {
              name: "white-2",
              url: "https://pokeapi.co/api/v2/version/22/"
            }
          }
        ],
        id: 1
      }
      data.push(newCard);
      console.log("newcard");
      updateCards(createACard((data.length-1)));
    }


cards();

