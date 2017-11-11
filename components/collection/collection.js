(function () {
	'use strict';

	class Collection {
		constructor(options) {
			this.el    = options.el || 'body';
			this.items = options.items || [
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
			this.title = options.title || 'Reference list';

			this.render();
		}
	}

	/**
	 * List of configs placed 
	 * on right hand of the item
	 *
	 * @return documenElement
	 */
	Collection.prototype.render = function () {
		this.el.innerHTML = '';

		const collectionEl = document.createElement('div');
		collectionEl.classList.add('collection');

		// Render title of collection
		const titleEl     = document.createElement('h5');
		titleEl.classList.add('collection--title');
		titleEl.innerHTML = this.title;
		collectionEl.appendChild(titleEl);

		// Render items into collection
		const itemsEl     = document.createElement('ul');
		itemsEl.classList.add('collection--list');

		console.dir(this.items);

		this.items.forEach(item => {
			const configs     = this.renderItemConfigPanel();

			const itemEl = document.createElement('li');
			itemEl.classList.add('collection--item');

			const itemName   = item.title || 'Unknown';
			const itemNameEl = document.createElement('div');
			itemEl.classList.add('collection--item__name');
			itemEl.innerText = itemName;
			itemEl.appendChild(configs);
			itemsEl.appendChild(itemEl);
		});
		collectionEl.appendChild(itemsEl);

		// Render collection
		this.el.appendChild(collectionEl);
	}

	/**
	 * List of configs placed 
	 * on right hand of the item
	 *
	 * @return documenElement
	 */
	Collection.prototype.renderItemConfigPanel = () => {
		const configs = [
			{
				faIcon: 'fa-bars',
				action: 'reorder',
			},
			{
				faIcon: 'fa-trash-o',
				action: 'delete',
			}
		];

		const configsEl = document.createElement('div');
		configsEl.classList.add('collection--config');

		configs.forEach(config => {
			const configHTML = `
				<a 
					href="javascript:" 
					data-action="`+config.action+`" 
					class="collection--config__item collection--config__`+config.action+`">
					<i class="fa `+config.faIcon+`" aria-hidden="true"></i>
				</a>
			`;
			configsEl.insertAdjacentHTML('beforeEnd', configHTML);
		});

		return configsEl;
	}

	window.Collection = Collection;
})();