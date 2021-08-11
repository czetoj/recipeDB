const express = require("express");
const recipeRoute = require('./controllers/recipe/recipe.route');
const userRoute = require('./controllers/user/user.route');
const ingredientRoute = require('./controllers/ingredient/ingredient.route');
const messageRoute = require('./controllers/message/message.route');
const menuRoute = require('./controllers/menu/menu.route');
const authHandler = require('./auth/authHandler');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const createError = require('http-errors');
const mongoose = require("mongoose");
const cors = require('cors');
require('dotenv').config();

const app = express();

const swaggerDocument = YAML.load('./docs/swagger.yaml');
app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.post('/login', authHandler.login)
app.post('/refresh', authHandler.refresh)
app.post('/logout', authHandler.logout)
app.use(recipeRoute);
app.use(ingredientRoute);
app.use(userRoute);
app.use(messageRoute);
app.use(menuRoute);

app.use((req, res, next) => {
    next(createError(404));
});

app.use((err, req, res, next) => {
    res.status(err.statusCode || 500);
    res.json({
        hasError: true,
        message: err.message
    });
})

mongoose.connect(`${process.env.MONGODB_HOST}${process.env.DATABASE}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Kapcsolati hiba (lehet, hogy nincs net):'));
db.once('open', function () {
    console.log("We are connected to the db");
});
mongoose.Promise = Promise;


app.listen(process.env.PORT, () => {
    console.log(`The server is running at ${process.env.PORT}...`);
});