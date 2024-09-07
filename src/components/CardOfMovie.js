export default function movieCard({ movie }) {
    return `
    <div class="w-52 flex flex-col justify-center space-y-3">
        <img class="w-full h-52 object-fill" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        <div class="flex flex-col px-4 space-y-3">
            <div class="flex flex-col space-y-1">
                <h1 class="text-white text-base font-semibold" >
                    ${movie.title}
                </h1>
                <p class="text-white text-xs opacity-60 tracking-normal">${movie.genres.join(', ')}</p>
            </div>
            <div class="flex w-20 h-10 items-start py-2 space-x-2">
                <img class="w-6 h-full" src="public/images/star.svg" alt="star">
                <p class="text-yell text-xl">${movie.vote_average.toFixed(1)}</p>
            </div>
        </div>
    </div>
    `
}