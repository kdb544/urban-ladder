const searchForm = document.querySelector('#searchForm');
const searchInput = document.querySelector('#searchInput');
const searchResults = document.querySelector('#searchResults');
const rowsContainer = document.querySelector('#rows');

const rows = [
    { title: 'Trending This Week', path: '/trending/movie/week' },
    { title: 'Now Playing', path: '/movie/now_playing', params: '&region=IN' },
    { title: 'Popular', path: '/movie/popular' },
    { title: 'Top Rated', path: '/movie/top_rated' },
    { title: 'Upcoming', path: '/movie/upcoming', params: '&region=IN' },
    { title: 'Action', path: '/discover/movie', params: '&with_genres=28' },
    { title: 'Comedy', path: '/discover/movie', params: '&with_genres=35' },
    { title: 'Horror', path: '/discover/movie', params: '&with_genres=27' },
];


const openTmdbMovie = async (tmdbId) => {

    try {
        const imdbId = await getImdbId(tmdbId);

        if (imdbId) {
            window.location.href = `./movieDetail.html?id=${imdbId}`;
        }
        else {
            alert('Details for this movie are not available yet!');
        }
    }
    catch {
        alert('Something went wrong, please try again.');
    }
};


const createRow = async ({ title, path, params }) => {

    const row = document.createElement('div');
    row.classList.add('movie-row');

    row.innerHTML = `
        <h2>${title}</h2>
        <div class="row-wrapper">
            <button class="row-btn left">&#8249;</button>
            <div class="row-track"></div>
            <button class="row-btn right">&#8250;</button>
        </div>`;

    rowsContainer.appendChild(row);

    const track = row.querySelector('.row-track');

    row.querySelector('.left').addEventListener('click', () => {
        track.scrollBy({ left: -track.clientWidth, behavior: 'smooth' });
    });

    row.querySelector('.right').addEventListener('click', () => {
        track.scrollBy({ left: track.clientWidth, behavior: 'smooth' });
    });

    try {
        const data = await fetchTmdb(path, params);

        data.results.forEach(movie => {
            if (!movie.poster_path) {
                return;
            }
            const card = createCard(movie.title, TMDB_IMG + movie.poster_path, () => openTmdbMovie(movie.id));
            track.appendChild(card);
        });

        if (track.children.length === 0) {
            row.remove();
        }
    }
    catch {
        row.remove();
    }
};


const getMovieData = async (movie) => {
    await showSearchResults(searchResults, movie);
    searchResults.scrollIntoView({ behavior: 'smooth' });
};


searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const movieName = searchInput.value.trim();

    if (movieName !== '') {
        getMovieData(movieName);
    }

});


rows.forEach(createRow);

const searchParam = new URLSearchParams(window.location.search).get('search');

if (searchParam) {
    searchInput.value = searchParam;
    getMovieData(searchParam);
}
