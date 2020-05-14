import { css, html, LitElement } from "https://unpkg.com/lit-element/lit-element.js?module";
import ContactsList from "./contacts-list.js";
import FavoritesList from "./favorits-list.js";

export default class AddFormPopup extends LitElement {
  static get properties() {
    return {
      mood: { type: String }
    };
  }

  static get styles() {
    return css`
      @import "/css/global.css";
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
          font-size: .7rem;
          background: white;
          position: absolute;
          top: -5px;
          display: inline-block;
      }
      input[type="text"] {
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
      .button button{
          cursor: pointer;
          padding: 10px 25px;
          background: #d8e0de; /* Old browsers */
          background: -moz-linear-gradient(top, #d8e0de 0%, #8ea6a2 0%, #4e5c5a 100%, #0e0e0e 100%); /* FF3.6-15 */
          background: -webkit-linear-gradient(top, #d8e0de 0%,#8ea6a2 0%,#4e5c5a 100%,#0e0e0e 100%); /* Chrome10-25,Safari5.1-6 */
          background: linear-gradient(to bottom, #d8e0de 0%,#8ea6a2 0%,#4e5c5a 100%,#0e0e0e 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
          border: 1px solid rgba(0, 0, 0, .1);
          border-radius: 5px;
          color: white;
          text-shadow: 0px 1px 2px rgba(0, 0, 0, 1);
      }
		`;
  }

  render() {
    return html`
        
        <section class="add-form-popup">
            <form>
                <h2>Add a new contact</h2>
                <div class="add-form-group first-name">
                    <label for="first_name">First Name</label>
                    <input type="text" id="first_name">
                </div>
                <div class="add-form-group last-name">
                    <label for="last_name">Last Name</label>
                    <input type="text" id="last_name">
                </div>
                <div class="add-form-group address-1">
                    <label for="address_1">Address #1</label>
                    <input type="text" id="address_1">
                </div>
                <div class="add-form-group address-2">
                    <label for="address_2">Address #2</label>
                    <input type="text" id="address_2">
                </div>
                <div class="add-form-group city">
                    <label for="city">City</label>
                    <input type="text" id="city">
                </div>
                <div class="add-form-group state">
                    <label for="state">State</label>
                    <input type="text" id="state">
                </div>
                <div class="add-form-group zipcode">
                    <label for="zipcode">Zipcode</label>
                    <input type="text" id="zipcode">
                </div>
                <div class="add-form-group button">
                    <button type="submit">Add</button>
                </div>
            </form>
        </section>
		`;
  }
}

customElements.define("add-form-popup", AddFormPopup);
