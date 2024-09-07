const API_KEY = '';
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
const API_MOVIEURL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en`;

async function fetchGenres() {
    try {
        const response = await fetch(API_MOVIEURL);
        if (!response.status) {
            throw new Error(`HTTP error!, status:${response.status}`)
        }
        const data = await response.json();
        return data.genres;
    }
    catch (error) {
        console.log('Error in fetching movie genre', error);
    }
}

export async function fetchMovies(query) {
    try {
        const url = query 
        ? `${API_URL}&query=${encodeURIComponent(query)}` 
        : API_URL;
        const response = await fetch(url);
        if (!response.status) {
            throw new Error(`HTTP error!, status:${response.status}`)
        }
        const data = await response.json();
        // return data.results;

        const genres = await fetchGenres();
        const genreMap = new Map(genres.map(genre => [genre.id, genre.name]));
        const movieWithGenre = data.results.map(movie => ({
            ...movie,
            genres: movie.genre_ids.map(id => genreMap.get(id))
        }))
        return movieWithGenre;
        // console.log(movieWithGenre);
        // console.log(data.results);
    } catch (error) {
        console.log("Error in fetching movies", error);
        return [];
    }
}








