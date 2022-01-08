const fs = require('fs');
const path = require('path');

module.exports.camelCase = (name) => {
  return name.replace(/(-\w)/g, (letter) => {
    return letter.substring(1).toUpperCase();
  });
};

module.exports.pascalCase = (name) => {
  let str = name.replace(/(-\w)/g, (letter) => {
    return letter.substring(1).toUpperCase();
  });
  str = str.replace(str[0], str[0].toUpperCase());
  return str;
};

// 递归创建目录 同步方法
module.exports.mkdirsSync = function mkdirsSync(dirname) {
  if (fs.existsSync(dirname)) {
    return true;
  }
  if (mkdirsSync(path.dirname(dirname))) {
    fs.mkdirSync(dirname);
    return true;
  }

  return false;
};
