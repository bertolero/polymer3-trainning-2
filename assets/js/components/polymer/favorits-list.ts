import { html, PolymerElement } from '@polymer/polymer';
import '@polymer/polymer/lib/elements/dom-repeat.js';

class FavoritesList extends PolymerElement {
	ready() {
		super.ready();
	}

	static get properties() {
		return {
			contacts: { type: Array }
		};
	}

	isFavorite(item: any) {
		return item.favorites === 'yes';
	}

	static get template() {
		return html`
			<style>
				@import '/css/global.css';
				.favorites {
					max-width: 800px;
					display: grid;
					grid-template-columns: 1fr 1fr 1fr;
					grid-gap: 20px;
				}
				h2 {
					color: #3e4162;
					font-weight: 300;
					grid-column: 1/4;
				}
				.card {
					color: #3d4060;
					width: 100%;
					display: grid;
					grid-template-columns: 1fr 1fr;
					border-radius: 10px;
					padding: 15px 0 0;
					transition: all 0.4s ease-in-out;
					cursor: pointer;
					-webkit-box-shadow: 0px 4px 77px -17px rgba(0, 0, 0, 0.36);
					-moz-box-shadow: 0px 4px 77px -17px rgba(0, 0, 0, 0.36);
					box-shadow: 0px 4px 77px -17px rgba(0, 0, 0, 0.36);
				}
				.card:hover {
					-webkit-box-shadow: 0px 4px 77px -17px rgba(0, 0, 0, 0.36);
					-moz-box-shadow: 0px 4px 77px -17px rgba(0, 0, 0, 0.36);
					box-shadow: 0px 4px 77px -17px rgba(0, 0, 0, 0.36);
				}
				.user-img {
					background-image: url('https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=74daec1914d1d105202bca8a310a6a71');
					height: 80px;
					width: 80px;
					background-size: cover;
					background-position: center center;
					border-radius: 50%;
					grid-column: 1/3;
					align-self: center;
					justify-self: center;
				}
				.fullname {
					font-weight: 700;
					text-transform: capitalize;
					grid-column: 1/3;
					padding: 20px;
					border-bottom: 1px solid rgba(0, 0, 0, 0.1);
				}
				.number {
					font-weight: 500;
					grid-column: 1/3;
					padding: 20px;
					border-bottom: 1px solid rgba(0, 0, 0, 0.1);
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
				.category {
					border-left: 1px solid rgba(0, 0, 0, 0.1);
				}
				.fullname,
				.user-img,
				.category,
				.number,
				.state {
					font-size: 1.4rem;
					font-weight: 500;
					padding: 15px;
				}
			</style>
			<section class="favorites">
				<h2>Favorites</h2>
				<template is="dom-repeat" items="{{contacts}}" filter="isFavorite">
					<div class="card">
						<div class="user-img"></div>
						<div class="fullname">
							<span class="text">{{item.first_name}} {{item.last_name}}</span>
							<span class="sub">Name</span>
						</div>
						<div class="number">
							<span class="text"> {{item.phone_number}}</span>
							<span class="sub">Phone Number</span>
						</div>
						<div class="state">
							<span class="text"> {{item.state}}</span>
							<span class="sub">State</span>
						</div>
						<div class="category">
							<span class="text"> {{item.category}}</span>
							<span class="sub">Category</span>
						</div>
					</div>
				</template>
			</section>
		`;
	}
}

customElements.define('favorites-list', FavoritesList);
