/**
 * Created by dianying-h5 on 2017/6/22.
 */
const UTILE = require("./utileJS");


/*
 * insert SQL 插入語句
 * name 表名
 * field 字段名
 * value 字段值
 * */
let insert = (name, obj) => {
    let field = UTILE.objToKey(obj),
        value = UTILE.objToVal(obj);
    return `INSERT INTO ${name} (${field}) VALUES (${value})`
};

/*
 * selected SQL查询语句
 * name 表名
 * field 字段
 * condition 查询条件
 * */
let selected = (name, obj) => {
    let field = UTILE.objToKey(obj),
        condition = UTILE.objToValKey(obj);
    if (condition)
        return `SELECT ${field} FROM ${name} WHERE ${condition}`;
    return `SELECT '${field}' FROM ${name}`;
};

/*
 * upData 更新语句
 * name 表名
 * condition 条件
 * data 需要更新的数据
 * */
let upData = (name, obj,condition) => {
    let data = UTILE.objToValKey(obj);
    return `UPDATE ${name} SET  ${data} WHERE ${condition} LIMIT 1;`
};

/*
 * del 删除语句
 * name 表名
 * condition 条件
 * */
let del = (name, condition) => {
    return `DELETE FROM ${name} WHERE ${condition}`
};

/*
 * drop 删除 已删除1个月的帖子帖子(表);
 * name 表名
 * */
let drop = (name) => {
    return `DROP TABLE ${name}`
};

/*
 * crta 创建表
 * name 表名
 * field 字段名
 * */
let crta = (name, field) => {
    return `CREATE TABLE ${name} (${field})`
};

const SQLS = {
    insert: insert,
    selected: selected,
    updata: upData,
    del: del,
    drop: drop,
    create: crta
}
module.exports = SQLS;

