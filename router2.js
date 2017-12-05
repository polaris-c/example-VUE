/* 2017.12.4
 * VUE-router
 * 使用多个<router-view>时，用components属性，而不是component。
 * components中template内的变量定义在与template同级的data:function(){}中。
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
	    				<hr>
	    				<h3> Home sidebar</h3>
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
    			template: '#userSidebarTPL',
    			data: function() {
    				return {
    					navClass: 'nav nav-pills nav-stacked'
    				}
    			} 
    		},
    		content: {
    			template: '#userContentTPL'
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
    		},

    		{
    			path: 'three',
    			component: {
    				template: `
    					<div>
    						This is 3-THREE module<br>
    						function 3A<br>
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
	var loggedIn = true;

	//console.log('beforeEach--to.matched:', to.matched);
	//console.log('beforeEach--from:', from);

	if(!loggedIn && to.matched.some(function(item){
		//console.log('beforeEach--item:', item);
		//console.log('beforeEach--item.meta.loginRequired:', item.meta.loginRequired);
		
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
		btnClass: 'btn btn-default',
		activeFlag: {
			activeFlag0: true,
			activeFlag1: false,
			activeFlag2: false
		}
		// activeFlag0: false,
		// activeFlag1: false,
		// activeFlag2: false
	},
	methods: {
		loginFun: function(){
			loginFlag = !loginFlag;
			console.log('loginFlag:',loginFlag);
		},		
		clickNav: function(activeFlagNum){
			//console.log('activeFlagNum:', activeFlagNum);
			for(flag in this.activeFlag) {
				this.activeFlag[flag] = false;
			}
			this.activeFlag[activeFlagNum]= true;
		}
	}
});