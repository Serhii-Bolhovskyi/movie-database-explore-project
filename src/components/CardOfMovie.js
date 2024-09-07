export default function movieCard({ movie }) {
    return `
    <div class="w-52 flex flex-col justify-center space-y-3">
        <img class="w-full h-52 object-fill" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        <h1 class="text-yell text-xl font-medium" >
            ${movie.title}
        </h1>
    </div>
    `
}