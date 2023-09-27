const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const resultsDiv = document.getElementById('results');

searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value;
    if (searchTerm) {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                displayResults(data.items);
            })
            .catch(error => console.error(error));
    }
});

function displayResults(books) {
    resultsDiv.innerHTML = '';
    if (books.length === 0) {
        resultsDiv.innerHTML = '<p>No se encontraron resultados.</p>';
        return;
    }
    books.forEach(book => {
        const title = book.volumeInfo.title;
        const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Desconocido';
        const description = book.volumeInfo.description ? book.volumeInfo.description : 'Sin descripción disponible';
        const thumbnail = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/128x192.png?text=No+imagen';

        resultsDiv.innerHTML += `
            <div class="book">
                <img src="${thumbnail}" alt="${title}">
                <h2>${title}</h2>
                <p>Autor(es): ${authors}</p>
                <p>${description}</p>
            </div>
        `;
    });
}
