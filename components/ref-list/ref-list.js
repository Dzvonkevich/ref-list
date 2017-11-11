(function () {
	'use strict';

	class RefList {
		constructor(options) {
			this.collection = options.collection || {};

			this.render();
		}
	}

	RefList.prototype.render = function () {
		const collection = new Collection(this.collection);
	}

	window.RefList = RefList;
})();