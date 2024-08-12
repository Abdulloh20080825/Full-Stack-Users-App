const User = require("../models/User");

class MainPageController {
	async mainPage(req, res, options = {}) {
		const { token = false } = options;
		res.render('main', { token });
	}
	// GET ALL USER
	async getAllUsers(req, res) {
		const users = await User.find();
		res.send(users);
	}

	// FIND USER
	async findUser(req, res) {}
}

module.exports = new MainPageController();
