/* 2017.12.2
 * VUE-router
 */

var routerMain = [
	{
	    path:'/',
	    component: {
	    	template: `
	    		<div>
	    			<h1> Home </h1>
	    		</div>
	    	`
	    }
	},
	{
	    path: '/about',
	    component: {
	    	template: `
	    		<div>
	    			<h1> About </h1>
	    		</div>
	    	`
	    }
	},
	{
	    path: '/user/:name',
	    name: 'user',
	    component: {
	    	template: `
	    		<div>
	    			<h3> My name is: {{ $route.params.name }} </h3> 
	    			<router-link :to = "'/user/' + $route.params.name + '/more'" ><button class = "btn btn-default">More $route</button></router-link>
	    			<router-link to = "more" append><button class = "btn btn-default">More append</button></router-link>	    			
	    			<hr>
	    			<router-view></router-view>
	    		</div>
	    	`
	    },      //  <div> my age: {{ $route.query.age }}</div>
	    children: [
	    	{
	    		path: 'more',
	    		component: {
	    			template: `
	    				<div>
	    				    VUE-嵌套路由
	    				    <br>
	    					User name: {{ $route.params.name }}
	    					<br>
	    					123 456 789
	    				</div>
	    			`
	    		}
	    	}
	    ]
	}
];

var router = new VueRouter({
	routes: routerMain,
});

new Vue({
	el: '#appvr1to4',
	router: router,
	methods: {
		surf: function(){
			setTimeout(function(){
				this.router.push('/about');

				setTimeout(function(){
					this.router.push({name: 'user', params: {name: 'BUPT'}});
				}, 2000)

			}, 2000)
		}
	}
});