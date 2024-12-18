if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
   navigator.serviceWorker.register('../sw.js').then( () => {
    console.log('Service Worker Registered')
   })
 })
}


function fetchPokemon(url) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Pokémon not found');
      }
      return response.json();
    })
    .then(data => {
      let pokemonInfo = document.getElementById('pokemonInfo');
      pokemonInfo.innerHTML = ''; // Clear previous content

      // Construct the entire HTML string
      pokemonInfo.innerHTML = `
      <div class="mt-4">
            <img src="${data.sprites.front_default}" alt="${data.name} sprite" class="mx-auto w-32 h-auto">
          </div>
        <div class="text-center">
          <h4 class="text-xl font-bold text-gray-800">${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h4>
          <div class="mt-2">
            <strong class="text-gray-600">Types:</strong> 
            <span class="text-gray-800">${data.types.map(type => type.type.name).join(', ')}</span>
          </div>
          <div class="mt-2">
            <strong class="text-gray-600">Abilities:</strong> 
            <span class="text-gray-800">${data.abilities.map(ability => ability.ability.name).join(', ')}</span>
          </div>
          
        </div>
      `;

    
    })
    .catch(error => {
      alert('Error: ' + error.message);
      console.error('Error fetching the Pokémon:', error);
    });
}

// Generate a random Pokémon
document.getElementById('fetchRandomButton').addEventListener('click', () => {
  const randomId = Math.floor(Math.random() * 1025) + 1;
  fetchPokemon(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
});

document.getElementById('searchButton').addEventListener('click', () => {
  const searchQuery = document.getElementById('pokemonSearch').value.trim().toLowerCase();
  if (searchQuery) {
    fetchPokemon(`https://pokeapi.co/api/v2/pokemon/${searchQuery}`);
  } else {
    alert('Please enter a Pokémon name or ID!');
  }
});