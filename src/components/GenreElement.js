function GenreElement({ genre }) {
    return `
        <div class="border px-4 py-1 rounded-3xl hover:scale-105">
            <button class="text-white text-sm">${genre.name}</button>
        </div>
    `
}

function ActiveGenreElement({ genre }) {
    return `
        <div class="flex items-center space-x-1 justify-center bg-white px-2 py-1 rounded-3xl hover:bg-opacity-60">
            <button class="text-darkPurple text-sm">${genre.name}</button>
            <img class="w-6 h-6 stroke-[#00072d]" src="public/images/closeBtnDark.svg" alt="">
        </div>
    `
}

export { ActiveGenreElement, GenreElement }