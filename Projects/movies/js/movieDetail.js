const searchForm = document.querySelector('#searchForm');
const searchInput = document.querySelector('#searchInput');
const movieContainer = document.querySelector('#movieContainer');
const searchResults = document.querySelector('#searchResults');


// Get movie from OMDb
const getMovieData = async (imdbId) => {

    try {
        const data = await fetchMovieData(imdbId);

        if (data.Response === "True") {
            showMovieData(data);
        } else {
            movieContainer.innerHTML = `
                <h2>Movie not found</h2>
                <p>${data.Error}</p>
            `;
        }
    }
    catch {
        movieContainer.innerHTML = `<h2>Something went wrong, please try again.</h2>`;
    }
};


// Display movie
const showMovieData = (data) => {
    movieContainer.innerHTML = "";

    const {
        Poster,
        Title,
        Rated,
        imdbRating,
        Genre,
        Released,
        Actors,
        Director,
        Runtime,
        Plot,
    } = data;

    document.title = `${Title} | ZMDB`;

    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-info');


    movieElement.innerHTML =
    `<h1>${Title}</h1>
    <p>IMDb Rating: &#11088; ${imdbRating}</p>
    <p>Rated: ${Rated}</p>`;


    // Genre Container//
    const movieGenreElement = document.createElement('div');
    movieGenreElement.classList.add('movie-genre');


    //Create a span for every genre
    Genre.split(',').forEach(genre => {

        const genreElement = document.createElement('span');
        genreElement.innerText = genre.trim();
        movieGenreElement.appendChild(genreElement);
});

    movieElement.appendChild(movieGenreElement);

    movieElement.innerHTML += `

    <p> Release Date: ${Released}</p>
    <p> Actors: ${Actors}</p>
    <p> Runtime: ${Runtime}</p>
    <p> Director: ${Director}</p>
    <p> Plot: ${Plot}</p>`;



    const moviePosterElement = document.createElement('div');
    moviePosterElement.classList.add('movie-poster');

    if (Poster !== 'N/A') {
        moviePosterElement.innerHTML = `
        <img src="${Poster}" alt="${Title}">
        `;
        moviePosterElement.querySelector('img').onerror = () => {
            moviePosterElement.innerHTML = `<div class="no-poster">${Title}</div>`;
        };
    } else {
        moviePosterElement.innerHTML = `<div class="no-poster">${Title}</div>`;
    }

    movieContainer.appendChild(moviePosterElement);
    movieContainer.appendChild(movieElement);
};


// Search another movie
searchForm.addEventListener('submit', (e) => {

    e.preventDefault();

    const movieName = searchInput.value.trim();

    if (movieName !== '') {
        history.pushState(null, '', `?search=${encodeURIComponent(movieName)}`);
        loadPage();
    }

});


const loadPage = () => {

    const params = new URLSearchParams(window.location.search);
    const movieId = params.get('id');
    const search = params.get('search');

    searchResults.innerHTML = '';
    movieContainer.innerHTML = '';

    if (search) {
        searchInput.value = search;
        document.title = `${search} | ZMDB`;
        showSearchResults(searchResults, search);
    } else if (movieId) {
        searchInput.value = '';
        getMovieData(movieId);
    } else {
        movieContainer.innerHTML = `<h2>Search for a movie to see its details.</h2>`;
    }
};

window.addEventListener('popstate', loadPage);

loadPage();
