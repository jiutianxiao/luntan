/**
 * Created by dianying-h5 on 2017/7/12.
 */

const SQL = require('mysql');//引入mysql库
const utile = require("./utile/utileJS");


//数据库的配置信息
let conn = SQL.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'luntan',
    port: 3306
})
SQL.createConnection({multipleStatements: true})//多数据库语句操作

//帖子 首页列表
let selectIndex = (data) => {
    /*
     * page, limit, where
     * 页码  条数    查询条件
     * 页面省略的话那么默认为第一页
     * 条数省略的话 默认20条
     * 查询条件可以省略
     *
     * */
    let {page, limit, where} = data;
    limit = limit ? limit : 20;
    page = page ? (page - 1) * limit : 0;
    if (typeof where === "object") where = `where ${utile.SQLAND(where)}`;
    else where = "";
    let readFile = () => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT * FROM list ${where} ORDER BY etime desc LIMIT ?,?`, [page, limit], (err, roow) => {
                if (err) reject(err);
                roow = utile.SQLDataForm(roow);
                resolve(roow);
            })
        })
    };

    let gen = async function () {
        let data = await readFile();
        console.log((data));
        conn.end();
    };
    gen()
};
// selectIndex({page: 1, where: {pid: 1}});


//用户注册
let userReg = (data) => {
    //查询用户是否重复
    let {tel, username} = data;

    let readUser = () => {
        let obj = {};
        if (tel) obj.tel = tel;
        if (username) obj.username = username;
        obj = `where ${utile.SQLor(obj)}`;
        return new Promise((resolve, reject) => {
            conn.query(`SELECT * FROM user ${obj}`, (err, roow) => {
                if (err) reject(err);
                resolve(roow);
            })
        })
    };

    //用户注册
    let regUser = () => {
        let keys = Object.keys(data).join(",");
        let values = Object.values(data).join(",");
        return new Promise((resolve, reject) => {
            conn.query(`INSERT INTO user (${keys}) VALUES (${values})`, (err, roow, flie) => {
                // conn.end();
                if (err) reject(err);
                resolve(err);
            })
        })

    };
    let gen = async () => {
        console.log((await readUser()).length);
        let select = await readUser();
        if (!(select.length)) {
            if ((await regUser()) === null) {
                console.log("注册成功");
            }
        } else {
            let data = utile.SQLDataForm(select)[0];
            if(data.username===username){
                console.log("用户名重复");
            }else {
                console.log("手机号重复");
            }
        }
        conn.end();
    };
    gen()
};
userReg({username: 3, tel: 3});






