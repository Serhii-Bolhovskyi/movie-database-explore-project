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

let sortContainer = document.getElementById('sort-by-selector');

let allMovies = [];
let activeGenres = [];
let filteredMovies = [];

async function initializeMovieLoading() {
  try{
    await loadAllMovies();
    await renderGenres();
    filteredMovies = [...allMovies];

    // applySortingAndUpdateUI(sortContainer.value)
    renderMoviesPaginated(1);
  } catch (error) {
    console.error("Error initializing the app:", error);
    movieContainer.innerHTML = '<p class="text-white">Error loading movies. Please try again later.</p>';
  }
}

async function loadAllMovies() {
  try{
    allMovies = [];
    let page = 1;
    let totalPages = 4;

    do{
      const { movieWithGenre } = await fetchMovies(page);
      allMovies.push(...movieWithGenre);
      page++;
    } while (page <= totalPages)

  } catch (error) {
    console.error("Error fetching all movies:", error);
    movieContainer.innerHTML = '<p class="text-white">Error fetching movies. Please try again later.</p>';
  }
}

async function loadMoviesByActiveGenres(page) {
  try{
    if(activeGenres.length === 0) {
      //await loadAllMovies(); // fetch and store all movies in 'allMovies[]'
      filteredMovies = [...allMovies];
      renderMoviesPaginated(1);
      return;
    }

    const activeGenreNames = new Set(activeGenres.map(genre => genre.name));
    filteredMovies = allMovies.filter(movie =>
        Array.from(activeGenreNames).every(genre => movie.genres.includes(genre))
    );

    if(filteredMovies.length === 0) {
      movieContainer.innerHTML = '<p class="text-white text-center text-4xl items-center">No movies match the selected genres</p>';
      return;
    }

    renderMoviesPaginated(page);
  } catch (error) {
    console.error("Error loading movies:", error);
    movieContainer.innerHTML = '<p class="text-white h-screen">Error fetching movies. Please try again later.</p>';
  }
}

function renderMoviesPaginated(page = 1) {
  const itemsPerPage = 20;
  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = page * itemsPerPage;

  const moviesToRender = filteredMovies.slice(startIndex, endIndex);

  if(moviesToRender.length === 0) {
    movieContainer.innerHTML = '<p class="text-white">No movies to display</p>';
    return;
  }

  movieContainer.innerHTML = moviesToRender.map(movie => movieCard({ movie })).join('');
  renderPagination(totalPages, page);
}

function renderPagination(totalPages, currentPage = 1) {
  const paginationContainer = document.querySelector(".pagination-container");
  paginationContainer.innerHTML = "";

  if(currentPage > 1) {
    const prevPage= document.querySelectorAll('.prevPage');
    prevPage.forEach(prev => prev.addEventListener("click", () => {
      renderMoviesPaginated(currentPage - 1);
    }))
  }

  if(currentPage < totalPages) {
    const nextPage = document.querySelectorAll('.nextPage');
    nextPage.forEach(next => next.addEventListener("click", () => {
      renderMoviesPaginated(currentPage + 1);
    }))
  }

  for (let i = 1; i <= totalPages; i++) {
    paginationContainer.innerHTML += paginationButton(i, i === currentPage);
  }

  paginationContainer.querySelectorAll('a').forEach(button => {
    const page = Number(button.dataset.page);
    button.addEventListener('click', () =>{
      renderMoviesPaginated(page);
    })
  })
}

async function renderGenres() {
  const genresContainer = document.getElementById('genres-container');
  genresContainer.innerHTML = '';

  const genresList = await fetchGenres();
  genresContainer.innerHTML = genresList.map(genre => GenreElement({genre})).join('');

  genresContainer.querySelectorAll('button').forEach((button, index) => {
    button.addEventListener('click', () => {
      addGenreToActiveBox(genresList[index])
    })
  })
}

async function addGenreToActiveBox(genre) {
  if(!activeGenres.some(activeGenre => activeGenre.id === genre.id)) {
    activeGenres.push(genre);
    await updateActiveGenresBox();
  }
  try{
    await loadMoviesByActiveGenres();
    applySortingAndUpdateUI(sortContainer.value)
  }
  catch (error) {
    throw new Error(`Error in addGenreToActiveBox: ${error.message}`);
  }
}

async function removeGenreFromActiveBox(genre) {
  if(activeGenres.some(activeGenre => activeGenre.id === genre.id)) {
    activeGenres.splice(activeGenres.indexOf(genre), 1);
    await updateActiveGenresBox();
  }
  try{
    await loadMoviesByActiveGenres();
  }
  catch (error) {
    throw new Error(`Error in addGenreToActiveBox: ${error.message}`);
  }
}

async function updateActiveGenresBox() {
  const activeBox = document.getElementById('dynamic-genres');
  activeBox.innerHTML = '';

  activeBox.innerHTML = activeGenres.map(genre => ActiveGenreElement({genre})).join('');

  activeBox.querySelectorAll('div').forEach((button, index) => {
    button.addEventListener('click', async () => {
      try{
        await removeGenreFromActiveBox(activeGenres[index]);
        applySortingAndUpdateUI(sortContainer.value)
      } catch(error){
        console.error(`Error in removeGenreFromActiveBox: ${error.message}`);
      }
    })
  })
}

const searchingMovieByQuery = async () => {
  const query = document.getElementById('search-input').value.trim().toLowerCase();
  if(!query) return;
  try {
    const movies = await fetchSearching(query);
    movieContainer.innerHTML = "";

    movieContainer.innerHTML =  movies.map(movie => movieCard({movie})).join('');
  }
  catch (error) {
    movieContainer.innerHTML = '<p class="text-white">Error searching movies. Please try again.</p>';
  }
}
search.addEventListener('click', searchingMovieByQuery);

function applySortingAndUpdateUI(sortBy, page = 1) {

  switch (sortBy) {
    case 'ranking':
      sortByRanking(page)
      break;
    case 'none':
      loadMoviesByActiveGenres(page)
      console.log('none')
      break;
      case 'releaseDate':
        sortByReleaseDate(page)
        console.log('date')
        break;
    default:
      console.log("default")
      break;
  }
}

function sortByRanking(page = 1) {
  movieContainer.innerHTML = '';
  let sortedMovies;

  sortedMovies = filteredMovies.sort((a, b) => b.vote_average - a.vote_average )

  movieContainer.innerHTML = sortedMovies.map(movie => movieCard({ movie })).join('')
  renderMoviesPaginated(page )
}

function sortByReleaseDate(page = 1) {
  movieContainer.innerHTML = '';
  let sortedMovies;

  sortedMovies = filteredMovies.sort((a, b) => {
    return new Date(b.release_date) - new Date(a.release_date)
  })

  movieContainer.innerHTML = sortedMovies.map(movie => movieCard({ movie })).join('')
  renderMoviesPaginated(page )
}

sortContainer.onchange = function () {
  applySortingAndUpdateUI(sortContainer.value, 1);
};

await initializeMovieLoading();







