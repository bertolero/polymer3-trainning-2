import { LitElement, html } from "https://unpkg.com/lit-element/lit-element.js?module";
import ContactsList from "./contacts-list.js";
import FavoritesList from "./favorits-list.js";
import AddFormPopup from "./add-form-popup.js";

export default class ContentArea extends LitElement {
  constructor() {
    super();
  }

  static get properties() {
    return {
      togglePopup: { type: Function },
      saveContact: { type: Function },
      popupOpen: { type: Boolean },
      allContacts: {type: Array},
    };
  }

  render() {
    return html`
    <style>
      @import "/css/global.css";
      #content-area {
        background: #fcfdff;
        padding: 50px 80px;
      }
    </style>
    <section id="content-area">
        <add-form-popup .togglePopup="${this.togglePopup}" .popupOpen="${this.popupOpen}" .saveContact="${this.saveContact}"></add-form-popup>
        <favorites-list .allContacts="${this.allContacts}"></favorites-list>
        <contacts-list .allContacts="${this.allContacts}"></contacts-list>
    </section>
		`;
  }
}

customElements.define("content-area", ContentArea);
