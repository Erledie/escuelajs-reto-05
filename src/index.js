const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
//const API = 'https://rickandmortyapi.com/api/character/';
const API = 'https://randomuser.me/api/?results=20&seed=abc&page=';

if(!localStorage.page){
  localStorage.page = parseInt(1);
}else{
  localStorage.page = parseInt(1);
}

const getData = api => {
  //console.log(localStorage.page)
  const urlApi = `${api}${localStorage.page}`
  //console.log(urlApi)
  fetch(urlApi)
    .then(response => response.json())
    .then(response => {
      //console.log(response.results)
      //console.log(response.info.next_fetch)
      const characters = response.results;
      //console.log(characters)
      let output = characters.map(character => {
        return `
      <article class="Card">
        <img src="${character.picture.large}" />
      <h2>${character.name.first} ${character.name.last}<span>${character.location.city}</span></h2>
      </article>
    `
      }).join('');
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
      localStorage.page = parseInt(localStorage.page) + 1;
    })
    .catch(error => console.log(error));
}

const loadData = () => {
  getData(API);
}

const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadData();
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});


intersectionObserver.observe($observe);