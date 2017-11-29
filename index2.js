/* 2017.11.29  ZSY
 * 组件 全局与局部  
 * Vue.component自定义标签需要放置在new Vue({ })定义的域中，即el:'#id'标签中
 * new Vue({ }) components中的组件是局部组件
 * 组件的data中定义的class可以通过v-bind在模板中起作用，new Vue({ })的data中定义的class对组件无效
 * Vue.component('name', { }); 可以写成 var nameComponent = { }; 的形式
 */

// Vue.component('alert', {
// 	template: '<button @click = "onClick" value = "TEST1">test1</button>',
// 	methods: {
// 		onClick: function() {
// 			console.log('Test1');
// 		}
// 	}
// });

var alertComponent = {
	template: '<button :class = "btnClass" @click = "onClick" value = "TEST1">test1</button>',
	data: function() {
		return {
			btnClass: 'btn btn-default'
		}
	},
	methods: {
		onClick: function() {
			console.log('app9 Test1');
		}
	}
};

new Vue({
	el : "#app9",
    components: { 
    	alert: alertComponent  // 
    },		
	data: { 
		btnClass: 'btn btn-default' // Useless!!!
	},
	methods: { }
});

/*************************************************************************
 * 配置组件
 * template:'#id'是将组件模板放置在html页面中
 */
// Vue.component('like', {
// 	template: '#likeComponentTPL',
// 	data: function(){
// 		return {
// 			likeCount: 10,
// 			liked: false
// 		}
// 	},
// 	methods: {
// 		toggleLike: function() {
// 			if(!this.liked) {
// 				this.likeCount ++;
// 			}
// 			else {
// 				this.likeCount --;
// 			}
// 			this.liked = !this.liked; 
// 		}
// 	}
// });

var likeComponent = {
	template: '#likeComponentTPL',
	data: function(){
		return {
			likeCount: 10,
			liked: false,
			//btnClass: 'btn btn-default'
		}
	},
	methods: {
		toggleLike: function() {
			if(!this.liked) {
				this.likeCount ++;
			}
			else {
				this.likeCount --;
			}
			this.liked = !this.liked; 
			console.log('app10 likeCount');
		}
	}
};

new Vue({
	el: '#app10',
    components: { 
    	like: likeComponent
    },	
	data: {
	}
});

/*************************************************************************
 * 父->子 组件通信
 * <alert> --msg--> <button>
 * <user>  --username--> <button>
 */
var alertComponent = {
	template: '<button :class = "btnClass" @click = "onClick" value = "TEST2">test2</button>',
	props: ['msg'],
	data: function() {
		return {
			btnClass: 'btn btn-default'
		}
	},
	methods: {
		onClick: function() {
			console.log(this.msg + ' * ALERT * ');
		}
	}
};

var userComponent = {
	template: '<button :class = "btnClass"><a :href = "\'/user/\' + username">@ {{ username }}</a></button>',
	props: ['username'],
	data: function() {
		return {
			btnClass: 'btn btn-default'
		}
	},
	methods: { }
};

new Vue({
	el : "#app11",
    components: { 
    	alert: alertComponent,
    	user: userComponent
    },		
	data: { 
		btnClass: 'btn btn-default' // Useless!!!
	},
	methods: { }
});

/*************************************************************************
 * 子->父 组件通信
 */
Vue.component('balance',{
 	template:`
 	<div>
 	    <show @showBalance = "showBalanceFun"></show>
 	    <div v-if = "showBalanceFlag" >余额：$666  {{ residue }}</div>
 	</div>
 	`,
    data: function(){
    	return {
    		showBalanceFlag: false,
    		residue: 9999
    	}
    },
    methods:{
    	showBalanceFun: function(data){
    		this.showBalanceFlag = true;
    		console.log('data a:', data.a, '***', 'data b:', data.b);
    	}
    } 	
});

Vue.component('show',{
    template:'<button @click = "onClick()">显示余额</button>',
    methods:{
    	onClick: function(){
    		this.$emit('showBalance', {a: 1, b: 2});  //触发自定义事件showBalance
    	}
    }
});

new Vue({
	el:'#app12',
});