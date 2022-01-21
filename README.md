# taro-react

使用 taro 的测试

自动更新 测试服 体积会比较大, 一般会超出2m大小, 没法在手机上编译调试, 一般在开发者工具上调试完执行下面的命令进行真机调试
taro build --type weapp --watch

自动更新并压缩 正式服 热更新有问题而且比较慢, 不建议在这个模式下开发调试
NODE_ENV=development taro build --type weapp --watch
NODE_ENV=production taro build --type weapp --watch

react + ts + redux 
代码校验：eslint + prettier + stylelint + husky + lint-staged

ahook
https://ahooks.js.org/zh-CN/hooks/async

不推荐使用lodash, 
https://juejin.cn/post/6982528135384268808

uuid 
用不了, 报错 Unhandled promise rejection Error: secure random number generation not supported by this browser
use chrome, FireFox or Internet Explorer 11