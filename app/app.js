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
		el: document.querySelector('.ref-list'),
		collection: {
			items: items,
			title: title
		},
	});
})();