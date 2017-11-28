	
// Vue.component('alert', {
// 	template: '<button @click = "onClick" value = "TEST1">test1</button>',
// 	methods: {
// 		onClick: function() {
// 			alert('Test1');
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
			console.log('Test1');
		}
	}
};

new Vue({
	el : "#app9",
    components: { 
    	alert: alertComponent
    },		
	data: { 
		btnClass: 'btn btn-default' // Useless!!!
	},
	methods: { }
});

/*************************************************************************
 *
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
			btnClass: 'btn btn-default'
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
 *
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
			console.log(this.msg + '  alert');
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