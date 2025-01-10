const API_KEY = "48e4edaf47d396956cdeaeb65becb7f0";
const API_GENRES_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en`;
const API_SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&include_adult=false&language=en-US&page=1`

// fetch popular movies with specific page
export async function fetchMovies(page = 1) {
    const API_POPULAR_MOVIE = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`;
    try {
        const response = await fetch(API_POPULAR_MOVIE);

        if (!response.ok) {
            new Error(`HTTP error!, status:${response.status}`)
        }

        const data = await response.json();
        const genres = await fetchGenres();

        if (!genres || genres.length === 0) {
            throw new Error("Failed to fetch genres or genres list is empty.");
        }
       
        const genreMap = new Map(genres.map(genre => [genre.id, genre.name]));
        const movieWithGenre = data.results.map(movie => ({
            ...movie,
            genres: movie.genre_ids.map(id => genreMap.get(id))
        }))

        return { movieWithGenre }
    } catch (error) {
        console.log("Error in fetching movies", error.message);

        return [];
    }
}


export async function fetchSearching(query) {
    try {
        const url = `${API_SEARCH_URL}&query=${encodeURIComponent(query)}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error!, status:${response.status}`)
        }
        const data = await response.json();

        const genres = await fetchGenres();
        const genreMap = new Map(genres.map(genre => [genre.id, genre.name]));
        
        return data.results.map(movie => ({
            ...movie,
            genres: movie.genre_ids.map(id => genreMap.get(id) || 'Unknown Genre')
        }));
        // return moviesWithGenres;
    }
    catch (error) {
        console.log("Error in searching movie", error);
        return []
    }
}

export async function fetchGenres() {
    try {
        const response = await fetch(API_GENRES_URL);
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


