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

    let readFile = () => {
        return new Promise((resolve, reject) => {
            let {page, limit, where} = data;
            limit = limit ? limit : 20;
            page = page ? (page - 1) * limit : 0;
            if (typeof where === "object") where = `where ${utile.SQLAND(where)}`;
            else where = "";
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
        return new Promise((resolve, reject) => {
            let obj = {};
            if (tel) obj.tel = tel;
            if (username) obj.username = username;
            obj = `where ${utile.SQLor(obj)}`;
            conn.query(`SELECT * FROM user ${obj}`, (err, roow) => {
                if (err) reject(err);
                resolve(roow);
            })
        })
    };

    //用户注册
    let regUser = () => {
        return new Promise((resolve, reject) => {
            let keys = Object.keys(data).join(",");
            let values = "'" + Object.values(data).join("','") + "'";
            console.log(`INSERT INTO user (${keys}) VALUES (${values})`);
            conn.query(`INSERT INTO user (${keys}) VALUES (${values})`, (err, roow, flie) => {
                // conn.end();
                if (err) reject(err);
                resolve(err);
            })
        })

    };
    let gen = async () => {
        let select = await readUser();
        if (!(select.length)) {
            if ((await regUser()) === null) {
                console.log("注册成功");
            }
        } else {
            let data = utile.SQLDataForm(select)[0];
            if (data.username === username) {
                console.log("用户名重复");
            } else {
                console.log("手机号重复");
            }
        }
        conn.end();
    };
    gen()
};
// userReg({username: "九天", tel: 13693730889,password:"asd123"});


//用户发帖
let userPost = (data) => {
    let post = (table, data) => {
        return new Promise((resolve, reject) => {
            let dataKeys = Object.keys(data).join(","),
                dataValues = '"' + Object.values(data).join('","') + '"';
            console.log(dataValues);
            conn.query(`INSERT INTO ${table} (${dataKeys}) VALUES (${dataValues})`, (err, roow) => {
                if (err) reject(err);
                resolve(roow)
            })
        });
    };
    let gen = async () => {
        data.pid = data.ctime;
        data.del = 0;
        let listData = Object.assign([], data);
        listData.num = 0;
        listData.etime = data.ctime;

        let postData = Object.assign([], data);
        delete postData.title;
        delete postData.ctime;
        postData.fid = 1;
        postData.cid = 0;

        let userPData = Object.assign([], postData);
        delete userPData.content;
        userPData.unread = 0;
        await post("list", listData);
        console.log(listData);
        await post("post", postData);
        await post("userpost", userPData);
        conn.end()
        console.log("发帖成功");
    };
    gen()
};
let time = new Date().getTime();
// userPost({title: "我是第一个帖子", content: "看看是啥", ctime: time, creater: "九天"});

//用户发帖查询
let userPostSelect = (data) => {
    /*
    *   creater 我的发帖查询
    *   createred 回复我的查询
    *   unread 是否已读
    * */
    let select=(data)=>{
        return new Promise((resolve,reject)=>{
            data=utile.SQLand(data);
            conn.query(`select * from userpost where ${data}`,function (err,roow) {
                if(err)reject(err);
                roow=utile.SQLDataForm(roow);
                resolve(roow);
            })
        })
    };
    let gen=async ()=>{
        let value=await select(data);
        console.log(value);
    };
    gen();
};

// userPostSelect({creater:"九天",unread:1});


//回帖




