(function () {
	'use strict';

	class Form {
		constructor(options) {
			this._fields = [
				{
					label: 'Source',
					type: 'text',
				},
				{
					label: 'URL',
					type: 'url',
				},
				{
					type: 'submit',
					value: 'Add',
					action: 'submit'
				}
			];

			console.log('Form constructed');
		}

		_initEvents(formEl) {
			formEl.addEventListener('click', this._onClick.bind(this));
			formEl.addEventListener('submit', this.submit.bind(this));
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
			while (!target.getAttribute('data-action') && !target.classList.contains('form')) {
				target = target.parentElement;
			}

			const action = target.getAttribute('data-action');

			if (typeof this[action] === 'function')
				this[action].call(this, target, event);
		}

		/**
		 * Validate filled fields
		 * here this is the formEl
		 */
		_validate(items) {
			items.forEach(item => item.classList.remove('js-error'));

			// include filter function
			items.filter = Array.prototype.filter;

			// grab empty fields
			const errors = items.filter(el => el.value == '');

			if (!errors.length)
				return true;

			errors.forEach(item => item.classList.add('js-error'));
			return false;
		}



		/**
		 * Handle form submitting
		 */
		submit(target, event) {
			if (!target.classList.contains('form'))
				target = target.closest('form');

			const items = target.querySelectorAll('input:not([type="submit"])');

			if (this._validate(items)) {
				items.map = Array.prototype.map;
				this._addToCollection(items.map(item => item.value));

				items.forEach(item => item.value = '');
			}

			return false;
		}

		_addToCollection(values) {

		}

		render() {
			const formEl = document.createElement('form');
			formEl.classList.add('form');

			// Render items into collection
			const fieldsEl = document.createElement('div');
			fieldsEl.classList.add('form--fields');

			this._fields.forEach(field => {
				fieldsEl.appendChild(this.renderField(field))
			});
			formEl.appendChild(fieldsEl);

			// init events
			this._initEvents(formEl);

			// Render collection
			return formEl;
		}

		renderField(field) {
			const fieldEl = document.createElement('input');
			fieldEl.classList.add('form--field__input');

			const fieldLabel = field.label || 'Field';
			fieldEl.placeholder = fieldLabel;
			fieldEl.dataset.name = fieldLabel;

			const fieldType  = field.type || 'text';
			fieldEl.type = fieldType;

			const fieldValue = field.value || '';
			fieldEl.value = fieldValue;

			const fieldAction = field.action || '';
			fieldEl.dataset.action = fieldAction;

			return fieldEl;
		}
	}

	window.Form = Form;
})();