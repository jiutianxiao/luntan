/**
 * Created by dianying-h5 on 2017/6/27.
 */
const _ = require('lodash');//方法库

let SQLDataForm = (roow) => {
    /*SQL 返回值 转换成对象
     * */
    // if()
    let ary1=[];
    for (let i=0;i<roow.length;i++) {
        let data = Object.getOwnPropertyNames(roow[i]);
        let ary = {};
        for (let key of data) {
            ary[key] = new String(roow[i][key]).toString();
        }
        ary1.push(ary);
    }

    return ary1
};

let SQLand=(data)=>{
    let str = "";
    _.forEach(data, function (itme, index) {
        str += str ? `&&${index}='${itme}'` : `${index}='${itme}'`
    });
    return str;
}
let SQLor=(data)=>{
    let str = "";
    _.forEach(data, function (itme, index) {
        str += str ? `||${index}='${itme}'` : `${index}='${itme}'`
    });
    return str;
}

module.exports = {
    SQLand,
    SQLDataForm,
    SQLor
};

