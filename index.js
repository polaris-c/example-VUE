'use strict';

var app1 = new Vue({
	el: '#app1',
	data: {
		name:'ABC',
		age: '20',
	    sex: ''
	}
});

var app2 = new Vue({
    el: '#app2',
    data: {
    	//list:['c-ong','j-iang','s-uan'],
    	list: [
    	  {
    	  	name: 'c-ong',
    	  	price: 100,
    	  	discount: 0.8
    	  },
    	  {
    	  	name: 'j-iang',
    	  	price: 200,
    	  	discount: 0.8    	  	
    	  },
    	  {
    	  	name: 's-uan',
    	  	price: 300,
    	  	discount: ''
    	  }
    	]
    }
});

var app3 = new Vue({
	el: '#app3',
	data: {
		URL: 'http://www.baidu.com',
		URL2: '',
		//img: 'D:\Code\Git\learnVUE\IMG_20170826_143518_01.jpg',
		btnClass: 'btn btn-default',
		isActive: true
	}
});

var app4 = new Vue({
    el: '#app4',
    data: {
    	btnClass: 'btn btn-default'
    },
    methods: {
    	onclick: function(){
    		console.log('Click!');
    	},
    	onEnter: function(){
    		console.log('Enter!');
    	},
    	onLeave: function(){
    		console.log('Leave!');
    	},
    	onSubmit: function(e){
    		e.preventDefault();
    		console.log("Submit!" + e);
    	},
    	onKeyup: function(){
    		console.log("Keyup!");
    	}
    }
});

var app5 = new Vue({
	el: '#app5',
	data: {
		name: '123',
		age: 20
	},
	methods: { }
});

var app6 = new Vue({
	el: '#app6',
	data: {
		sex: 'female',
		sexualPreference: [],
		article: 'AAABBBCCC',
		from: '02',
		dest: []
	},
	methods: { }
});

var app7 = new Vue({
	el: '#app7',
	data: {
		role: 'superAdmin'
	},
	methods: { }
});

var app8 = new Vue({
	el: '#app8',
	data: {
		math: 88,
		physics: 80,
		english: 95,
	},
	methods: { 
		check: function(){
		    var re = /^\d+$/;   //判断字符串是否为正整数 
　　        if (!re.test(this.math) || !re.test(this.physics) || !re.test(this.english)) { 
　　　　         console.log("请输入数字"); 
　　        }
            else {
            	return true;
            }
		}
	},
	computed: {
		sum: function() {
			return parseFloat(this.math) + parseFloat(this.physics) + parseFloat(this.english);
		},
		ave: function(){
			return Math.round(this.sum/3);
		}
	}
});