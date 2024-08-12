const User = require('../models/User');
const jenerateToken = require('../helpers/jenerateToken');

class GetAuthPageController {
	async showLogin(req, res) {
		res.render('login');
	}
	async showRegister(req, res) {
		res.render('register');
	}
	async postlogin(req, res) {
		try {
			const { email, password } = req.body;

			if (!email || !password) {
				return res.status(400).json({ message: 'All fields are required' });
			}

			// Find the user
			const user = await User.findOne({ email });
			if (!user) {
				return res.status(401).json({ message: 'Invalid email or password' });
			}
			if (password !== user.password) {
				return res.status(401).json({ message: 'Invalid email or password' });
			}

			const token = jenerateToken(user._id);
			res.cookie('token', token, { httpOnly: true, secure: true });
			res.redirect('/');
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: 'Something went wrong' });
		}
	}
	async postregister(req, res) {
		try {
			const { firstname, lastname, age, email, password } = req.body;
			if (
				!firstname.length ||
				!lastname.length ||
				!age.length ||
				!email.length ||
				!password.length
			) {
				return res.send('All fields is required');
			}
			const existUser = await User.findOne({ email });
			if (existUser) {
				return res.status(500).json({
					message: 'Email is already exist',
				});
			}

			console.log('Creating user');
			const userData = {
				firstname,
				lastname,
				age,
				email,
				password,
			};
			const user = await User.create(userData);
			console.log(user);
			try {
				const token = jenerateToken(user._id);
				console.log('Token generated:', token);
				res.cookie('token', token, { httpOnly: true, secure: true });
				console.log('Redirecting to /');
				res.redirect('/');
			} catch (tokenError) {
				console.error('Error generating token:', tokenError);
				return res.status(500).json({
					message: 'Something went wrong while generating the token',
				});
			}
		} catch (error) {
			console.error('Error during registration:', error);
			return res.status(500).json({
				message: 'Something went wrong during registration',
			});
		}
	}
	async onlogout(req, res) {
		res.clearCookie('token');
		res.redirect('/login');
	}
}

module.exports = new GetAuthPageController();
