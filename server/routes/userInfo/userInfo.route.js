const userInfo = require('../../controller/userInfo/userInfo.controller');

module.exports = function (apiRoutes) {
    apiRoutes.get('/userInfo/getAllUsers', userInfo.getAllUsers);
    apiRoutes.post('/userInfo/createUser', userInfo.createUser);
    apiRoutes.post('/userInfo/updateUser', userInfo.updateUser);

};
