/* 2017.11.30  ZSY
 * 自定义指令
 */
Vue.directive('pin', function(el, binding) {
	var pinflag = binding.value;
	//console.log(binding);
	//console.log(el);
	if(pinflag) {
		el.style.position = 'fixed';
		el.style.top = '150px';
		el.style.left = '5px';
	}
	else {
		el.style.position = 'static';
	}
})

var app15 = new Vue({
	el: '#app15',
	data: {
		card1: {
			pinflag: false,
		},
		card2: {
			pinflag: false,
		},
		btnClass: 'btn btn-default',
		btnFlag: false
	},
	methods: {
		transform: function() { 
			console.log('btnFlag:', this.btnFlag, '-->', !this.btnFlag);
			this.btnFlag = !this.btnFlag;
		}
	}
});

/*************************************************************************
 * 
 * 
 */