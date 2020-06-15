import { html, PolymerElement } from '@polymer/polymer';
import './components/polymer/add-form-popup.js';
import './components/polymer/side-menu.js';
import './components/polymer/content-area.js';

export class MyElement extends PolymerElement {
	ready() {
		super.ready();
		this.allContacts = [];
		this.addEventListener(
			'on-add-contact-menu-click',
			this.onAddContactMenuClick
		);
		this.addEventListener('on-save-contact', this.onSaveContact);
		this.addEventListener('on-delete-contact', this.onDeleteContact);
		this.addEventListener('on-close-popup', this.onClosePopup);
	}

	static get properties() {
		return {
			__popupOpen: {
				type: Boolean,
				value: false
			},
			allContacts: { type: Array }
		};
	}

	onDeleteContact(contact) {
		console.debug('app polymer handling on-delete-contact');
		console.debug(contact);

		function immutableDelete(arr, index) {
			return arr.slice(0, index).concat(arr.slice(index + 1));
		}

		this.allContacts = immutableDelete(
			this.allContacts,
			contact.detail.contactId
		);
		console.debug(this.allContacts);
	}

	onAddContactMenuClick(event) {
		console.debug('app polymer handling on-add-contact-menu-click');
		this.changePopupVisibility();
	}

	onClosePopup(event) {
		console.debug('app polymer handling on-close-popup');
		this.changePopupVisibility();
	}

	changePopupVisibility() {
		console.debug(`status before event ${this.__popupOpen}`);
		this.__popupOpen = !this.__popupOpen;
		console.debug(`status after event ${this.__popupOpen}`);
	}

	onSaveContact(event) {
		console.debug('app polymer handling on-save-contact');
		this.push('allContacts', event.detail.contact);
		console.debug(this.allContacts);
	}

	static get template() {
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
				<content-area all-contacts="[[allContacts]]"></content-area>
				<add-form-popup open="{{__popupOpen}}"></add-form-popup>
			</div>
		`;
	}
}

customElements.define('my-element', MyElement);
