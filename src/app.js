import { fetchMovies , fetchSearching } from './api/api.js';
import movieCard from './components/CardOfMovie.js';
import paginationButton from './components/PaginationButton.js';

const movieContainer = document.getElementById('movie-container');
const search = document.getElementById('search-btn');

// pagination approach

function renderPagination(totalPages, currentPage = 1) {
  const paginaitonContainer = document.querySelector(".pagination-container");
  paginaitonContainer.innerHTML = '';

  for(let i = 1; i <= totalPages; i++) {
    paginaitonContainer.innerHTML += paginationButton(i, i === currentPage);
  }

  const buttons = document.querySelectorAll(".pagination-container a");
  buttons.forEach(button => {
    button.addEventListener("click", event => {
      // event.preventDefault();
      const page = Number(button.dataset.page);  
      loadMovies(page) // виклик ф-ції для завантаження фільмів
    })
  })
}

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

search.addEventListener('click', searchingMovieByQuery)

document.addEventListener('DOMContentLoaded', () => loadMovies(1));
