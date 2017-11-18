(function () {
	'use strict';

	class RefList {
		constructor(options) {
			this.el         = options.el || 'body';
			this.collection = options.collection || {};
			this.form       = options.form || {};

			this.render();
		}

		render() {
			const collection = new Collection(this.collection);
			this.el.appendChild(collection.render());

			const form = new Form(this.form);
			this.el.appendChild(form.render());
		}
	}

	window.RefList = RefList;
})();