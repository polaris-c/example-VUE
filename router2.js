/* 2017.12.4
 * VUE-router
 * 使用多个<router-view>时，用components属性，而不是component。
 * some() 方法用于检测数组中的元素是否满足指定条件（函数提供）； some() 方法会依次执行数组的每个元素。
 * to.matched是数组，其每个元素是路由组件。
 * meta在children子路由里也可以设置。
 */

var routerMain = [
    {
    	path: '/',
    	components: {
    		sidebar: {
	    		template:`
	    			<div>
	    				<h2> Home sidebar</h2>
	    			</div>
	    		`
    		},
    	}
    },
    {
    	path: '/user',
    	meta: {
    		loginRequired: false
    	},
    	components: {
    		
    		sidebar: {
    			template:`
    				<div>
    					<ul>
    						<hr>
    						<li>111</li>
    						<li>222</li>
    						<hr>
    					</ul>
    				</div>
    			`
    		},
    		content: {
    			template: `
    				<div>
    					<hr>
    					<router-link to = 'rain' append>After</router-link>
    					<router-view></router-view><br>
    					************<br>
    					Abstract<br>
    					************<br>
    					This paper addresses the problem of generating possible object lo-cations for use in object recognition. <br>
    					We introduce Selective Search which combines the strength of both an exhaustive search and seg-mentation. <br>
    					Like segmentation, we use the image structure to guide our sampling process. <br>
    					Like exhaustive search, we aim to capture all possible object locations.<br> 
    					<hr>
    				</div>
    			`
    		}
    	},
    	children: [
    		{
    			path: 'rain',
    			meta: {
    				loginRequired: true
    			},
    			component: {
    				template: `
    					<div>
    						<h2>Success! Rain ...</h2>
    					</div>
    				`
    			}
    		}
    	]
    },
    {
    	path: '/login',
    	components: {
    		sidebar: {
    			template:`
    				<div>
    					<ul>
    						<hr>
    						<li>AAA</li>
    						<li>BBB</li>
    						<hr>
    					</ul>
    				</div>
    			`
    		},
    		content: {
    			template: `
    				<div>
    					<hr>
    					************<br>
    					Welcome!<br>
    					Please Enter~<br>
    					************<br>
    					<hr>
    				</div>
    			`
    		}
    	}
    },
];

var router = new VueRouter({
	routes: routerMain
});

var loginFlag = true;

// 路由加载之前
router.beforeEach(function(to, from, next){
	var loggedIn = false;

	console.log('beforeEach--to.matched:', to.matched);
	console.log('beforeEach--from:', from);

	if(!loggedIn && to.matched.some(function(item){
		console.log('beforeEach--item:', item);
		console.log('beforeEach--item.meta.loginRequired:', item.meta.loginRequired);
		
		return item.meta.loginRequired;
	})) {
		console.log('****** dismiss  ******');
		next('/login');
	}

	else {
		console.log('****** permission ******');
		next();
	}
	// if(loginFlag) {
	// 	next();
	// }
	// else {
	// 	next('/login');
	// }
});

// 路由加载完毕
router.afterEach(function(to, from){
    console.log('Success!!!');
})

new Vue({
	el: '#appvr5to7',
	router: router,
	data: {
		btnClass: 'btn btn-default'
	},
	methods: {
		loginFun: function(){
			loginFlag = !loginFlag;
			console.log('loginFlag:',loginFlag);
		}
	}
});