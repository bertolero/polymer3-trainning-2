import { LitElement, html } from "https://unpkg.com/lit-element/lit-element.js?module";
import SideMenu from "./side-menu.js";
import ContentArea from "./content-area.js";

export class MyElement extends LitElement {

  constructor() {
    super();
    this.popupOpen = false;
    this.allContacts = [];
    this.togglePopup = this.togglePopup.bind(this);
    this.saveContact = this.saveContact.bind(this);
  }

  static get properties() {
    return {
      popupOpen: {type: Boolean},
      allContacts: {type: Array},
    };
  }

  togglePopup() {
    console.log("clicked button");
    this.popupOpen = !this.popupOpen;
    console.log(this.popupOpen);
  }

  saveContact(contact) {
    console.log("Saved contact");
    console.log(contact);
    function immutablePush(arr, newEntry) {
      return [...arr, newEntry];
    }
    this.allContacts = immutablePush(this.allContacts, contact);
    console.log(this.allContacts);
    this.togglePopup();
  }

  render() {
    return html`
      <style>
          @import "/css/global.css";
          .main-page {
              display: grid;
              grid-template-columns: 250px 1fr;
          }
      </style>
      <div class="main-page">
          <side-menu .togglePopup="${this.togglePopup}"></side-menu>
          <content-area .togglePopup="${this.togglePopup}" .popupOpen="${this.popupOpen}" .saveContact="${this.saveContact}" .allContacts="${this.allContacts}"></content-area>
      </div>
		`;
  }
}

customElements.define("my-element", MyElement);
