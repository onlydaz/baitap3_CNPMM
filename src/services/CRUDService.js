import bcrypt from 'bcryptjs'; //import thu vien bcryptjs
import db from '../models/index'; //Import database

const salt = bcrypt.genSaltSync(10); // thuat toan hash password

let createNewUser = async (data) => { //ham tao user voi tham so data
    return new Promise(async (resolve, reject) => { //dung Promise dam bao luon tra ket qua, trong xir ly bat dong bo
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);

            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId
            });

            resolve('OK create a new user successful!'); 
            // console.log('data from service'); 
            // console.log(data) //log du lieu tu bien data
            // console.log(hashPasswordFromBcrypt);
        } catch (e) {
            reject(e);
        }
    });
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => { //dung Promise dam bao luon tra ket qua, trong xir ly bat dong bo
        try {
            let hashPassword = await bcrypt.hashSync("B4c0/\/", salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    });
}

//lay tat ca findAll CRUD
let getAllUser = () => {
    return new Promise(async (resolve, reject) => { //dung Promise dam bao luon tra ket qua, trong xir ly bat dong bo
        try {
            let users = await db.User.findAll({
                raw: true, //hien du lieu goc
            });
            resolve(users); //ham tra ve ket qua
        } catch (e) {
            reject(e);
        }
    });
}

//lay findone CRUD
let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => { //dung Promise dam bao luon tra ket qua, trong xir ly bat dong bo
        try {
            let user = await db.User.findOne({
                where: { id: userId }, //query dieu kien cho tham so
            });
            if(user){
                resolve(user); //ham tra ve ket qua
            }else{
                resolve([]); //ham tra ve ket qua rong
            }
        } catch (e) {
            reject(e);
        }
    });
}

//ham put CRUD
let updateUser = (data) => {
    return new Promise(async (resolve, reject) => { //dung Promise dam bao luon tra ket qua, trong xir ly bat dong bo
        try {
            let user = await db.User.findOne({
                where: { id: data.id } //query dieu kien cho tham so
            });
            if(user){
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                await user.save();
                //lay danh sach user
                let allusers = await db.User.findAll();
                resolve(allusers); //ham tra ve ket qua
            }else{
                resolve([]); //ham tra ve ket qua rong
            }
        } catch (e) {
            reject(e);
        }
    });
}

//delete CRUD
let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => { //dung Promise dam bao luon tra ket qua, trong xir ly bat dong bo
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            });
            if(user){
                user.destroy();
            }
            resolve(); //la return
        } catch (e) {
            reject(e);
        }
    });
}

module.exports = { //xuat ham ra ben ngoai
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUser: updateUser,
    deleteUserById: deleteUserById
}