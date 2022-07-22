import db from "../models/index";
import crudServices from "../services/crudServives";
let getHomepage = async(req, res) => {
    try {
        let data = await db.User.findAll();
        console.log(data);
        return res.render("homepage.ejs", {
            data: JSON.stringify(data),
        });
    } catch (e) {
        console.log(e);
    }
};
let getCrud = (req, res) => {
    return res.render("CrudTest.ejs");
};
let PostCrud = async(req, res) => {
    let message = await crudServices.createNewUser(req.body);
    console.log(req.body);
    console.log(message);

    return res.send("đã test xong");
};
let GetCrudTest = async(req, res) => {
    // lấy data user
    let dataABC = await crudServices.getAllUser();
    console.log(dataABC);
    return res.render("getDisplayData.ejs", {
        // truyển dữ liệu để bên views só thể thấy được
        dataRender: dataABC,
    });
};

let EditCrudTest = async(req, res) => {
    // hàm sửa data
    let userId = req.query.id;
    // check xem có id ko
    if (userId) {
        let userBase = await crudServices.getUserInfoById(userId);

        console.log(userBase);
        return res.render("editData.ejs", {
            // truyền user qua file views
            user: userBase,
        });
    } else {
        // return res.send("can not found user");
    }
};

let PutCrudTest = async(req, res) => {
    let data = req.body;
    let allUser = await await crudServices.UpdateUserInfor(data);
    return res.render("getDisplayData.ejs", {
        dataRender: allUser,
    });
};

let DelCrud = async(req, res) => {
    let id = req.query.id;
    if (id) {
        await crudServices.deleteUserId(id);
        return res.send("delete user");
    } else {
        res.send("user not found");
    }
};

module.exports = {
    getHomepage: getHomepage,
    getCrud: getCrud,
    PostCrud: PostCrud,
    GetCrudTest: GetCrudTest,
    EditCrudTest: EditCrudTest,
    PutCrudTest: PutCrudTest,
    DelCrud: DelCrud,
};