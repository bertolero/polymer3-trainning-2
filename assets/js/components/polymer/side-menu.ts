import { html, PolymerElement } from '@polymer/polymer';

class SideMenu extends PolymerElement {
	ready() {
		super.ready();
	}

	static get properties() {
		return {};
	}

	handleAddContactClick(event: Event) {
		const enableAddContactEvent = new CustomEvent('on-add-contact-menu-click', {
			detail: { message: 'on-add-contact-menu-click happened.' },
			bubbles: true,
			composed: true
		});
		console.debug('side menu trigger on-add-contact-menu-click event');
		this.dispatchEvent(enableAddContactEvent);
	}

	static get template() {
		return html`
			<style>
				@import 'css/global.css';
				.logo {
					text-align: center;
				}
				.logo img {
					width: 100px;
				}
				.title {
					font-weight: 700;
					color: #ccced7;
					margin: 1rem 0;
				}
				#side-menu {
					background: #323759;
					height: 100vh;
					padding: 50px 25px;
				}
				#side-menu nav a {
					color: #ccced7;
					text-decoration: none;
					text-transform: capitalize;
					display: block;
					padding: 10px 10px 10px 0;
				}
				#side-menu nav a span.icon {
					padding: 10px 10px 0 0;
				}
			</style>
			<section id="side-menu">
				<div class="logo">
					<img src="http://pngimg.com/uploads/volvo/volvo_PNG64.png" />
				</div>
				<div class="menu">
					<div class="title">Contacts</div>
					<nav>
						<a href="#" on-click="handleAddContactClick">
							<span class="icon"> + </span> Add Contact</a
						>
						<a href="#"><span class="icon"> + </span> Add Contact</a>
						<a href="#"><span class="icon"> + </span> Add Contact</a>
						<a href="#"><span class="icon"> + </span> Add Contact</a>
					</nav>
				</div>
			</section>
		`;
	}
}

customElements.define('side-menu', SideMenu);
