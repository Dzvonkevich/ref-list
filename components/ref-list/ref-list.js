(function () {
	'use strict';

	class RefList {
		constructor(options) {
			this.el         = options.el || 'body';
			this.collection = options.collection || {};

			this.render();
		}
	}

	RefList.prototype.render = function () {
		const collection = new Collection(this.collection);
		this.el.appendChild(collection.render());
	}

	window.RefList = RefList;
})();