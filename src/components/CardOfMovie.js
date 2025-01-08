export default function movieCard({ movie }) {
    return `
    <div class="w-52 flex flex-col justify-center space-y-3">
        <img class="aspect-square object-fill" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        <div class="flex flex-col space-y-3">
            <div class="flex flex-col space-y-1">
                <div class="flex items-start space-x-1">
                    <h1 class="text-white text-base font-semibold line-clamp-2 w-36 h-12" >
                    ${movie.title}
                    </h1>
                    <div class="flex space-x-2">
                        <img class="w-6" src="public/images/star.svg" alt="star">
                        <p class="text-yell text-base text-center">${movie.vote_average.toFixed(1)}</p>
                    </div>
                </div>
                <p class="text-white text-xs opacity-60 tracking-normal h-8">${movie.genres.join(', ')}</p>
            </div> 
        </div>
    </div>
    `
}