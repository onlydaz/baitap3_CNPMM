import db from '../models/index'; //import database
import CRUDService from '../services/CRUDService' //import service

//hàm getHomePage
let getHomePage = async (req, res) => {
    //return res.send('Nguyễn Đư Trương');
    try {
        let data = await db.User.findAll(); //lấy dữ liệu từ models/index
        console.log('.....');
        console.log(data);
        console.log('.....');
        return res.render('homepage.ejs', {
            data: JSON.stringify(data) //trả dữ liệu data vê view
        });
    } catch (e) {
        console.log(e);
    }
}

//hàm getAbout
let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}

//hàm CRUD
let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}

//hàm findAll CRUD
let getFindAllCrud = async (req, res) => {
    let data = await CRUDService.getAllUser();
    // console.log('.....');
    // console.log(data);
    // console.log('.....');
    //return res.send('FindAll crud to server');
    return res.render('users/findAllUser.ejs', {
        datalist: data
    }); //gọi view va truyền dữ liệu ra view
}

//hàm post CRUD
let postCRUD = async (req, res) => { //dung async đê xư ly bat đong bo
    let message = await CRUDService.createNewUser(req.body); //gọi service
    //console.log(req.body); //lấy thông tin body của http request
    console.log(message);
    return res.send('Post crud to server');
}

//hàm lấy dư lieu de edit
let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if(userId){ //check Id
        let userData = await CRUDService.getUserInfoById(userId);
        // console.log('.....');
        // console.log(userData);
        // console.log('.....');
        return res.render('users/edituser.ejs', {
            data: userData
        });
    }else{
        return res.send('khong lay duoc id');
    }
    // console.log(req.query.id);
}

//hàm putCRUD
let putCRUD = async (req, res) => {
    let data = req.body;
    let data1 = await CRUDService.updateUser(data); //update rồi hien thi lai danh sach user
    //let data1 = await CRUDService.getAllUser(); //hien thi danh sach user
    return res.render('users/findAllUser.ejs', {
        datalist: data1
    });
    // return res.send('update thanh cong');
}

//hàm deleteCRUD
let deleteCRUD = async (req, res) => {
    let id = req.query.id; //vi tren view ?id=1
    if(id){
        await CRUDService.deleteUserById(id);
        return res.send('Deleted!!!!!!!!!!!!!!');
    }else{
        return res.send('Not find user')
    }
}

// object: {
//     key: '',
//     value: ''
// }
//export ra object
module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    getFindAllCrud: getFindAllCrud,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD
}