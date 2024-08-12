const express = require('express');
const { create } = require('express-handlebars');
const hsbHelper = require('./helpers/hbs.helper');
const session = require('express-session');

// Routes
const AuthRouter = require('./routes/auth');
const MainRouter = require('./routes/main');
const { default: mongoose } = require('mongoose');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// hbs configuration
const hbs = create({
	defaultLayout: 'main',
	extname: 'hbs',
	helpers: hsbHelper,
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');

// EXPRESS MIDDLEWARES
app.use(
	session({ secret: 'Abdulloh', resave: false, saveUninitialized: false })
);

// Routes middleware
app.use(AuthRouter);
app.use(MainRouter);

// LISTEN || CONNECT MONGO DB
const PORT = 3030 || process.env.PORT;

app.listen(PORT, () => {
	mongoose
		.connect(
			'mongodb+srv://abdulloh:abu55abu@cluster0.y3r7igu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
		)
		.then(() => {
			console.log('DB connected');
		})
		.catch((err) => {
			console.error('DB connection error:', err);
		});

	console.log(`Server has been started on PORT ${PORT}`);
});
