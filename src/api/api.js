
const API_GENRESURL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en`;
const API_SEARCHURL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&include_adult=false&language=en-US&page=1`

// fetch popular movies with specific page
export async function fetchMovies(page = 1) {
    const API_POPULAR_MOVIE = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`;
    try {
        const response = await fetch(API_POPULAR_MOVIE);

        if (!response.ok) {
            throw new Error(`HTTP error!, status:${response.status}`)
        }

        const data = await response.json();
        const genres = await fetchGenres();
       
        const genreMap = new Map(genres.map(genre => [genre.id, genre.name]));
        const movieWithGenre = data.results.map(movie => ({
            ...movie,
            genres: movie.genre_ids.map(id => genreMap.get(id))
        }))
             
        return {
            movieWithGenre
        }
    } catch (error) {
        console.log("Error in fetching movies", error);
        return [];
    }
}

// fetch multiple pages of movies
// export async function fetchMultipleMovies(totalPages) {
//     // store movie in array
//     let allMovies = [];

//     for(let page = 1; page <= totalPages; page++) {
//         const movies = await fetchMovies(page);
//         allMovies = allMovies.concat(movies);
//     }
//     return allMovies;
// }
// fetchMultipleMovies(4)


export async function fetchSearching(query) {
    try {
        const url = `${API_SEARCHURL}&query=${encodeURIComponent(query)}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error!, status:${response.status}`)
        };
        const data = await response.json();

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









