/* 2017.11.30  ZSY
 * 自定义指令
 */

Vue.directive('pin', function(el, binding) {
	var pinflag = binding.value;
	var position = binding.modifiers;
	var warning = binding.arg;

	console.log(binding);
	//console.log(el);
	// console.log('position', position);

	if(pinflag) {

		el.style.position = 'fixed';
		el.style.top =  '150px';
		el.style.left = '5px';

	    if (warning == 'true') {
			el.style.background = '#999';
		}
	}
	else {
		el.style.position = 'static';
	}
})

Vue.directive('newpin', function(el, binding) {
	var newPinFlag = binding.value;
	var position = binding.modifiers;
	var warning = binding.arg;
	var originBG = '#abc';

	console.log(binding);
	//console.log(el);
	//console.log('position', position);
	console.log('warning:', warning);

	if(newPinFlag) {
		el.style.position = 'fixed';
		for (var key in position) {
			if(position[key]) {
				el.style[key] = '10px';
			}
	    }	

	    if(warning == 'change-background') {
	    	console.log('warning!!');
			el.style.background = 'yellow';
		}

	}
	else {
		el.style.position = 'static';
		el.style.background = originBG;
	}
})

new Vue({
	el: '#app15',
	data: {
		card1: {
			pinflag: false,
		},
		card2: {
			pinflag: false,
		},

		card3: {
			pinflag: false,
		},

		card4: {
			pinflag: false,
		},		
		card5: {
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
 * Vue.directive 要放置在new Vue({ });前
 * 若将Vue.directive('newpin'... 移至new Vue({ el: '#app15'... 后则会报错：
 * vue.js:580 [Vue warn]: Failed to resolve directive: newpin
 */

// Vue.directive('newpin', function(el, binding) {
// 	var pinflag = binding.value;
// 	console.log(binding);
// 	console.log(el);
// 	if(pinflag) {
// 		el.style.position = 'fixed';
// 	}
// 	else {
// 		el.style.position = 'static';
// 	}
// })

new Vue({
	el: '#app16',
	data: {
		card3: {
			pinflag: false,
		}
	},
	methods: {

	} 	
});