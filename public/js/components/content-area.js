import { css, html, LitElement } from "https://unpkg.com/lit-element/lit-element.js?module";
import ContactsList from "./contacts-list.js";
import FavoritesList from "./favorits-list.js";

export default class ContentArea extends LitElement {
  static get properties() {
    return {
      mood: { type: String }
    };
  }

  static get styles() {
    return css`
      #content-area {
        background: #fcfdff;
        padding: 50px 80px;
      }
		`;
  }

  render() {
    return html`
    <section id="content-area">
        <favorites-list></favorites-list>
        <contacts-list></contacts-list>
    </section>
		`;
  }
}

customElements.define("content-area", ContentArea);
