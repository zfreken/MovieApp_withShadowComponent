const headerTemplate = document.createElement('template');

headerTemplate.innerHTML = `
<style>
 @import url('${location.origin}/assets/css/appHeader.css')
</style>

<header>
	Movie App Header
</header>

`

class ApppHeader extends HTMLElement {

	constructor() {
		super();

		this.attachShadow({ mode: 'open' });
		this.shadowRoot.appendChild(headerTemplate.content.cloneNode(true));

	}

}

window.customElements.define('app-header', ApppHeader);