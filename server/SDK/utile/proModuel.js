/**
 * Created by jiutian on 2017/6/26.
 */

const SQL = require('mysql')//引入mysql库
const SQLUITLE = require('./sqls')//引入封好的SQL语句
const utile = require('./utileJS')
const _ = require('lodash')

//数据库的配置信息
let conn = SQL.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'jiutian',
    port: 3306
})

/*
 * 数据库操作语句
 * */
let userReg = (obj, fn) => {
    /*注册语句
     * obj.id 生成
     * obj.name 用户名
     * obj.sex 性别
     * obj.address 地址
     * obj.tel 手机号
     * obj.password 用户密码
     * obj.follow 关注
     * obj.unread 未读
     * obj.reply 帖子所在表
     * obj.img 头像
     * obj.reg_time 注册时间
     * */
    conn.connect()// 打开数据库
    // let sentence = UTILE.objToStr(obj);
    let promise = new Promise((resolve, reject) => {
        conn.query(SQLUITLE.selected('user', {name: obj.name}), function (err, roow, felds) {
            // console.log(roow);
            resolve(roow)
        })
    })
    promise.then((data) => {
        if (data == 0) {
            SQL.createConnection({multipleStatements: true})
            let create = 'content varchar(255),ctime varchar(255),floor1 int,floor2 int,unread varchar(1),pointer varchar(255)'
            obj['reply'] = obj.name
            conn.query(SQLUITLE.insert('user', obj), function (err, roow, felds) {
                console.log(err)
                if (!err) {
                    conn.query(SQLUITLE.create(obj.reply, create), function (err, roow, felds) {
                        conn.end()
                        if (!err) {
                            console.log('注册成功')
                            // fn("注册成功");
                        }
                    })
                }
            })
        } else {
            console.log('注册失败')
            // fn("注册成功");
        }
    })
}

// userReg({name: "九天", sex: 1});

let createPost = (obj, fn) => {
    /* 发帖语句
     * obj.title 帖子的名字
     * obj.content 帖子内容
     * obj.creater 发帖人
     * obj.ctime 发帖时间
     * */
    conn.connect()
    let userTable = ''//用户帖子表
    let postName = ''//
    let promise = new Promise((resolve, reject) => {
        let SQLyu = 'content varchar(255),floor1 int(11),floor2 int(11),time varchar(255), creater varchar(255), ecreater varchar(255),del varchar(1)'
        postName = 'A' + obj.title + obj.ctime;
        let tag = 0;
        conn.query(SQLUITLE.create('??', SQLyu), [postName, SQLyu], function (err, roow) {
            if (!err) {
                tag++;
                if (tag === 2)
                    resolve()
            } else {
                reject(err)
            }
        })
        conn.query('select * from user where (name=\'' + obj.creater + '\')', [], function (err, roow) {
            if (roow != 0) {
                tag++;
                userTable = utile.SQLDataForm(roow)['reply'];
                if (tag === 2) resolve()
            } else reject(err)

        })
    })
    promise.then(() => {
        let userObj = {},
            indexObj = {},
            tag = 0;
        obj.pointer = postName;
        Object.assign(indexObj, obj);
        Object.assign(userObj, obj);

        userObj.floor1 = 1;
        userObj.floor2 = 0;

        delete userObj.title;
        delete userObj.creater;
        delete indexObj.floor1;
        delete indexObj.floor2;
        if (userTable) {
            conn.query(SQLUITLE.insert(userTable, userObj), function (err, roow) {
                if (!err) {
                    tag++;
                    if (tag === 2) {
                        console.log('发帖成功')
                    }
                }
            })
            conn.query(SQLUITLE.insert('indexes', indexObj), function (err, roow) {
                if (!err) {
                    tag++;
                    if (tag === 2) {
                        console.log('发帖成功')
                    }
                }
            })
            conn.end()
        }
    })
    promise.catch(function (err) {
        // fn(发帖失败)
        conn.end()
    })
}
// createPost({title: "测试帖", ctime: "323", creater: "九天"});

let UserPost = (obj, fn) => {
    /*
     * 用户发帖
     * obj.tableName
     * obj.id 帖子indexes表里的ID
     * obj.creater 回复人
     * obj.ecreater 被回复人
     * obj.floor1 如果为空是一级回复否者是二级回复
     * */
    let Num = 0,//楼层总数
        ecreaterTable = '',
        createrTable = '',
        pointer = ''
    let promise = new Promise((resolve, reject) => {
        //获取楼层数
        let tag1 = obj.ecreater ? 5 : 4
        let tag = 0
        if (obj.floor1) {
            conn.query(`SELECT max(floor2) FROM ?? WHERE floor1=?`, [obj.tableName, obj.floor1], function (err, roow) {
                if (!err) {
                    obj.floor2 = utile.SQLDataForm(roow)['max(floor2)'] + 1
                    // conn.end()
                    tag++
                    if (tag === tag1) resolve()
                }
            })
        } else {
            conn.query(`SELECT max(floor1) FROM ??`, [obj.tableName], function (err, roow) {
                if (!err) {
                    obj.floor1 = utile.SQLDataForm(roow)['max(floor1)'] + 1
                    obj.floor2 = null
                    // conn.end()
                    tag++
                    if (tag === tag1) resolve()
                }
            })
        }
        //获取总共的楼层数
        if (tag1 === 5) {
            conn.query(`SELECT count(*) FROM ?? `, [obj.tableName], function (err, roow) {
                if (!err) {
                    Num = Number(utile.SQLDataForm(roow)['count(*)']) + 1;
                    tag++
                    if (tag === tag1) resolve()
                }

                // conn.end()
            })
        }
        //获取被回复人的帖子
        conn.query(`SELECT reply FROM user where name=?`, [obj.ecreater], function (err, roow) {
            if (!err) {
                ecreaterTable = utile.SQLDataForm(roow)['reply']
                // conn.end()
                tag++
                if (tag === tag1) resolve()
            }
        })
        //获取回复人的帖子
        conn.query(`SELECT reply FROM user where name=?`, [obj.creater], function (err, roow) {
            if (!err) {
                createrTable = utile.SQLDataForm(roow)['reply']
                // conn.end()
                tag++
                if (tag === tag1) resolve()
            }
        })
        //获取内容所在的帖子
        conn.query(`SELECT pointer FROM indexes where id=? `, [obj.id], function (err, roow) {
            if (!err) {
                pointer = utile.SQLDataForm(roow)['pointer']
                // conn.end()
                tag++
                if (tag === tag1) resolve()
            }
        })
    })
    promise.then(() => {
        let userPost = {
            content: obj.content,
            ctime: obj.time,
            floor1: obj.floor1,
            floor2: obj.floor2,
            unread: 1,
            pointer: obj.tableName
        }
        let indexTable = {
            id: obj.id,
            floor_num: Num,
            etime: obj.time,
            ecreater: obj.creater
        }
        let table = {
            content: obj.content,
            floor1: obj.floor1,
            floor2: obj.floor2,
            time: obj.time,
            creater: obj.creater,
            creater: obj.ecreater,
            del: 0
        }
        //回复人的帖子
        let tag = 0
        conn.query(SQLUITLE.insert(createrTable, userPost), function (err, roow) {
            console.log(SQLUITLE.insert(createrTable, userPost))
            // conn.end()
            if (!err) {
                tag++
                console.log(1)
                if (tag === 4) console.log('发帖成功')
            }
        })
        //被回复人的帖子
        conn.query(SQLUITLE.insert(ecreaterTable, userPost), function (err, roow) {
            // conn.end()
            if (!err) {
                tag++
                if (tag === 4) console.log('发帖成功')
            }
        })
        //主帖子或者说目录帖子
        conn.query(SQLUITLE.updata("indexes", indexTable, 'id=' + obj.id), function (err, roow) {
            // conn.end()
            if (!err) {
                tag++
                if (tag === 4) console.log('发帖成功')
            }
        })
        //内容所在的帖子
        conn.query(SQLUITLE.insert(pointer, table), function (err, roow) {
            // conn.end()
            if (!err) {
                tag++
                if (tag === 4) console.log('发帖成功')
            }
        })
    })
};

// UserPost({tableName: 'A测试帖15246', id: 4, content: '我是第一个回复', floor1: 4, time: '1246498', ecreater: '九天', creater: '2'})

let selectIndex = (obj, fn) => {
    /*
     * 首页帖子查询
     * obj.page 页数
     * obj.limit 条数
     * */
    let promise = new Promise(() => {
        conn.connect();
        let limit = obj.limit || 20,
            page = (obj.page - 1) * limit;
        conn.query(`SELECT * FROM indexes WHERE del is NULL order by etime DESC LIMIT ?,?`, [page, limit], (err, roow) => {
            console.log(utile.SQLDataForm(roow));
        })
    })
};
// selectIndex({page:2,limit:3});
let selectUser = (obj, fn) => {
    /*用户帖子查询
     * obj.creater 用户名
     * obj.page
     * obj.limit
     * obj.unread 0是未读 1是已读
     * */
    let {limit, page, unread, creater} = obj;
    page = limit * (page - 1)
    conn.connect();
    //未读消息
    conn.query("SELECT * FROM ?? WHERE unread=? LIMIT ?,?", [creater, unread, page, limit], (err, roow) => {
        console.log(utile.SQLDataForm(roow));
    })

};
// selectUser({creater: '九天', page: 1, limit: 3, unread: 0})

let selectPost = (obj, fn) => {
    /*
     * 主帖子查询帖子详情查询
     * obj.post
     * obj.floor 判断是一级还是二级 默认一级 0是一级 1是二级
     * */
    conn.connect();
    if(obj.floor){
        conn.query("SELECT * FROM ?? WHERE floor2!=? LIMIT ?,?",["a测试帖15246",1,1,5],(err, roow)=>{
            console.log(roow)
        })
    }

};
selectPost()



