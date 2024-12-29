export default function paginationButton(pageNumber, isActive = false) {
    return `
        <a href="#" 
           class="relative inline-flex items-center px-4 py-2 text-sm font-semibold 
           ${isActive 
               ? 'z-10 bg-indigo-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' 
               : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'}"
           data-page="${pageNumber}">
           ${pageNumber}
        </a>
    `
};