import { css, html, LitElement } from "https://unpkg.com/lit-element/lit-element.js?module";
import ContactsList from './contacts-list.js';

export default class ContentArea extends LitElement {
  static get properties() {
    return {
      mood: { type: String }
    };
  }

  static get styles() {
    return css`
			.mood {
				color: green;
			}
		`;
  }


  render() {
    return html`
    <style>
        #content-area {
            background: #fcfdff;
            padding: 50px 80px;
        }
    </style>
    <section id="content-area">
        <contacts-list></contacts-list>
    </section>
		`;
  }
}

customElements.define("content-area", ContentArea);
