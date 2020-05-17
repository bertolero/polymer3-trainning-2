import { LitElement } from 'lit-element';
import { html } from 'lit-html';

export default class SideMenu extends LitElement {
	constructor() {
		super();
	}

	static get properties() {
		return {
			togglePopup: { type: Function }
		};
	}

	render() {
		return html`
			<style>
				@import '/css/global.css';
				.logo {
					text-align: center;
				}
				.logo img {
					width: 100px;
				}
				.title {
					font-weight: 700;
					color: #ccced7;
					margin: 1rem 0;
				}
				#side-menu {
					background: #323759;
					height: 100vh;
					padding: 50px 25px;
				}
				#side-menu nav a {
					color: #ccced7;
					text-decoration: none;
					text-transform: capitalize;
					display: block;
					padding: 10px 10px 10px 0;
				}
				#side-menu nav a span.icon {
					padding: 10px 10px 0 0;
				}
			</style>
			<section id="side-menu">
				<div class="logo">
					<img src="http://pngimg.com/uploads/volvo/volvo_PNG64.png" />
				</div>
				<div class="menu">
					<div class="title">Contacts</div>
					<nav>
						<a href="#" @click="${this.togglePopup}"
							><span class="icon"> + </span> Add Contact</a
						>
						<a href="#"><span class="icon"> + </span> Add Contact</a>
						<a href="#"><span class="icon"> + </span> Add Contact</a>
						<a href="#"><span class="icon"> + </span> Add Contact</a>
					</nav>
				</div>
			</section>
		`;
	}
}

customElements.define('side-menu', SideMenu);
