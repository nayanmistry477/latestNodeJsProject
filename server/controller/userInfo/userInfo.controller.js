// controllers/userController.js
const userService = require('../../services/userInfo.service');
// const passport = require('passport');

async function getAllUsers(req, res) {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

async function createUser(req, res) {
    try {
        const user = await userService.createNewUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
async function updateUser(req, res) {
    try {
        const user = await userService.updateUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// function loginUser(req, res, next) {
//     passport.authenticate('local', (err, user, info) => {
//         if (err) {
//             return next(err);
//         }
//         if (!user) {
//             return res.status(400).json({ message: info.message });
//         }
//         req.logIn(user, (err) => {
//             if (err) {
//                 return next(err);
//             }
//             return res.json(user);
//         });
//     })(req, res, next);
// };

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    // loginUser
};
