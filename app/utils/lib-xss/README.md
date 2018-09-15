# lib-xss
防止xss攻击的一个模块

## 安装
```
  npm install @zbj/lib-xss --save
```

## 说明
1. 对express的参数进行了过滤，params、query、body三种参数类型都进行了过滤。应该在自定义的路由之前引入此模块。
2. 过滤的安全字符有<>'"\\5个，转义为对应的实体字符编码。
3. 对于params参数，由于转义过后的实体字符编码包含#，将会把#后面的内容处理为hash值，所以在params遇到敏感字符时，将会直接抛出错误。
4. 对于富文本类容的参数，规定参数名必须以html(忽略大小写)结尾，对于以html结尾的参数名，进行了[js-xss](https://github.com/leizongmin/js-xss)白名单过滤

## 使用
### 参数说明
  config参数的配置，主要是配置js-xss。对富文本类型(参数名以html结尾)的参数进行过滤。js-xss的配置详见[js-xxx document](https://github.com/leizongmin/js-xss/blob/master/README.zh.md)。不传config时，默认配置为：
```
  //默认配置，删除不在白名单中的标签和属性
  var DEFAULT_CONFIG={
      stripIgnoreTag:true,
      stripIgnoreTagBody:true
  }
```
### 使用实例
#### 参数为空
``` javascript
  var app = express();
  var xss = require('@zbj/lib-xss')();
  app.use(xss);
```
#### 参数不为空
``` javascript
  var app = express();
  var config = {
     whiteList: {
      a: ['href', 'title', 'target']
    }
  }
  var xss = require('@zbj/lib-xss')(config);
  app.use(xss);
```
此事例将会删除不在白名单中的标签和属性。
#### xss方法调用
- req.xss.unescape 解码
- req.xss.escape  编码

``` javascript
    router.get('path',function(req, res, next){
        var str = req.xss.unescape(req.query.param_1);
        ...
    })
```
## 版本
- v0.0.3
  - 在req对象上新增xss对象 
- v0.0.2