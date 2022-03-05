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

let on = false;
let auxId;
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
}

function searchPkmn(id) {
  if (id >= 1 && id <= 898) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        createPkmn(data);
        // console.log(data);
        // console.log(data.sprites.front_default);
      });
  }
}

function createPkmn(value) {
  const page1 = document.querySelector("#page1");
  const p1 = document.createElement("div");
  p1.innerHTML = `
    <h3 class="tt-c">${value.name}</h3>
    <img src="${value.sprites.front_default}" alt="${value.name}-picture">
    <p> <      - ${value.id} -     > </p>
    `;
  page1.appendChild(p1);
}
// function screenErrorMessage() {
//   blackScreen.textContent = "xD";
// }
//EVENTLISTENERS
window.addEventListener("DOMContentLoaded", () => {
  disableButtons();
  resetBlackScreen();
});
//EVENTLISTENERS FOR NUMBER BUTTONS
btn1.addEventListener("click", (e) => {
  if (blackScreen.textContent < 999) {
    blackScreen.textContent += e.target.textContent;
  }
});
btn2.addEventListener("click", (e) => {
  if (blackScreen.textContent < 999) {
    blackScreen.textContent += e.target.textContent;
  }
});
btn3.addEventListener("click", (e) => {
  if (blackScreen.textContent < 999) {
    blackScreen.textContent += e.target.textContent;
  }
});
btn4.addEventListener("click", (e) => {
  if (blackScreen.textContent < 999) {
    blackScreen.textContent += e.target.textContent;
  }
});
btn5.addEventListener("click", (e) => {
  if (blackScreen.textContent < 999) {
    blackScreen.textContent += e.target.textContent;
  }
});
btn6.addEventListener("click", (e) => {
  if (blackScreen.textContent < 999) {
    blackScreen.textContent += e.target.textContent;
  }
});
btn7.addEventListener("click", (e) => {
  if (blackScreen.textContent < 999) {
    blackScreen.textContent += e.target.textContent;
  }
});
btn8.addEventListener("click", (e) => {
  if (blackScreen.textContent < 999) {
    blackScreen.textContent += e.target.textContent;
  }
});
btn9.addEventListener("click", (e) => {
  if (blackScreen.textContent < 999) {
    blackScreen.textContent += e.target.textContent;
  }
});

btn0.addEventListener("click", (e) => {
  if (!blackScreen.textContent == "" && blackScreen.textContent < 999) {
    blackScreen.textContent += e.target.textContent;
  }
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
});
searchBtn.addEventListener("click", () => {
  SearchClear();
  const id = blackScreen.textContent;
  auxId = id;
  searchPkmn(id);
  resetBlackScreen();
});

//EVENTLISTENERS-ARROWS
btnLeft.addEventListener("click", () => {
  if (auxId > 1) {
    SearchClear();
    const id = blackScreen.textContent;
    searchPkmn(auxId - 1);
    auxId--;
    console.log(auxId > 1);
  }
});

btnRight.addEventListener("click", () => {
  if (auxId < 898) {
    SearchClear();
    const id = blackScreen.textContent;
    searchPkmn(Number(auxId) + 1);
    auxId++;
  }
});

// btnUp.addEventListener('click', ()=>{

// });
// btnDown.addEventListener('click', ()=>{

// });
