const newsRouter = require('./news');
const meRouter = require('./me');
const siteRouter = require('./site');
const coursesRouter = require('./courses');
const accountRouter = require('./account');
const petRouter = require('./pet');

function route(app) {
    app.use('/news', newsRouter);
    app.use('/courses', coursesRouter);
    app.use('/me', meRouter);
    app.use('/account', accountRouter);
    app.use('/pet', petRouter);
    app.use('/', siteRouter);
}

module.exports = route;
