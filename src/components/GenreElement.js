export default function GenreElement({ genre }) {
    return `
        <div class="border px-4 py-1 rounded-3xl hover:scale-105">
            <p class="text-white text-sm">${genre.name}</p>
        </div>
    `
}