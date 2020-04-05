const searchTemplate = document.createElement('template');

searchTemplate.innerHTML = `

<style>
	.search_text {
		border: 1px solid #ccc;
		padding: 10px 20px;
		font-size: 18px;
		outline: none;
		color: #666;
		width: 300px;
		margin-bottom: 20px;
	}
</style>

<input
	type="text"
	autofocus
	placeholder="Film adini girin ve enter tusuna basin..."
	class="search_text"
/>`


class searchArea extends HTMLElement {

	constructor() {
		super();

		this.attachShadow({ mode: 'open' });
		this.shadowRoot.appendChild(searchTemplate.content.cloneNode(true));


		const search_text = this.shadowRoot.querySelector('.search_text');
		search_text.addEventListener('keydown', (event) => {
			if (event.keyCode == 13) {
				searchMovie();
			}
		});

		async function searchMovie() {
			const request = await fetch(`http://www.omdbapi.com/?apikey=a68d6635&s=${search_text.value}`);
			const data = await request.json();

			if (data.Search) {
				let dataMovies = data.Search.map(movie => {
					return {
						title: movie.Title,
						description: `${movie.Type}-${movie.Year}`,
						imdbLink: `https://www.imdb.com/title/${movie.imdbID}`,
						poster: movie.Poster === 'N/A' ? `/assets/img/default.png` : movie.Poster,
						isFavourite: false
					}
				});
				prepareMovies(dataMovies);
			} else {
				document.querySelector('#movies').innerHTML = 'Aradığınız Kriterlere uygun film Bulunamadı!';
			}
		}
	}
}

window.customElements.define('search-input', searchArea);