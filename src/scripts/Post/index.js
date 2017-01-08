'use strict';

import './index.scss';
import postTmp from './template';

const MS_IN_HOUR = 1000 * 60 * 60;
const MS_IN_DAY = MS_IN_HOUR * 24;

export default class Post {
	constructor(props) {
		this.data = props;
		this.el = null;
		this.template = postTmp.bind(this);
	}

	get timeLeft() {
		let timeLeft = Date.now() - fromUnixTimeStamp(this.data.caption.created_time);

		return timeLeft < MS_IN_DAY ? `${toHours(timeLeft)}h` : `${toDays(timeLeft)}d`;
	}

	get elementById() {
		return document.getElementById(this.data.id);
	}

	render(containerEl) {
		containerEl.insertAdjacentHTML('beforeEnd', this.template());
		this.el = containerEl.children[containerEl.children.length - 1];

		let filterName = 'filter' in this.data && this.data.filter.toLowerCase();

		if (filterName && filterName != 'normal') {
			this.el.getElementsByTagName('figure')[0].classList.add(filterName);
		}

		this.el.addEventListener('click', event => {
			if ( event.target.classList.contains('post-content-likes-heart') ) {
				alert(this.data.id);
			}
		});
	}
}

function toHours(stamp) {
	return Math.round(stamp / (MS_IN_HOUR));
}

function toDays(stamp) {
	return Math.round(stamp / (MS_IN_DAY));
}

function fromUnixTimeStamp(ustamp) {
	return ustamp * 1000;
}
