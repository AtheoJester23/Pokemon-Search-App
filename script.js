const health = document.getElementById("hp");
const damage = document.getElementById("attack");
const armor = document.getElementById("defense");
const ss = document.getElementById("special-attack");
const sd = document.getElementById("special-defense");
const theSpeed = document.getElementById("speed");
const theName = document.getElementById("pokemon-name");
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
  if (searchInput.value === "") {
    console.log("There's no input");
    return;
  }

  try {
    const response = await fetch(
      "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/" +
        String(searchInput.value.toLowerCase())
    );
    const data = await response.json();

    console.log(data);

    const { name, id, weight, height, types, stats, sprites } = data;

    console.log(name);

    //Displays
    theName.innerHTML = name.toUpperCase();
    theId.innerHTML = `#${id}`;
    theWeight.innerHTML = `Weight: ${weight}`;
    theHeight.innerHTML = `Height: ${height}`;

    theType.innerHTML = types
      .map(
        (pokemonType) =>
          `<span class='${pokemonType.type.name}'>${pokemonType.type.name}</span>`
      )
      .join("");

    health.innerHTML = stats[0].base_stat;
    damage.innerHTML = stats[1].base_stat;
    armor.innerHTML = stats[2].base_stat;
    ss.innerHTML = stats[3].base_stat;
    sd.innerHTML = stats[4].base_stat;
    theSpeed.innerHTML = stats[5].base_stat;
    imgContainer.innerHTML = `
      <img src='${sprites.front_default}' id='sprite' class='container'/>
    `;

    searchInput.value = "";
  } catch (theError) {
    alert("Pokémon not found");
    clearDisplay();
  }
};

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    fetchData();
  }
});

document.getElementById("search-button").addEventListener("click", (e) => {
  e.preventDefault();
  fetchData();
});
