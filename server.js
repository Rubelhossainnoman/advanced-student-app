/**
 * Get Modules here...
 */
const express = require('express');
const colors = require('colors');
const env = require('dotenv').config();
const path = require('path');
const uc = require('upper-case');
const expressLayout = require('express-ejs-layouts');
const router = require('./router/student');

/**
 * Get Port here...
 */
const port = process.env.PORT || 4000;

/**
 * Express inig...
 */
const app = express();

/**
 * Manage from data
 */
app.use(express.json());
app.use(express.urlencoded({extended : false}));

/**
 * User public foulder...
 */
app.use(express.static('public'));

/**
 * Set Engine...
 */
app.set('view engine', 'ejs');

/**
 * Set Layout...
 */
app.set('layout', 'layouts/app');

/**
 * User express ejs layouts
 */
app.use(expressLayout);

/**
 * Manage routing system...
 */
app.use('/student', router)

/**
 * Create server here...
 */
app.listen(port, () =>{
    console.log(uc.upperCase(`This server is running port ${port}`).bgGreen.white);
});