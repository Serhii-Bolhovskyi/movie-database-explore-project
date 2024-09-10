import {fetchMovies} from './api/api.js';
import { fetchSearching } from './api/api.js';
import movieCard from './components/CardOfMovie.js';

const movieContainer = document.getElementById('movie-container');
const search = document.getElementById('search-btn');

const searchingMovieByQuery = async () => {
  const query = document.getElementById('search-input').value;
  try {
    const movies = await fetchSearching(query);
    movieContainer.innerHTML = "";
    const movieCard = movies.map(movie => { movie == movieCard({movie}).join('')
    })
    movieContainer.innerHTML = movieCard;
    // console.log(movieCards);
  } catch (error) {
    movieContainer.innerHTML = '<p class="text-white">Error searching movies. Please try again.</p>';
  }
}
search.addEventListener('click', searchingMovieByQuery)

const renderMovieCard = async () => {
    // const query = document.getElementById('search-input').value;
    // const movieContainer = document.getElementById('movie-container');
  
    try {
      const movies = await fetchMovies();
      movieContainer.innerHTML = "";
      const movieCards = movies.map(movie => movieCard({ movie })).join('');
      movieContainer.innerHTML = movieCards;
    } catch (error) {
      movieContainer.innerHTML = '<p class="text-white">Error fetching movies. Please try again.</p>';
    }
}

renderMovieCard()



