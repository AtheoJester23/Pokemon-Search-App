const health = document.getElementById("hp");
const damage = document.getElementById("attack");
const armor = document.getElementById("defense");
const ss = document.getElementById("special-attack");
const sd = document.getElementById("special-defense");
const theSpeed = document.getElementById("speed");
const name = document.getElementById("pokemon-name");
const theId = document.getElementById("pokemon-id");
const theWeight = document.getElementById("weight");
const theHeight = document.getElementById("height");
const theType = document.getElementById("types");
const imgContainer = document.querySelector(".spriteContainer");
const searchInput = document.getElementById("search-input");

function clearDisplay() {
  searchInput.value = "";

  name.textContent = "";
  theId.textContent = ``;
  theWeight.textContent = ``;
  theHeight.textContent = ``;
  imgContainer.innerHTML = "";
  theType.innerHTML = "";
  health.textContent = "";
  damage.textContent = "";
  armor.textContent = "";
  ss.textContent = "";
  sd.textContent = "";
  theSpeed.textContent = "";
}

const fetchData = async () => {
  const userInput = searchInput.value.toLowerCase();

  try {
    if (userInput === "") {
      console.log("There's no input");
      return;
    }

    const response = await fetch(
      "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/" +
        String(userInput)
    );
    const data = await response.json();

    console.log(
      data.types.map((abc) => {
        console.log(abc.type.name);
      })
    );

    //Displays
    name.textContent = data.name;
    theId.textContent = `#${data.id}`;
    theWeight.textContent = `Weight: ${data.weight}`;
    theHeight.textContent = `Height: ${data.height}`;

    theType.innerHTML = data.types
      .map(
        (pokemonType) =>
          `<span class='${pokemonType.type.name}'>${pokemonType.type.name}</span>`
      )
      .join("");

    health.textContent = data.stats[0].base_stat;
    damage.textContent = data.stats[1].base_stat;
    armor.textContent = data.stats[2].base_stat;
    ss.textContent = data.stats[3].base_stat;
    sd.textContent = data.stats[4].base_stat;
    theSpeed.textContent = data.stats[5].base_stat;
    imgContainer.innerHTML = `
      <img src='${data.sprites.front_default}' id='sprite' class='container'/>
    `;

    searchInput.value = "";
  } catch (theError) {
    clearDisplay();
    alert("Pokémon not found");
  }
};

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    fetchData();
  }
});

document.getElementById("search-button").addEventListener("click", (e) => {
  e.preventDefault();
  fetchData();
});
