export default function movieDetails({ movie }) {
  return `
        <div class="container mx-auto flex items-center flex-col w-full h-full relative">
            <div class="w-full relative">
                <img id="closeFull" class="absolute z-10 top-10 left-10" src="public/images/closeBtn.svg" alt="">
                <img class="w-full h-[420px] blur-sm" src="https://image.tmdb.org/t/p/w500${movie.backdrop_path}" alt="">
            </div>
            <div class="absolute flex flex-col space-y-4 items-start w-[850px] top-80 left-1/2 transform -translate-x-1/2">
                <div class="flex space-x-4 w-full">
                     <img class="w-[300px] h-[350px]  object-fill" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="">
                    <div class="flex flex-col text-white space-y-4">
                        <h1 class="text-white text-5xl">${movie.title}</h1>
                        <div class="flex justify-between space-x-4">
                                <div class="flex space-x-2">
                                    <span>${movie.release_date}</span>
                                    <span>|</span>
                                    <span>${movie.runtime}m</span> 
                                </div>
                                
                                <div class="flex space-x-2">
                                  <img class="w-6" src="public/images/star.svg" alt="star">
                                    <p class="text-yell text-lg text-center">${movie.vote_average.toFixed(1)}</p>
                                </div>      
                        </div>
                        <div class="flex flex-col space-y-3">
                            <div class="flex items-center  space-x-4 ">
                                <p class="text-lg">Tagline: </p>
                                <span class="text-base">${movie.tagline}</span>
                             </div> 
                             <div class="flex items-center space-x-4">
                                <p class="text-lg">Genre: </p>
                                <span class="text-base">${movie.genres.map((genre) => genre.name).join(", ")}</span>
                             </div>
                             <div class="flex items-center space-x-4">
                                <p class="text-lg">Country: </p>
                                <span class="text-base">${movie.production_countries.map((country) => country.name).join(", ")}</span>
                             </div>
                             <div class="flex items-start space-x-4">
                                <p class="text-lg">Production:</p>
                                <span class="text-base w-80">${movie.production_companies.map((country) => country.name).join(", ")}</span>
                             </div>
                             <div class="flex items-center space-x-4">
                                <p class="text-lg">Budget:</p>
                                <span class="text-base">${movie.budget}$</span>
                             </div>
                        </div>
                    </div>
                </div>
                <div class="w-[700px] text-white">
                    <div class="flex flex-col space-y-4">
                        <div class="flex space-x-4">
                            <div class="w-[4px] bg-yell "></div>
                            <h2 class="text-3xl" >Overview</h2>
                         </div>
                        
                         <p class="text-base">${movie.overview}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}
