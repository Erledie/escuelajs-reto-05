const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://us-central1-escuelajs-api.cloudfunctions.net/characters/';

var render = (resultados) => {
  const characters = resultados.results;
  let output = characters.map(character => {
      return `
    <article class="Card">
      <img src="${character.image}" />
    <h2>${character.name}<span>${character.location.name}</span></h2>
    </article>
  `
  }).join('');
  let newItem = document.createElement('section');
  newItem.classList.add('Items');
  newItem.innerHTML = output;
  $app.appendChild(newItem);
  localStorage.page = resultados.info.next;
}

localStorage.page = API;

async function getData(){
  const urlApi = localStorage.page;
  try{
    let response = await fetch(urlApi)    
    response = await response.json()
    render(response)   
  }catch(error){
    intersectionObserver.disconnect()
  }      
}
const loadData = () => {
  getData();
}
const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadData();
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);