/* 2017.11.29  ZSY
 * 组件 全局与局部  
 * Vue.component自定义标签需要放置在new Vue({ })定义的域中，即el:'#id'标签中
 * new Vue({ }) components中的组件是局部组件
 * 组件component的data中定义的class可以通过v-bind在模板template中起作用，new Vue({ })的data中定义的class对组件无效
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
 * <user>  --username -> <button>
 * template中的表单可以通过v-model绑定值，其值定义在组件component的data中，注意不是任何元素都能用v-model
 * template中也可以直接用{{ }}绑定值，其值也定义在组件component的data中
 * 报错：Component template should contain exactly one root element. 组件模板应该只包含一个根元素
 * 父组件中v-bind绑定的属性可以通过new Vue({ })中的data确定值，并传给子组件
 */

var alertComponent = {
	template: `
    <div>
	    <button :class = "btnClass" @click = "onClick"  value = "TEST2">TEST2</button> 
	    <br>
	    <input type="text" v-model = "test01">
	    <br>
	    input v-model绑定: {{ test01 }}
	    <br>
	    <div> div 直接绑定: {{ test02 }}</div>
    </div>
    `,
	props: ['msg'],
	data: function() {
		return {
			btnClass: 'btn btn-default',
			test01: 'input v-model = "test01"',    // template中的表单通过v-model绑定的值
			test02: '<div> => { {test02} }'
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
			btnClass: 'btn btn-default',
			ZSY: 'v-bind:username = "ZSY"'    // Useless!!!
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
		btnClass: 'btn btn-default',    // Useless!!!
		ZSY: 'v-bind:username="ZSY"'    // 父组件中v-bind绑定的属性值
	},
	methods: { }
});

/*************************************************************************
 * 子->父 组件通信
 * <balance> <--$emit showBalance-- <show>
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
    		console.log('data.a:', data.a, '***', 'data.b:', data.b);
    	}
    } 	
});

Vue.component('show',{
    template:'<button @click = "onClick()">显示余额</button>',
    methods:{
    	onClick: function(){
    		this.$emit('showBalance', {a: 1, b: 2});    //触发自定义事件showBalance
    	}
    }
});

new Vue({
	el:'#app12',
});

/*************************************************************************
 *  组件通信
 * <aone> --Event.$emit('aoneSaidSomething', this.aSaid)--> <bone>
 */

var Event = new Vue();

Vue.component('aone', {	
 	template: `
    <div>
 	    <input type = "text" @keyup = "onChange" v-model = "aSaid"> {{ aSaid }}
 	</div>
 	`,
 	data: function() {
 		return {
 			aSaid: ''
 		}
 	},
 	methods: {
 		onChange: function() {
 			Event.$emit('aoneSaidSomething', this.aSaid);
 		}
 	}
});

Vue.component('bone', {
 	template: `
 	<div>
        b receive aoneSaid:{{ aoneSaid }}
 	</div>
 	`,
 	data: function() {
 		return {
 			aoneSaid: ''
 		}
 	},
 	mounted: function() {
 		var b = this;
 		Event.$on('aoneSaidSomething', function(data){
 			console.log(data);
 			b.aoneSaid = data;
 		});
 	}
});

new Vue({
 	el: "#app13",	
});