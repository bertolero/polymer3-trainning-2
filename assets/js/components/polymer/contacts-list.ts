import { html, PolymerElement } from '@polymer/polymer';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import { Contact } from './model/contact';

class ContactsList extends PolymerElement {
	ready() {
		super.ready();
		this.handleDeleteContact = this.handleDeleteContact.bind(this);
	}

	static get properties() {
		return {
			contacts: { type: Array<Contact>() }
		};
	}

	handleDeleteContact(event: any) {
		const sendDeleteEvent = new CustomEvent<number>('on-delete-contact', {
			detail: event.model.index,
			bubbles: true,
			composed: true
		});
		this.dispatchEvent(sendDeleteEvent);
	}

	static get template() {
		return html`
			<style>
				@import '/css/global.css';
				.contacts {
					max-width: 800px;
				}
				h2 {
					color: #3e4162;
					font-weight: 300;
				}
				.contact {
					width: 100%;
					display: grid;
					grid-template-columns: 1fr 2fr 3fr 1fr 1fr;
					color: #3d4060;
					padding: 20px;
					border-radius: 10px;
					transition: all 0.4s ease-in-out;
					cursor: pointer;
					position: relative;
					overflow: hidden;
				}
				.contact:hover {
					-webkit-box-shadow: 0px 4px 77px -17px rgba(0, 0, 0, 0.36);
					-moz-box-shadow: 0px 4px 77px -17px rgba(0, 0, 0, 0.36);
					box-shadow: 0px 4px 77px -17px rgba(0, 0, 0, 0.36);
				}
				.contact .user-img {
					background-image: url('https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=74daec1914d1d105202bca8a310a6a71');
					height: 40px;
					width: 40px;
					background-size: cover;
					background-position: center center;
					border-radius: 10px;
				}
				.contact .fullname {
					font-weight: 700;
					text-transform: capitalize;
				}
				.contact .number {
					font-weight: 500;
				}
				.text {
					display: block;
					text-align: center;
				}
				.sub {
					color: #b4b5c4;
					display: block;
					font-size: 0.8rem;
					font-weight: 300;
					text-align: center;
					margin: 5px 0;
				}
				.fullname,
				.user-img,
				.category,
				.number,
				.state {
					font-size: 1.4rem;
					font-weight: 500;
				}
				.delete-btn {
					position: absolute;
					right: 0;
					height: 100%;
					padding: 20px;
					color: white;
					background: red;
					display: flex;
					justify-content: center;
					align-items: center;
					-webkit-border-top-right-radius: 10px;
					-webkit-border-bottom-right-radius: 10px;
					-moz-border-radius-topright: 10px;
					-moz-border-radius-bottomright: 10px;
					border-top-right-radius: 10px;
					border-bottom-right-radius: 10px;
					transform: translate3d(100%, 0, 0);
					transition: all 0.4s ease-in-out;
				}
				.contact:hover .delete-btn {
					transform: translate3d(0, 0, 0);
				}
			</style>
			<section class="contacts">
				<h2>Contacts</h2>
				<template is="dom-repeat" items="{{contacts}}">
					<div class="contact">
						<div class="user-img"></div>
						<div class="fullname">
							<span class="text">{{item.firstName}} {{item.lastName}}</span>
							<span class="sub">Name</span>
						</div>
						<div class="number">
							<span class="text">{{item.phoneNumber}}</span>
							<span class="sub">Phone Number</span>
						</div>
						<div class="state">
							<span class="text">{{item.state}}</span>
							<span class="sub">State</span>
						</div>
						<div class="category">
							<span class="text">{{item.category}}</span>
							<span class="sub">Category</span>
						</div>
						<div class="delete-btn" on-click="handleDeleteContact">
							Delete
						</div>
					</div>
				</template>
			</section>
		`;
	}
}

customElements.define('contacts-list', ContactsList);
