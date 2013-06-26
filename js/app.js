requirejs.config({
	//默认相对"js/lib"解析模块ID
	baseUrl: 'js/lib',
	//如果模块ID以"app"开始，会相对js/app目录解析，path config是相对 baseUrl 解析的，而且不用包含".js"，因为 path config 指向的可能是目录
	paths: {
		app: '../app',
		jquery: 'jquery-1.8.3.min'
	}
});


require(['app/selector'], function(a) {
    a("a");
});
