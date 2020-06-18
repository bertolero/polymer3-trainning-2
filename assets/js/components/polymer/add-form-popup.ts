import { PolymerElement, html } from '@polymer/polymer';
import '@polymer/polymer/lib/elements/dom-if.js';

class AddFormPopup extends PolymerElement {
	open = false;

	private __formData: any = {};

	constructor() {
		super();
	}

	ready() {
		super.ready();
		this.__formData = {};
		this.change = this.change.bind(this);
		this.submitForm = this.submitForm.bind(this);
	}

	static get properties() {
		return {
			open: {
				type: Boolean,
				value: false
			},
			__formData: { type: Object }
		};
	}

	change(event: any) {
		let formData: any = {};
		let name = event.target.name;
		let value =
			event.target.type === 'checkbox'
				? event.target.checked
				: event.target.value;

		formData[name] = value;
		this.__formData = Object.assign(this.__formData, formData);
	}

	submitForm(event: any) {
		event.preventDefault();
		const elements = this.shadowRoot!.querySelectorAll('input');
		for (const element of elements) {
			if (element.type === 'text') {
				element.value = '';
			}
		}
		this.storeContactList(this.__formData);
		this.onSaveContactEvent(this.__formData);
		this.__formData = {};
	}

	storeContactList(contact: any) {
		let storedContactsList = JSON.parse(localStorage.getItem('contact-list')!);
		storedContactsList = storedContactsList === null ? [] : storedContactsList;
		console.debug('add-form-popup trigger add to contact list operation');
		console.debug(contact);
		storedContactsList.push(contact);
		localStorage.setItem('contact-list', JSON.stringify(storedContactsList));
	}

	onSaveContactEvent(contact: any) {
		const saveContactEvent = new CustomEvent('on-save-contact', {
			detail: { contact: contact },
			bubbles: true,
			composed: true
		});
		console.debug('add-form-popup trigger on-save-contact event');
		console.debug(saveContactEvent);
		this.dispatchEvent(saveContactEvent);
		this.triggerClosePopupEvent();
	}

	toggleAddFormPopup(event: Event) {
		this.triggerClosePopupEvent();
	}

	triggerClosePopupEvent() {
		this.open = !this.open;
		const closePopupEvent = new CustomEvent('on-close-popup', {
			detail: { close: true },
			bubbles: true,
			composed: true
		});
		console.debug('add-form-popup trigger on-close-popup event');
		console.debug(closePopupEvent);
		this.dispatchEvent(closePopupEvent);
	}

	static get template() {
		return html`
			<style>
				@import '/css/global.css';
				.add-form-popup {
					background: #2b304c;
					height: 100vh;
					width: 100vw;
					position: fixed;
					top: 0;
					left: 0;
					display: flex;
					justify-content: center;
					align-items: center;
					z-index: 2;
					visibility: visible;
					opacity: 1;
					transition: all 0.4s ease-in-out;
				}
				.closing-btn {
					position: absolute;
					z-index: 3;
					right: 20px;
					top: 0;
					font-size: 2rem;
					padding: 20px;
				}
				.closing-btn svg {
					width: 24px;
					height: 24px;
					fill: white;
				}
				form {
					width: 400px;
					background: white;
					padding: 20px;
					border-radius: 10px;
					display: grid;
					grid-template-columns: 1fr 1fr 1fr 1fr;
					grid-gap: 20px;
				}
				h2 {
					font-size: 1.4rem;
					font-weight: 500;
					grid-column: 1/5;
				}
				.add-form-group {
					padding: 0px;
					position: relative;
				}
				label {
					font-size: 0.7rem;
					background: white;
					position: absolute;
					top: -5px;
					display: inline-block;
				}
				input[type='text'] {
					padding: 10px;
					display: block;
					width: 100%;
				}
				.first-name {
					grid-column: 1/3;
				}
				.last-name {
					grid-column: 3/5;
				}
				.address-1 {
					grid-column: 1/5;
				}
				.address-2 {
					grid-column: 1/5;
				}
				.city {
					grid-column: 1/3;
				}
				.button {
					justify-self: end;
					grid-column: 4/5;
				}
				.button button {
					cursor: pointer;
					padding: 10px 25px;
					background: #d8e0de; /* Old browsers */
					background: -moz-linear-gradient(
						top,
						#d8e0de 0%,
						#8ea6a2 0%,
						#4e5c5a 100%,
						#0e0e0e 100%
					); /* FF3.6-15 */
					background: -webkit-linear-gradient(
						top,
						#d8e0de 0%,
						#8ea6a2 0%,
						#4e5c5a 100%,
						#0e0e0e 100%
					); /* Chrome10-25,Safari5.1-6 */
					background: linear-gradient(
						to bottom,
						#d8e0de 0%,
						#8ea6a2 0%,
						#4e5c5a 100%,
						#0e0e0e 100%
					); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
					border: 1px solid rgba(0, 0, 0, 0.1);
					border-radius: 5px;
					color: white;
					text-shadow: 0px 1px 2px rgba(0, 0, 0, 1);
				}
			</style>
			<template is="dom-if" if="{{open}}">
				<section class="add-form-popup">
					<form on-submit="submitForm">
						<div class="closing-btn" on-click="toggleAddFormPopup">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
								<path
									d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
								/>
							</svg>
						</div>
						<h2>Add a new contact</h2>
						<div class="add-form-group first-name">
							<label for="first_name">First Name</label>
							<input type="text" name="first_name" on-keyup="change" />
						</div>
						<div class="add-form-group last-name">
							<label for="last_name">Last Name</label>
							<input type="text" name="last_name" on-keyup="change" />
						</div>
						<div class="add-form-group address-1">
							<label for="address_1">Address #1</label>
							<input type="text" name="address_1" on-keyup="change" />
						</div>
						<div class="add-form-group address-2">
							<label for="address_2">Address #2</label>
							<input type="text" name="address_2" on-keyup="change" />
						</div>
						<div class="add-form-group city">
							<label for="city">City</label>
							<input type="text" name="city" on-keyup="change" />
						</div>
						<div class="add-form-group state">
							<label for="state">State</label>
							<input type="text" name="state" on-keyup="change" />
						</div>
						<div class="add-form-group zipcode">
							<label for="zipcode">Zipcode</label>
							<input type="text" name="zipcode" on-keyup="change" />
						</div>
						<div class="add-form-group phone_number">
							<label for="phone_number">Phone Number</label>
							<input type="text" name="phone_number" on-keyup="change" />
						</div>
						<div class="add-form-group category">
							<label for="category">Category</label>
							<input type="text" name="category" on-keyup="change" />
						</div>
						<div class="add-form-group favorites">
							<label for="favorites">Favorites</label>
							<input type="text" name="favorites" on-keyup="change" />
						</div>
						<div class="add-form-group button">
							<button type="submit">Add</button>
						</div>
					</form>
				</section>
			</template>
		`;
	}
}

customElements.define('add-form-popup', AddFormPopup);
