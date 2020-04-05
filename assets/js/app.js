

// const search_text = document.querySelector('.search_text');

// search_text.addEventListener('keydown',(event) => {
// 	if (event.keyCode == 13) {
// 		searchMovie();
// 	}
// });


const prepareMovies = (movies) => {

	document.querySelector('#movies').innerHTML = '';

	movies.forEach(movie => {
		let movie_card = document.createElement('movie-card');

		movie_card.setAttribute('title', movie.title);
		movie_card.setAttribute('poster', movie.poster);
		movie_card.setAttribute('isFavourite', movie.isFavourite);
		movie_card.setAttribute('imdb', movie.imdbLink);
		movie_card.innerHTML = movie.description;

		document.querySelector('#movies').append(movie_card);
	});

}