require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const compression = require('compression');
const morgan = require('morgan');
const recipeRoutes = require('./routes/recipeRoutes');
const userRoutes = require('./routes/userRoutes'); 

app.use(compression());
app.use(morgan('tiny'));
app.use(express.json()); 


app.use('/recipes', recipeRoutes);
app.use('/users', userRoutes); 

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
