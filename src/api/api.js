const API_KEY = '';
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
const API_GENRESURL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en`;
const API_SEARCHURL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&include_adult=false&language=en-US&page=1`

export async function fetchSearching(query) {
    try {
        const url = `${API_SEARCHURL}&query=${encodeURIComponent(query)}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error!, status:${response.status}`)
        };
        const data = await response.json();
        // return data.results
        const genres = await fetchGenres();
        const genreMap = new Map(genres.map(genre => [genre.id, genre.name]));
        
        const moviesWithGenres = data.results.map(movie => ({
            ...movie,
            genres: movie.genre_ids.map(id => genreMap.get(id) || 'Unknown Genre')
        }));
        
        return moviesWithGenres;
    }
    catch (error) {
        console.log("Error in searching movie", error);
        return []
    }
}

async function fetchGenres() {
    try {
        const response = await fetch(API_GENRESURL);
        if (!response.ok) {
            throw new Error(`HTTP error!, status:${response.status}`)
        }
        const data = await response.json();
        return data.genres;
    }
    catch (error) {
        console.log('Error in fetching movie genre', error);
    }
}

export async function fetchMovies() {
    try {

        const response = await fetch(API_URL);
        if (!response.ok) {
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








