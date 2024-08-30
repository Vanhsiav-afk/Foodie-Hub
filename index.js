require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');
const port = process.env.PORT || 3000;
const compression = require('compression');
const morgan = require('morgan');
const recipeRoutes = require('./routes/recipeRoutes');
const userRoutes = require('./routes/userRoutes'); 

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(compression());
app.use(morgan('tiny'));
app.use(express.json()); 

app.use(session({
  secret: process.env.SESSION_SECRET || 'default_secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

app.use('/recipes', recipeRoutes);
app.use('/users', userRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!'); 
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
