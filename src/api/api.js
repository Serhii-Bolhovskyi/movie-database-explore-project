const API_KEY = '';
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

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
        return data.results;
        // console.log(data.results);
    } catch (error) {
        console.log("Error in fetching movies", error);
        return [];
    }
}





