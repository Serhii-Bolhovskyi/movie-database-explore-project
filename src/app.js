import { fetchMovies , fetchSearching, fetchGenres} from './api/api.js';
import movieCard from './components/CardOfMovie.js';
import paginationButton from './components/PaginationButton.js';
import { GenreElement, ActiveGenreElement } from "./components/GenreElement.js";

const movieContainer = document.getElementById('movie-container');
const search = document.getElementById('search-btn');
const dropdownButton = document.getElementById('dropdown-button');
const dropdownMenu = document.getElementById('dropdown-menu');
const closeDropdownMenu = document.getElementById('close-dropdown-menu');

dropdownButton.addEventListener('click', () => {
  dropdownMenu.classList.remove("hidden")
  dropdownMenu.classList.add("flex")
})
closeDropdownMenu.addEventListener('click', () => {
  dropdownMenu.classList.remove("flex")
  dropdownMenu.classList.add("hidden")
})


// pagination approach
function renderPagination(totalPages, currentPage = 1) {
  const paginaitonContainer = document.querySelector(".pagination-container");
  paginaitonContainer.innerHTML = '';

  // prev button
  if (currentPage > 1) {
    const prevPage = document.querySelectorAll('.prevPage');
    prevPage.forEach(prev => prev.addEventListener("click", () => {
      loadMovies(currentPage - 1);
    }))
  }

  for(let i = 1; i <= totalPages; i++) {
    paginaitonContainer.innerHTML += paginationButton(i, i === currentPage);
  }

  // next button
  if (currentPage < totalPages) {
    const nextPage = document.querySelectorAll('.nextPage');
    nextPage.forEach(next => next.addEventListener("click", () => {
      loadMovies(currentPage + 1);
    }))
  }

  const buttons = document.querySelectorAll(".pagination-container a");
  buttons.forEach(button => {
    button.addEventListener("click", event => {
      const page = Number(button.dataset.page);  
      loadMovies(page) // виклик ф-ції для завантаження фільмів
    })
  })
}

let activeGenres = [];

async function renderGenres() {
  const genresContainer = document.getElementById('genres-container');
  genresContainer.innerHTML = '';

  const genresList = await fetchGenres();
  const genresHTML =  genresList.map(genre => GenreElement({genre})).join('');
  genresContainer.innerHTML = genresHTML;

  genresContainer.querySelectorAll('button').forEach((button, index) => {
    button.addEventListener('click', () => {
      addGenreToActiveBox(genresList[index])
    })
  })
}

function addGenreToActiveBox(genre) {
  if(!activeGenres.some(activeGenre => activeGenre.id === genre.id)) {
    activeGenres.push(genre);
    updateActiveGenresBox();
  }
}


function removeGenreFromActiveBox(genre) {
  if(activeGenres.some(activeGenre => activeGenre.id === genre.id)) {
    activeGenres.splice(activeGenres.indexOf(genre), 1);
    updateActiveGenresBox();
  }
}

function updateActiveGenresBox() {
  const activeBox = document.getElementById('dynamic-genres');
  activeBox.innerHTML = '';

  const activeGenresHTML = activeGenres.map(genre => ActiveGenreElement({genre})).join('');
  activeBox.innerHTML = activeGenresHTML;

  activeBox.querySelectorAll('div').forEach((button, index) => {
    button.addEventListener('click', () => {
      removeGenreFromActiveBox(activeGenres[index])
    })
  })
}

renderGenres();



async function loadMovies(page = 1) {
  try {
    // Завантажуємо фільми тільки для поточної сторінки
    const { movieWithGenre } = await fetchMovies(page);
    movieContainer.innerHTML = movieWithGenre.map(movie => movieCard({ movie })).join('');

    // Рендеримо кнопки пагінації
    renderPagination(4, page);
  } catch (error) {
    console.error("Error loading movies:", error);
    movieContainer.innerHTML = '<p class="text-white">Error fetching movies. Please try again.</p>';
  }
}

const searchingMovieByQuery = async () => {
  const query = document.getElementById('search-input').value.trim().toLowerCase();
  if(!query) return;
  try {
    const movies = await fetchSearching(query);
    movieContainer.innerHTML = "";
    const movieCards = movies.map(movie => movieCard({movie})).join('');
    movieContainer.innerHTML = movieCards;
  }
  catch (error) {
    movieContainer.innerHTML = '<p class="text-white">Error searching movies. Please try again.</p>';
  }
}
search.addEventListener('click', searchingMovieByQuery);

document.addEventListener('DOMContentLoaded', () => loadMovies(1));
