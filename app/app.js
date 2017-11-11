(function () {
	'use strict';

	let title = 'References list';

	let items = [
		{
			title: 'Google',
			url: 'https://google.com'
		},
		{
			title: 'Facebook',
			url: 'https://facebook.com'
		},
		{
			title: 'LinkedIn',
			url: 'https://linkedin.com'
		},
	];

	const refList = new RefList({
		collection: {
			el: document.querySelector('.ref-list'),
			items: items,
			title: title
		}
	});
})();