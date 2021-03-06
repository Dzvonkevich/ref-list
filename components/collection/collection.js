(function () {
	'use strict';

	class Collection {
		constructor(options) {
			this.items = options.items || {};
			this.title = options.title || 'Reference list';
		}

		_initEvents(collectionEl) {
			collectionEl.addEventListener('click', this._onClick.bind(this));
		}

		/**
		 * Init onClick
		 * Here we handle action 
		 * and call action functon
		 */
		_onClick(event) {
			event.preventDefault();
			let target = event.target;

			// Resign target to the link
			while (!target.getAttribute('data-action') && !target.classList.contains('collection')) {
				target = target.parentElement;
			}

			const action = target.getAttribute('data-action');

			if (typeof this[action] === 'function')
				this[action].call(this, target, event);
		}

		/**
		 * Delete item
		 */
		deleteItem(target, event) {
			target.closest('.collection--item').remove();

			// @todo - call a function to show 'Empty list'
			// if we detelet the last one element
		}

		/**
		 * Reorder item
		 */
		reorderItem(event) {
			console.dir(event);
		}

		render() {
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

			this.items.forEach(item => {
				itemsEl.appendChild(this.renderItem(item));	
			});
			collectionEl.appendChild(itemsEl);

			// init events
			this._initEvents(collectionEl);

			// Render collection
			return collectionEl;
		}

		/**
		 * Render item based on input data
		 *
		 * @todo  handle item.url
		 * @param  object item 
		 * @return object
		 */
		renderItem(item) {
			const configs     = this.renderItemConfigPanel();

			const itemEl = document.createElement('li');
			itemEl.classList.add('collection--item');

			const itemName   = item.title || 'Unknown';
			const itemNameEl = document.createElement('div');
			itemEl.classList.add('collection--item__name');
			itemEl.innerText = itemName;
			itemEl.appendChild(configs);

			return itemEl;
		}

		/**
		 * List of configs placed 
		 * on right hand of the item
		 *
		 * @return documenElement
		 */
		renderItemConfigPanel() {
			const configs = [
				{
					faIcon: 'fa-bars',
					action: 'reorderItem',
				},
				{
					faIcon: 'fa-trash-o',
					action: 'deleteItem',
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
	}

	window.Collection = Collection;
})();