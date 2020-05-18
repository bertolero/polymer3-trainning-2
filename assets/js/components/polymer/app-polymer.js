import { LitElement } from 'lit-element';
import { html } from 'lit-html';
import SideMenu from './side-menu.js';
import ContentArea from './content-area.js';
import AddFormPopup from './add-form-popup.js';

export class MyElement extends LitElement {
	constructor() {
		super();
		this.popupOpen = false;
		this.allContacts = [];
		this.deleteContact = this.deleteContact.bind(this);
		this.addEventListener('enable-add-contact', this.enableAddContactOperation);
		this.addEventListener('send-saved-contact', this.sendSavedContactOperation);
	}

	static get properties() {
		return {
			popupOpen: { type: Boolean },
			allContacts: { type: Array }
		};
	}

	deleteContact(contact) {
		console.debug('Deleted contact');
		console.debug(contact);

		function immutableDelete(arr, index) {
			return arr.slice(0, index).concat(arr.slice(index + 1));
		}

		this.allContacts = immutableDelete(this.allContacts, contact);
		console.debug(this.allContacts);
	}

	enableAddContactOperation(event) {
		console.debug('app polymer handling enable-add-contact');
		console.debug('status before event ');
		console.debug(this.popupOpen);
		this.popupOpen = !this.popupOpen;
		console.debug('status after event ');
		console.debug(this.popupOpen);
	}

	sendSavedContactOperation(event) {
		console.debug('app polymer handling send-saved-contact');

		function immutablePush(arr, newEntry) {
			return [...arr, newEntry];
		}

		this.allContacts = immutablePush(this.allContacts, event.detail.contact);
		console.debug(this.allContacts);
	}

	render() {
		return html`
			<style>
				@import '/css/global.css';
				.main-page {
					display: grid;
					grid-template-columns: 250px 1fr;
				}
			</style>
			<div class="main-page">
				<side-menu></side-menu>
				<content-area
					.deleteContact="${this.deleteContact}"
					.allContacts="${this.allContacts}"
				></content-area>
				<add-form-popup .popupOpen="${this.popupOpen}"></add-form-popup>
			</div>
		`;
	}
}

customElements.define('my-element', MyElement);
