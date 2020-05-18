import { LitElement } from 'lit-element';
import { html } from 'lit-html';
import ContactsList from './contacts-list.js';
import FavoritesList from './favorits-list.js';

export default class ContentArea extends LitElement {
	constructor() {
		super();
	}

	static get properties() {
		return {
			deleteContact: { type: Function },
			allContacts: { type: Array }
		};
	}

	render() {
		return html`
			<style>
				@import '/css/global.css';
				#content-area {
					background: #fcfdff;
					padding: 50px 80px;
				}
			</style>
			<section id="content-area">
				<favorites-list .allContacts="${this.allContacts}"></favorites-list>
				<contacts-list
					.deleteContact="${this.deleteContact}"
					.allContacts="${this.allContacts}"
				></contacts-list>
			</section>
		`;
	}
}

customElements.define('content-area', ContentArea);
