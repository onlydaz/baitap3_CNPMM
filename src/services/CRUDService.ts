import bcrypt from 'bcryptjs'; //import thu vien bcryptjs
// @ts-ignore models are JS
import db from '../models/index'; //Import database

const salt = bcrypt.genSaltSync(10); // thuat toan hash password

let createNewUser = async (data: any): Promise<string> => { //ham tao user voi tham so data
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

    return 'OK create a new user successful!';
}

let hashUserPassword = async (password: string): Promise<string> => {
    let hashPassword = await bcrypt.hashSync("B4c0/\\/", salt);
    return hashPassword;
}

//lay tat ca findAll CRUD
let getAllUser = async (): Promise<any[]> => {
    let users = await db.User.findAll({
        raw: true, //hien du lieu goc
    });
    return users; //ham tra ve ket qua
}

//lay findone CRUD
let getUserInfoById = async (userId: number): Promise<any> => {
    let user = await db.User.findOne({
        where: { id: userId }, //query dieu kien cho tham so
    });
    if(user){
        return user; //ham tra ve ket qua
    }else{
        return []; //ham tra ve ket qua rong
    }
}

//ham put CRUD
let updateUser = async (data: any): Promise<any[]> => {
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
        return allusers; //ham tra ve ket qua
    }else{
        return []; //ham tra ve ket qua rong
    }
}

//delete CRUD
let deleteUserById = async (userId: number): Promise<void> => {
    let user = await db.User.findOne({
        where: { id: userId }
    });
    if(user){
        await user.destroy();
    }
}

export default { //xuat ham ra ben ngoai
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUser: updateUser,
    deleteUserById: deleteUserById
}





