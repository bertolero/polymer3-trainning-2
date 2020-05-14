import { css, html, LitElement } from "https://unpkg.com/lit-element/lit-element.js?module";

export default class ContactsList extends LitElement {
  static get properties() {
    return {
      mood: { type: String }
    };
  }

  static get styles() {
    return css`
			.contacts {
            max-width: 800px;
        }
        h2 {
            color: #3e4162;
            font-weight: 300;
        }
        .contact {
            color: #3d4060;
            width: 100%;
            display: grid;
            grid-template-columns: 1fr 2fr 3fr 1fr 1fr;
            padding: 20px;
            border-radius: 10px;
            transition: all .4s ease-in-out;
            cursor: pointer;
        }
        .contact:hover {
            -webkit-box-shadow: 0px 4px 77px -17px rgba(0,0,0,0.36);
            -moz-box-shadow: 0px 4px 77px -17px rgba(0,0,0,0.36);
            box-shadow: 0px 4px 77px -17px rgba(0,0,0,0.36);
        }
        .contact .user-img {
            background-image: url("https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=74daec1914d1d105202bca8a310a6a71");
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
            font-size: .8rem;
            font-weight: 300;
            text-align: center;
            margin: 5px 0;
        }
        .fullname, .user-img, .category, .number, .state {
            font-size: 1.4rem;
            font-weight: 500;
        }
		`;
  }

  render() {
    return html`
    <section class="contacts">
      <h2>Contacts</h2>
      <div class="contact">
        <div class="user-img"></div>
        <div class="fullname">
            <span class="text">Gabriel Bertol Pinheiro</span>
            <span class="sub">Name</span>
        </div>
        <div class="number">
            <span class="text">41-123-456-789</span>
            <span class="sub">Phone Number</span>
        </div>
        <div class="state">
            <span class="text">PR</span>
            <span class="sub">State</span>
        </div>
        <div class="category">
            <span class="text">Family</span>
            <span class="sub">Category</span>
        </div>
      </div>
      <div class="contact">
        <div class="user-img"></div>
        <div class="fullname">
            <span class="text">Gabriel Bertol Pinheiro</span>
            <span class="sub">Name</span>
        </div>
        <div class="number">
            <span class="text">41-123-456-789</span>
            <span class="sub">Phone Number</span>
        </div>
        <div class="state">
            <span class="text">PR</span>
            <span class="sub">State</span>
        </div>
        <div class="category">
            <span class="text">Family</span>
            <span class="sub">Category</span>
        </div>
      </div>
    </section>
		`;
  }
}

customElements.define("contacts-list", ContactsList);
