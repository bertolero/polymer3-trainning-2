import { LitElement, html, css } from "https://unpkg.com/lit-element/lit-element.js?module";
import SideMenu from "./side-menu.js";
import ContentArea from "./content-area.js";

export class MyElement extends LitElement {
  static get properties() {
    return {
      mood: { type: String }
    };
  }

  static get styles() {
    return css`
			@import "/css/global.css";
			.main-page {
			  display: grid;
			  grid-template-columns: 250px 1fr;
			}
		`;
  }


  render() {
    return html`
    <div class="main-page">
        <side-menu></side-menu>
        <content-area></content-area>
    </div>
		`;
  }
}

customElements.define("my-element", MyElement);
