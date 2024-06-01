document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const movieDetails = document.getElementById('movie-details');
    const favouriteMoviesContainer = document.getElementById('favourite-movies');

    let favourites = JSON.parse(localStorage.getItem('favourites')) || [];

    if (favouriteMoviesContainer) {
        displayFavourites();
    }

    searchInput?.addEventListener('input', () => {
        searchMovies(searchInput.value);
    });

    async function searchMovies(query) {
        if (query.length < 3) {
            searchResults.innerHTML = '';
            return;
        }

        const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=2d26c2d`);
        const data = await response.json();

        if (data.Search) {
            displaySearchResults(data.Search);
        } else {
            searchResults.innerHTML = '<p>No results found.</p>';
        }
    }

    function displaySearchResults(movies) {
        searchResults.innerHTML = '';
        movies.forEach(movie => {
            const movieItem = document.createElement('div');
            movieItem.classList.add('movie-item');
            movieItem.innerHTML = `
                <img src="${movie.Poster}" alt="${movie.Title}">
                <div>
                    <h3>${movie.Title}</h3>
                    <p>${movie.Year}</p>
                    <button onclick="addToFavourites('${movie.imdbID}', '${movie.Title}', '${movie.Poster}')" class="btn btn-outline-primary">Add to Favourites</button>
                    <button onclick="viewMovieDetails('${movie.imdbID}')" class="btn btn-outline-primary">View Details</button>
                </div>
            `;
            searchResults.appendChild(movieItem);
        });
    }

    function addToFavourites(id, title, poster) {
        if (!favourites.some(movie => movie.id === id)) {
            favourites.push({ id, title, poster });
            localStorage.setItem('favourites', JSON.stringify(favourites));
            alert('Movie added to favourites!');
        }
    }

    function removeFromFavourites(id) {
        favourites = favourites.filter(movie => movie.id !== id);
        localStorage.setItem('favourites', JSON.stringify(favourites));
        displayFavourites();
    }

    function displayFavourites() {
        favouriteMoviesContainer.innerHTML = '';
        favourites.forEach(movie => {
            const movieItem = document.createElement('div');
            movieItem.classList.add('movie-item');
            movieItem.innerHTML = `
                <img src="${movie.poster}" alt="${movie.title}">
                <div>
                    <h3>${movie.title}</h3>
                    <button onclick="removeFromFavourites('${movie.id}')" class="btn btn-outline-primary">Remove from Favourites</button>
                    <button onclick="viewMovieDetails('${movie.id}')" class = "btn btn-outline-primary">View Details</button>
                </div>
            `;
            favouriteMoviesContainer.appendChild(movieItem);
        });
    }

    async function viewMovieDetails(id) {
        const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=2d26c2d`);
        const data = await response.json();

        if (movieDetails) {
            movieDetails.innerHTML = `
                <h2>${data.Title}</h2>
                <img src="${data.Poster}" alt="${data.Title}">
                <p>${data.Plot}</p>
                <p><strong>Director:</strong> ${data.Director}</p>
                <p><strong>Actors:</strong> ${data.Actors}</p>
                <p><strong>Released:</strong> ${data.Released}</p>
                <p><strong>Genre:</strong> ${data.Genre}</p>
                <p><strong>IMDB Rating:</strong> ${data.imdbRating}</p>
            `;
        } else {
            localStorage.setItem('movieDetails', JSON.stringify(data));
            window.location.href = 'movie.html';
        }
    }

    if (movieDetails) {
        const movieData = JSON.parse(localStorage.getItem('movieDetails'));
        if (movieData) {
            movieDetails.innerHTML = `
                <h2>${movieData.Title}</h2>
                <img src="${movieData.Poster}" alt="${movieData.Title}">
                <p>${movieData.Plot}</p>
                <p><strong>Director:</strong> ${movieData.Director}</p>
                <p><strong>Actors:</strong> ${movieData.Actors}</p>
                <p><strong>Released:</strong> ${movieData.Released}</p>
                <p><strong>Genre:</strong> ${movieData.Genre}</p>
                <p><strong>IMDB Rating:</strong> ${movieData.imdbRating}</p>
            `;
        }
    }
});

window.addToFavourites = function(id, title, poster) {
    const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    if (!favourites.some(movie => movie.id === id)) {
        favourites.push({ id, title, poster });
        localStorage.setItem('favourites', JSON.stringify(favourites));
        alert('Movie added to favourites!');
    }
};

window.viewMovieDetails = function(id) {
    fetch(`https://www.omdbapi.com/?i=${id}&apikey=2d26c2d`)
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('movieDetails', JSON.stringify(data));
            window.location.href = 'movie.html';
        });
};

window.removeFromFavourites = function(id) {
    let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    favourites = favourites.filter(movie => movie.id !== id);
    localStorage.setItem('favourites', JSON.stringify(favourites));
    window.location.reload();
};
