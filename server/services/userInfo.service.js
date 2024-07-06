const UserModel = require('../models/userInfoModel/userInfo.model');


function getAllUsers() {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await UserModel.find({}).lean().exec();
            return resolve({ success: true, users });
        } catch (e) {
            return reject({
                success: false,
                message: e && e.message ? e.message : 'Unable to get users.',
                error: e,
            });
        }
    });
}

async function createNewUser(user) {
    const promiseFunction = async (resolve, reject) => {
        try {
            if (!user || !user.email || !user.name || !user.password) {
                return reject({ success: false, message: 'Invalid input.' });
            }
            let isUserExistWithSameEmail = false;
            const existingUsers = await UserModel.find({}, { email: 1 }).lean().exec();
            if (existingUsers && existingUsers.length) {
                const index = existingUsers.findIndex((eu) => eu.email === user.email);
                if (index !== -1) {
                    isUserExistWithSameEmail = true;
                }
            }
            if (isUserExistWithSameEmail) {
                return reject({
                    success: false,
                    message: 'User with the same email already exist.',
                    error: 'User with the same email already exist.',
                });
            }
            let newUser = new UserModel({
                email: user.email,
                name: user.name,
                password: user.password,
            });
            await newUser.save();
            newUser = newUser.toJSON();
            delete newUser.password;
            resolve(newUser);
        } catch (e) {
            console.error(e);
            reject(e);
        }
    };
    return new Promise(promiseFunction);
}
async function updateUser(user) {
    const promiseFunction = async (resolve, reject) => {
        try {
            const isUserExist = await UserModel.findOne({ _id: user._id }).exec();
            if (!isUserExist) {
                return reject({
                    success: false,
                    message: 'No such user found.',
                });
            }

            const update = {
                name: user.name,
                email: user.email,
            };
            if (user.name) {
                update.name = user.name;
            }
            if (user.email) {
                update.email = user.email;
            }
            await UserModel.findByIdAndUpdate(user._id, update).lean().exec();
            resolve({ success: true, message: 'User Updated Successfully' });
        } catch (e) {
            console.error(e);
            reject(e);
        }
    };

    return new Promise(promiseFunction);
}

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
};
