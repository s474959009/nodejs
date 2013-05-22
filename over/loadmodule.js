//loadmodule.js

var hello1 = require('./module');
hello1.setName('a');
#hello1.sayHello();

var hello2 = require('./module');
hello2.setName('b');
#hello2.sayHello();

hello1.sayHello();
