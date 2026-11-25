// js/api.js
const OMDB_API_KEY = 'a5e1a33d';
const TMDB_API_KEY = '0a9038585cafffe1150041809538224c';
const TMDB_IMG = 'https://image.tmdb.org/t/p/w342';

async function fetchMovieData(imdbId) {
    const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${encodeURIComponent(imdbId)}`;
    const response = await fetch(url);
    return response.json();
}

async function searchMovies(movie) {
    const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(movie)}&type=movie`;
    const response = await fetch(url);
    return response.json();
}

async function fetchTmdb(path, params = '') {
    const url = `https://api.tmdb.org/3${path}?api_key=${TMDB_API_KEY}${params}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('TMDB request failed');
    }
    return response.json();
}

async function getImdbId(tmdbId) {
    const data = await fetchTmdb(`/movie/${tmdbId}/external_ids`);
    return data.imdb_id;
}
