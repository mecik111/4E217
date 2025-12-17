
const express = require('express');
const path = require('path');
const libraryRouter = require('./routes/postsRouter');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true}));
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/', libraryRouter);

module.exports = app;