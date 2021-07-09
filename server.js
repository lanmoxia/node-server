var http = require("http"); // 引入 http 模块，用来创建 http 服务器
var fs = require("fs"); // 引入 fs 模块，用来访问文件系统
var url = require("url"); // 引入 url 模块，用来解析 url
var port = process.argv[2]; // 拿到执行此脚本命令的第二个参数（即为 port），如 node server.js 8888，port = 8888

if (!port) {
  console.log("请指定端口号好不啦？\nnode server.js 8888 这样不会吗？");
  process.exit(1);
}

var server = http.createServer(function(request, response) {
  // 解析 url 拿到解析后的对象，形如 parsedUrl 图（见下文）
  var parsedUrl = url.parse(request.url, true);
  // 带 query 的 path，见下文 pathWithQuery
  var pathWithQuery = request.url;
  var queryString = "";
  // 判断是否带 query
  if (pathWithQuery.indexOf("?") >= 0) {
    // 带 query 的话则拿到它
    queryString = pathWithQuery.substring(pathWithQuery.indexOf("?"));
  }
  var path = parsedUrl.pathname;
  var query = parsedUrl.query;
  // 拿到请求方法
  var method = request.method;

  /******** 从这里开始看，上面不要看 ************/
  
  // 命令行打印日志
  console.log("有个傻子发请求过来啦！路径（带查询参数）为：" + pathWithQuery);
  
  // 处理 / 路由
  if (path === "/") {
    // 设置响应状态码为 200
    response.statusCode = 200;
    // 设置响应头 content-type 字段
    response.setHeader("Content-Type", "text/html;charset=utf-8");
    // 设置响应体内容
    response.write(`
    <!DOCTYPE html>
    <link rel="stylesheet" href="/style.css" >
    <h1>你好</h1>
    `);
    // 结束并响应请求
    response.end();
    // 处理 /style.css 路由
  } else if (path === "/style.css") {
    // 同理，不过由于是 css 类型文件，故头部字段 content-type 配置不同
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/css;charset=utf-8");
    response.write(`h1{color: red;}`);
    response.end();
  } else {
    // 兜底，除了上面两种路由，其它路由都走此逻辑
    response.statusCode = 404;
    response.setHeader("Content-Type", "text/html;charset=utf-8");
    response.write(`你访问的页面不存在`);
    response.end();
  }

  /******** 代码结束，下面不要看 ************/
});

// 监听 port 端口，只有执行了此语句才算启动了服务
server.listen(port);
// 命令行打印日志
console.log(
  "监听 " +
    port +
    " 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:" +
    port
);
