import db from '../models/index'; //import database
import CRUDService from '../services/CRUDService' //import service
import { Request, Response } from 'express';

//hàm getHomePage
let getHomePage = async (req: Request, res: Response) => {
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
let getAboutPage = (req: Request, res: Response) => {
    return res.render('test/about.ejs');
}

//hàm CRUD
let getCRUD = (req: Request, res: Response) => {
    return res.render('crud.ejs');
}

//hàm findAll CRUD
let getFindAllCrud = async (req: Request, res: Response) => {
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
let postCRUD = async (req: Request, res: Response) => { //dung async đê xư ly bat đong bo
    let message = await CRUDService.createNewUser(req.body); //gọi service
    //console.log(req.body); //lấy thông tin body của http request
    console.log(message);
    return res.send('Post crud to server');
}

//hàm lấy dư lieu de edit
let getEditCRUD = async (req: Request, res: Response) => {
    let userId = req.query.id as string;
    if(userId){ //check Id
        let userData = await CRUDService.getUserInfoById(Number(userId));
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
let putCRUD = async (req: Request, res: Response) => {
    let data = req.body;
    let data1 = await CRUDService.updateUser(data); //update rồi hien thi lai danh sach user
    //let data1 = await CRUDService.getAllUser(); //hien thi danh sach user
    return res.render('users/findAllUser.ejs', {
        datalist: data1
    });
    // return res.send('update thanh cong');
}

//hàm deleteCRUD
let deleteCRUD = async (req: Request, res: Response) => {
    let id = req.query.id as string; //vi tren view ?id=1
    if(id){
        await CRUDService.deleteUserById(Number(id));
        return res.send('Deleted!!!!!!!!!!!!!!');
    }else{
        return res.send('Not find user')
    }
}

//export ra object
export default {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    getFindAllCrud: getFindAllCrud,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD
}



