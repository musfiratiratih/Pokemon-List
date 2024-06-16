// event yang akan dijalankan jika markup di index.html berhasil di render
document.addEventListener('DOMContentLoaded', fetchPokemonList);

// fungsi untuk mendapatkan list pokemon yang detail sesuai kebutuhan
async function fetchPokemonList() {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=20';

    const response = await fetch(url);
    const data = await response.json();

    // bagian untuk parsing data pokemon (yang dibutuhkan hanya nama dan gambar)
    const pokemons = [];
    for (const result of data.results) {
        const detail = await fetchPokemonDetail(result.url)
        pokemons.push({name: result.name, image: detail.sprites.front_default})
    }

    displayPokemonList(pokemons)
}

// fungsi untuk mendapatkan detail pokemon
async function fetchPokemonDetail(url) {
    const response = await fetch(url)
    return await response.json();
}

// fungsi untuk menampilkan list pokemon berupa nama dan gambar ke container yang disediakan
function displayPokemonList(pokemonList) {
    const container = document.getElementById('pokemonContainer');
    container.innerHTML = '';  // Clear any existing content

    pokemonList.forEach(pokemon => {
        const pokemonCard = document.createElement('div');
        pokemonCard.className = 'bg-white p-4 rounded shadow flex justify-between items-center';

        pokemonCard.innerHTML = `
            <h2 class="text-xl font-bold">${pokemon.name}</h2>
            <img src="${pokemon.image}" alt="${pokemon.name}" class="size-12 object-scale-down object-center" />
        `;

        container.appendChild(pokemonCard);
    });
}
