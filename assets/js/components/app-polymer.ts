import { html, PolymerElement } from '@polymer/polymer';
import { Contact } from './polymer/model/contact';
import './polymer/add-form-popup';
import './polymer/side-menu';
import './polymer/content-area';
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
		this.allContacts = this.loadStorage();
		this.addEventListener('on-add-contact-menu-click', this.onAddContactMenuClick as EventListener);
		this.addEventListener('on-save-contact', this.onSaveContact as EventListener);
		this.addEventListener('on-delete-contact', this.onDeleteContact as EventListener);
		this.addEventListener('on-close-popup', this.onClosePopup as EventListener);
		// custom bindings
		this.onElectronOpenAddContactMenuClick = this.onElectronOpenAddContactMenuClick.bind(this);
		this.onElectronCloseAddContactMenuClick = this.onElectronCloseAddContactMenuClick.bind(this);
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

	// handle events within polymer elements
	onDeleteContact(contact: CustomEvent<number>) {
		console.debug(contact);
		let storedContactsList = this.loadStorage();
		if (storedContactsList.length > 0) {
			const deletedContact = storedContactsList.splice(contact.detail, 1);
			deletedContact.forEach((contact: Contact) => console.debug(`deleted contact ${contact}`));
			this.saveStorage(storedContactsList);
			this.splice('allContacts', contact.detail, 1);
			console.debug(this.allContacts);
		}
	}

	onAddContactMenuClick(event: Event) {
		this.changePopupVisibility();
	}

	onClosePopup(event: CustomEvent<boolean>) {
		this.changePopupVisibility();
	}

	changePopupVisibility() {
		console.debug(`status before event ${this.__popupOpen}`);
		this.__popupOpen = !this.__popupOpen;
		console.debug(`status after event ${this.__popupOpen}`);
	}

	onSaveContact(event: CustomEvent<Contact>) {
		console.debug('app polymer handling on-save-contact');
		let storedContactsList = this.loadStorage();

		storedContactsList.push(event.detail);
		this.saveStorage(storedContactsList);

		this.push('allContacts', event.detail);
		console.debug(this.allContacts);
	}

	onElectronOpenAddContactMenuClick(event: CustomEvent<string>) {
		console.debug(event);
		this.changePopupVisibility();
	}

	onElectronCloseAddContactMenuClick(event: CustomEvent<string>) {
		console.debug(event);
		this.changePopupVisibility();
	}

	// handle events from electron ipc channels
	connectedCallback() {
		super.connectedCallback();
		window.addEventListener(
			'on-electron-open-add-contact-menu-click',
			this.onElectronOpenAddContactMenuClick as EventListener
		);
		window.addEventListener(
			'on-electron-close-add-contact-menu-click',
			this.onElectronCloseAddContactMenuClick as EventListener
		);
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		window.removeEventListener(
			'on-electron-open-add-contact-menu-click',
			this.onElectronOpenAddContactMenuClick as EventListener
		);
		window.removeEventListener(
			'on-electron-close-add-contact-menu-click',
			this.onElectronCloseAddContactMenuClick as EventListener
		);
	}

	private loadStorage(): Array<Contact> {
		let storedContactsList = JSON.parse(localStorage.getItem('contact-list')!);
		return storedContactsList === null ? [] : plainToClass(Contact, storedContactsList);
	}

	private saveStorage(contactList: Array<Contact>) {
		localStorage.setItem('contact-list', JSON.stringify(contactList));
	}

	static get template() {
		return html`
			<style>
				@import 'css/global.css';
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
