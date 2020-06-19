import { html, PolymerElement } from '@polymer/polymer';
import { Contact } from './components/polymer/model/contact';
import './components/polymer/add-form-popup';
import './components/polymer/side-menu';
import './components/polymer/content-area';
import { plainToClass } from 'class-transformer';

export class MyElement extends PolymerElement {
	private allContacts: Array<Contact>;
	private __popupOpen: boolean;

	constructor() {
		super();
		this.allContacts = [];
		this.__popupOpen = false;
	}

	ready() {
		super.ready();
		let storedTodoList = JSON.parse(localStorage.getItem('contact-list')!);
		this.allContacts =
			storedTodoList === null ? [] : plainToClass(Contact, storedTodoList);
		this.addEventListener(
			'on-add-contact-menu-click',
			this.onAddContactMenuClick as EventListener
		);
		this.addEventListener(
			'on-save-contact',
			this.onSaveContact as EventListener
		);
		this.addEventListener(
			'on-delete-contact',
			this.onDeleteContact as EventListener
		);
		this.addEventListener('on-close-popup', this.onClosePopup as EventListener);
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

	onDeleteContact(contact: CustomEvent<number>) {
		console.debug('app polymer handling on-delete-contact');
		console.debug(contact);

		this.splice('allContacts', contact.detail, 1);
		console.debug(this.allContacts);
	}

	onAddContactMenuClick(event: Event) {
		console.debug('app polymer handling on-add-contact-menu-click');
		this.changePopupVisibility();
	}

	onClosePopup(event: CustomEvent<boolean>) {
		console.debug('app polymer handling on-close-popup');
		this.changePopupVisibility();
	}

	changePopupVisibility() {
		console.debug(`status before event ${this.__popupOpen}`);
		this.__popupOpen = !this.__popupOpen;
		console.debug(`status after event ${this.__popupOpen}`);
	}

	onSaveContact(event: CustomEvent<Contact>) {
		console.debug('app polymer handling on-save-contact');
		this.push('allContacts', event.detail);
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
