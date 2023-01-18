const express = require('express');
const compression = require('compression');

//** Initialize express app
const app = express();

//** Set compression
app.use(compression());

//** for parsing application/json
app.use(express.json({ limit: '10kb' }));

//** for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true, parameterLimit: 100000, limit: '10kb' }));

//** Static files
const options = {
    // dotfiles: 'ignore',
    etag: true,
    // extensions: ['htm', 'html'],
    // index: false,
    maxAge: '365d',
    redirect: true,
    setHeaders: function (res, path, stat) {
        res.set({ 'x-timestamp': Date.now(), 'mandala-creators': '1.0.0.' });
    },
};
app.use(express.static(`${__dirname}/public/build/`, options));

//** Routes middlewares
app.use('/api/mandala', require('./routes/mandalaRoutes'));

module.exports = app;
