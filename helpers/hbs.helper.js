const moment = require('moment');

// HBS CONFIGURATION
module.exports = {
	ifequal(a, b, options) {
		if (a == b) {
			return options.fn(this);
		}
		return options.inverse(this);
	},
	getFullNameFirstCharacter(firstName, lastName) {
		return firstName.charAt(0) + lastName.charAt(0);
	},
	formatDate(date) {
		return moment(date).format('DD MMM, YYYY');
	},
};
