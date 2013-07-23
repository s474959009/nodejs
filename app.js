
/**
 * Module dependencies.
 */

var express = require('express'),
	routes = require('./routes'),
	// user = require('./routes/user'),
	http = require('http'),
	path = require('path'),
	MongoStore = require('connect-mongo')(express),
	settings = require('./settings'),
	flash = require('connect-flash');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(flash());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

app.use(express.cookieParser());
app.use(express.session({
	secret: settings.cookieSecret,
	key: settings.db,
	cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
	store: new MongoStore({
		db: settings.db
	})
}));

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// app.get('/', routes.index);
// app.get('/users', user.list);

routes(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


/*

app.set(name, value)：设置 name 的值为 value
app.set('port', process.env.PORT || 3000)：设置端口为 process.env.PORT 或 3000
app.set('views', __dirname + '/views')：设置 views 文件夹为视图文件的目录，存放模板文件，__dirname 为全局变量，存储着当前正在执行脚本所在的目录名。
app.set('view engine', 'ejs')：设置视图模版引擎为 ejs

app.use([path], function)：使用中间件 function，可选参数path默认为"/"
app.use(express.favicon())：connect 内建的中间件，使用默认的 favicon 图标，如果想使用自己的图标，需改为 app.use(express.favicon(__dirname + '/public/images/favicon.ico')); 这里我们把自定义的 favicon.ico 放到了 public/images 文件夹下。
app.use(express.logger('dev'))：connect 内建的中间件，在开发环境下使用，在终端显示简单的不同颜色的日志，比如在启动 app.js 后访问 localhost:3000，终端会输出：

Express server listening on port 3000
GET / 200 21ms - 206b
GET /stylesheets/style.css 304 4ms

数字200显示为绿色，304显示为蓝色。假如你去掉这一行代码，不管你怎么刷新网页，终端都只有一行 Express server listening on port 300


app.use(express.bodyParser())：connect 内建的中间件，用来解析请求体，支持 application/json， application/x-www-form-urlencoded, 和 multipart/form-data。
app.use(express.methodOverride())：connect 内建的中间件，可以协助处理 POST 请求，伪装 PUT、DELETE 和其他 HTTP 方法。
app.use(app.router)：设置应用的路由（可选），详细请参考：http://stackoverflow.com/questions/12695591/node-js-express-js-how-does-app-router-work
app.use(express.static(path.join(__dirname, 'public')))：connect 内建的中间件，设置根目录下的 public 文件夹为静态文件服务器，存放 image、css、js 文件于此。
if ('development' == app.get('env')) {app.use(express.errorHandler());}：开发环境下的错误处理，输出错误信息。



app.get('/', routes.index)：路由控制器，如果用户访问" / "路径，则由 routes.index 来控制，routes/index.js 内容如下：

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};
通过 exports.index 导出 index 函数接口，app.get('/', routes.index) 相当于：

app.get('/', function(req, res){
  res.render('index', { title: 'Express' });
};)

res.render('index', { title: 'Express' })：调用 ejs 模板引擎解析 views/index.ejs（我们之前通过 app.set('views', __dirname + '/views') 设置了模版文件默认存储在 views 下），并传入一个对象作为参数，这个对象只有一个属性 title: 'Express'，即用字符串 Express 替换 views/index.ejs 中所有 title 变量，后面我们将会了解更多关于模板引的内容。




http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
这段代码的意思是创建服务器并监听3000端口，成功后在命令行中显示 Express server listening on port 3000，然后我们就可以通过在浏览器输入 localhost:3000 来访问了。
*/
