//VAR & CONST

//BUTTONS
//BUTTONS-NUMBERS
const pokemonContainer = document.querySelector(".screen-pokemon-container");
const btn1 = document.querySelector("#btn1");
const btn2 = document.querySelector("#btn2");
const btn3 = document.querySelector("#btn3");
const btn4 = document.querySelector("#btn4");
const btn5 = document.querySelector("#btn5");
const btn6 = document.querySelector("#btn6");
const btn7 = document.querySelector("#btn7");
const btn8 = document.querySelector("#btn8");
const btn9 = document.querySelector("#btn9");
const btn0 = document.querySelector("#btn0");

//FALTA ARREGLAR BOTON SEARCH Y FLECHITAS DE LOS BOTONES

//BUTTONS-ARROWS
const btnUp = document.querySelector("#up");
const btnDown = document.querySelector("#down");
const btnRight = document.querySelector("#right");
const btnLeft = document.querySelector("#left");
//BUTTONS-ON/OFF SEARCH AND RESET
const searchBtn = document.querySelector("#search");
const resetBtn = document.querySelector("#reset");
const onOff = document.querySelector(".green-button");
//SCREEN
const blackScreen = document.querySelector(".search");
const page1 = document.querySelector("#page1");
const page2 = document.querySelector("#page2");
//LIGHTS
const orange = document.querySelector(".orange-button");
const bright = document.querySelector(".bright-light");
const red = document.querySelector(".red-light");
const green = document.querySelector(".green-light");
const yellow = document.querySelector(".yellow-light");
//ARRAYS
let on = false;
let auxId;
const numberButtons = [
  btn1,
  btn2,
  btn3,
  btn4,
  btn5,
  btn6,
  btn7,
  btn8,
  btn9,
  btn0,
];

const buttons = [
  btnUp,
  btnDown,
  btnLeft,
  btnRight,
  btn1,
  btn2,
  btn3,
  btn4,
  btn5,
  btn6,
  btn7,
  btn8,
  btn9,
  btn0,
  searchBtn,
  resetBtn,
];
const lights = [orange, bright, red, green, yellow];

//STARTS EXECUTION
window.addEventListener("DOMContentLoaded", () => {
  Swal.fire(
    'INSTRUCTIONS',
    'Turn your Pokedex on with the green button and use the right keyboard numbers & search button in order to get info of any pokemon you want. You can also use the left & right arrows to see next or previous pokemon, and up & down arrows to see their moves.\nNOT ADAPTED TO MOBILE SCREENS.',
    'info'
  )
  disableButtons();//line 88
  resetBlackScreen();// line 109
});

//FUNCTIONS
//HELPER FUNCTIONS

function disableButtons() {
  buttons.forEach((boton) => {
    boton.disabled = true;
  });
}
function enableButtons() {
  buttons.forEach((boton) => {
    boton.disabled = false;
  });
}
function disableLights() {
  lights.forEach((light) => {
    light.classList.add("opacity-5");
  });
}
function enableLights() {
  lights.forEach((light) => {
    light.classList.remove("opacity-5");
  });
}
//REST OF FUNCTIONS
function resetBlackScreen() {
  blackScreen.textContent = "";
}

function SearchClear() {
  while (document.querySelector("#page1").firstChild) {
    document.querySelector("#page1").firstChild.remove();
  }
  while (document.querySelector("#page2").firstChild) {
    document.querySelector("#page2").firstChild.remove();
  }
}

//FETCH FUNCTION
function searchPkmn(id) {
 if (id > 250) {
    screenErrorMessage("There are 250 pokemons to catch!"); //LINE 168
    disableButtons();
    return;
  } else{
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        createPkmn(data);
        page2.classList.add("d-none");
        page1.classList.remove("d-none");
        // console.log(data);
        // console.log(data.moves[3].move.name);
        // console.log(data.sprites.front_default);
      });
  }
}

//Creates HTML with pokemon info
function createPkmn(value) {
  const page1 = document.querySelector("#page1");
  const p1 = document.createElement("div");
  p1.innerHTML = `
    <h3 class="tt-c">${value.name}</h3>
    <img src="${value.sprites.front_default}" alt="${value.name}-picture">
    <p> <      - ${value.id} -     > </p>
    `;
  page1.appendChild(p1);
  const page2 = document.querySelector("#page2");
  const p2 = document.createElement("div");
  p2.innerHTML = `
    <h3 class="mt-1rem">Attacks</h3>
    <ul class="ls-none tac mp-0 tt-c mb-1rem mt-2rem">
    <li class="mb-1rem">${value.moves[0].move.name}</li>
    <li class="mb-1rem">${value.moves[1].move.name}</li>
    <li class="mb-1rem">${value.moves[2].move.name}</li>
    <li class="mb-1rem">${value.moves[3].move.name}</li>
    </ul>
    <p><                           ></p>
    `;
  page2.appendChild(p2);
}

function screenErrorMessage(error) {
  const page1 = document.querySelector("#page1");
  page1.innerHTML = `
    <p style="font-size: 2rem; text-align: center">${error}</p>
  `;
  setTimeout(() => {
    SearchClear();
    enableButtons();
  }, 2000);
}

//EVENTLISTENERS

//EVENTLISTENERS FOR NUMBER BUTTONS
numberButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (e.target.textContent == 0) {
      if (blackScreen.textContent == "") {
        return;
      } else if (blackScreen.textContent < 999) {
        blackScreen.textContent += e.target.textContent;
        return;
      }
    }
    if (blackScreen.textContent < 999) {
      blackScreen.textContent += e.target.textContent;
    }
  });
});
// EVENTLISTENERS FOR ON/OFF SEARCH & RESET
onOff.addEventListener("click", () => {
  if (on == false) {
    enableButtons();
    enableLights();
    on = true;
  } else {
    on = false;
    disableButtons();
    disableLights();
    SearchClear();
    resetBlackScreen();
  }
});

resetBtn.addEventListener("click", () => {
  blackScreen.textContent = "";
  SearchClear();
  auxId = 0;

});

searchBtn.addEventListener("click", () => {
  if(!blackScreen.textContent == ''){
    SearchClear();
    const id = blackScreen.textContent;
    auxId = id;
    searchPkmn(id);
    resetBlackScreen();
  }
});

//EVENTLISTENERS-ARROWS
btnLeft.addEventListener("click", () => {
  const page1 = document.querySelector("#page1");

  if (auxId > 1 && page1.value != '') {
    SearchClear();
    const id = blackScreen.textContent;
    searchPkmn(auxId - 1);
    auxId--;
    page2.classList.add("d-none");
    page1.classList.remove("d-none");
  }
});

btnRight.addEventListener("click", () => {
  const page1 = document.querySelector("#page1");

  if (auxId < 250 && auxId > 0 &&page1.value != '') {
    SearchClear();
    const id = blackScreen.textContent;
    searchPkmn(Number(auxId) + 1);
    auxId++;
    page2.classList.add("d-none");
    page1.classList.remove("d-none");
  }
});

btnUp.addEventListener("click", () => {
  page2.classList.add("d-none");
  page1.classList.remove("d-none");
});

btnDown.addEventListener("click", () => {
  page2.classList.remove("d-none");
  page1.classList.add("d-none");
});

