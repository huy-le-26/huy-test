import bcrypt from "bcryptjs";
import db from "../models/index";

const salt = bcrypt.genSaltSync(10);

let createNewUser = async(data) => {
    return new Promise(async(resolve, reject) => {
        try {
            // creat 1 người dùng vào db
            let hashPasswordFormBcrypt = await hashUserPassWord(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFormBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phoneNumber,
                gender: data.gender === "1" ? true : false,
                roleid: data.roleId,
            });
            resolve(" thành công");
        } catch (e) {
            reject(e);
        }
    });
};

let hashUserPassWord = (password) => {
    // hàm hash pass
    return new Promise(async(resolve, reject) => {
        try {
            let hash = await bcrypt.hashSync("Password", salt);
            resolve(hash);
        } catch (e) {
            reject(e);
        }
    });
};

let getAllUser = () => {
    // hàm đoc toan bo db user
    return new Promise(async(resolve, reject) => {
        try {
            let users = await db.User.findAll({
                raw: true,
            });
            resolve(users);
        } catch (e) {
            reject(e);
        }
    });
};

let getUserInfoById = (userId) => {
    // hàm lấy dữ liệu từ useId
    return new Promise(async(resolve, reject) => {
        try {
            let users = await db.User.findOne({
                where: { id: userId },
                raw: true,
            });
            if (users) {
                resolve(users);
            } else {
                resolve({});
            }
        } catch (e) {
            reject(e);
        }
    });
};

let UpdateUserInfor = (data) => {
    return new Promise(async(resolve, reject) => {
        // hàm update dữ liệu
        try {
            let user = await db.User.findOne({
                where: { id: data.id },
            });
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;

                await user.save();

                let allUser = await user.findAll();
                resolve(allUser);
            } else {
                reject();
            }
            await user.update({});
        } catch (e) {}
    });
};

let deleteUserId = (id) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({ where: { id: id } });
            if (user) {
                await user.destroy();
            }
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};
module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    UpdateUserInfor: UpdateUserInfor,
    deleteUserId: deleteUserId,
};