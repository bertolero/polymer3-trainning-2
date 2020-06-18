import { html, PolymerElement } from '@polymer/polymer';
import './contacts-list';
import './favorits-list';

class ContentArea extends PolymerElement {
	static get properties() {
		return {
			allContacts: { type: Array }
		};
	}

	static get template() {
		return html`
			<style>
				@import '/css/global.css';
				#content-area {
					background: #fcfdff;
					padding: 50px 80px;
				}
			</style>
			<section id="content-area">
				<favorites-list contacts="[[allContacts]]"></favorites-list>
				<contacts-list contacts="[[allContacts]]"></contacts-list>
			</section>
		`;
	}
}

customElements.define('content-area', ContentArea);
