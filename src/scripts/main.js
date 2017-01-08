'use strict';

import Post from './Post/index';
import fetchJsonp from 'fetch-jsonp';
import querystring from 'querystring';

const WND_COLLAPSE_WIDTH = 768;
let isWndCollapse = false;

let params = {
	access_token: '691623.1419b97.479e4603aff24de596b1bf18891729f3',
	count: '20'
};

let query = querystring.stringify(params, '&', '=', {
	encodeURIComponent: encodeURIComponent
});


let url = `https://api.instagram.com/v1/users/691623/media/recent?${query}`;

document.addEventListener('DOMContentLoaded', () => {

	window.addEventListener('resize', onResize);
	onResize();

	fetchJsonp(url)
		.then(response => {
			return response.json();
		}).then(recentMedia => {
			let postsContainer = document.createElement('div');
			postsContainer.classList.add('posts-container');
			document.body.appendChild(postsContainer);

			let posts = recentMedia.data;

			// Не успел сделать сортировку по колонкам
			// по-умолчанию CSS-columns сортирует вертикально
			posts.sort( (a, b) => {
				return a.caption.created_time > b.caption.created_time ? -1 : 1;
			} );

			for (let postData of posts) {
				let post = new Post(postData);
				post.render(postsContainer);
			}

		}).catch(alert);
});

function onResize() {
	let wndWidth = document.documentElement.clientWidth || document.body.clientWidth;

	document.body.classList.remove('full-width');
	document.body.classList.remove('collpse-width');

	if (wndWidth > WND_COLLAPSE_WIDTH) {
		isWndCollapse = false;
		document.body.classList.add('full-width');
	}
	else {
		isWndCollapse = true;
		document.body.classList.add('collpse-width');
	}
}
