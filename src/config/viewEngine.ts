import express from "express"; // cú pháp khác tương đương: var express = require('express');

let configViewEngine = (app: express.Express) => {
    app.use(express.static("./src/public"));//Thiết lập thư mục tĩnh chứa images, css,..
    app.set("view engine", "ejs"); //thiết lập viewEngine
    app.set("views", "./src/views") // thư mục chứa views
}

export default configViewEngine; //xuất hàm ra





