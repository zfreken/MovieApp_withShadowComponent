const movieCardTemplate = document.createElement('template');

movieCardTemplate.innerHTML = `
<style>
 @import url('${location.origin}/assets/css/movieCard.css')
</style>

<div class="movie-container">
    <div class="image-container">
        <img/>
    </div>
		<div class="info">
				<h3 class ='title'></h3>
				<p>
					<slot />
				</p>
        <div class="action_container">
            <i class="isFavourite fa fa-heart"></i>
            <a target="_blank" class="button">IMDB</a>
        </div>
    </div>
</div>
`


class MovieCard extends HTMLElement {

	constructor() {
		super();
		this.isFavourite = false;

		this.attachShadow({ mode: 'open' });
		this.shadowRoot.appendChild(movieCardTemplate.content.cloneNode(true));

		setTimeout(() => {
			this.shadowRoot.querySelector('h3.title').innerHTML = this.getAttribute('title');
			this.shadowRoot.querySelector('img').src = this.getAttribute('poster');
			this.shadowRoot.querySelector('.action_container .button').href = this.getAttribute('imdb');

			if (this.getAttribute('isFavourite') === 'true') {
				this.isFavourite = true;
				this.shadowRoot.querySelector('.isFavourite').classList.add('is_favourite');
			}
		}, 100);
	}

	toogleFav() {
		this.isFavourite = !this.isFavourite;
		this.isFavourite ? this.shadowRoot.querySelector('.isFavourite').classList.add('is_favourite') : this.shadowRoot.querySelector('.isFavourite').classList.remove('is_favourite');
	}


	connectedCallback(){
		this.shadowRoot.querySelector('.isFavourite').addEventListener('click',() => this.toogleFav());
	}

	disconnectedCallback(){
		this.shadowRoot.querySelector('.isFavourite').removeEventListener('click',() => this.toogleFav());
	}
}

window.customElements.define('movie-card', MovieCard);