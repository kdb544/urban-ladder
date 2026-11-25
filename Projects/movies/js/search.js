const createCard = (title, poster, onClick) => {

    const card = document.createElement('div');
    card.classList.add('movie-card');

    const noPoster = document.createElement('div');
    noPoster.classList.add('no-poster');
    noPoster.innerText = title;

    if (poster) {
        const img = document.createElement('img');
        img.src = poster;
        img.alt = title;
        img.loading = 'lazy';
        img.onerror = () => img.replaceWith(noPoster);
        card.appendChild(img);
    }
    else {
        card.appendChild(noPoster);
    }

    const name = document.createElement('p');
    name.innerText = title;
    card.appendChild(name);

    card.addEventListener('click', onClick);

    return card;
};


const showSearchResults = async (container, movie) => {

    container.innerHTML = '';

    const heading = document.createElement('h2');
    container.appendChild(heading);

    try {
        const data = await searchMovies(movie);

        if (data.Response === 'True') {

            heading.innerText = `Results for "${movie}"`;

            const grid = document.createElement('div');
            grid.classList.add('results-grid');

            data.Search.forEach(result => {
                const poster = result.Poster !== 'N/A' ? result.Poster : null;
                const card = createCard(`${result.Title} (${result.Year})`, poster, () => {
                    window.location.href = `./movieDetail.html?id=${result.imdbID}`;
                });
                grid.appendChild(card);
            });

            container.appendChild(grid);
        }

        else {
            heading.innerText = data.Error === 'Movie not found!' ? `No movies found for "${movie}"` : data.Error;
        }
    }
    catch {
        heading.innerText = 'Something went wrong, please try again.';
    }
};
