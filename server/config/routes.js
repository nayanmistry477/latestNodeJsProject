const routes = require('../routes');
module.exports = function (app, apiRoutes) {
    routes.userRoutes(apiRoutes);
    app.use('/api/users', apiRoutes);
}
