function Timer(options) {
	var timer,
	instance = this,
	seconds = options.seconds || 10,
	minutes = options.minutes || 0,
	yellowTime = options.yellowTime || 120,
	redTime = options.redTime || 60,
	yellow = 0,
	red = 0,
	isPaused = false,
	updateStatus = options.onUpdateStatus || function () {},
	counterEnd = options.onCounterEnd || function () {};
	
	function decrementCounter() {
		updateStatus(minutes, seconds);
		if (seconds === 0) {
			if (minutes > 0) {
				minutes--;
				seconds = 60;
			} else {
				counterEnd();
				instance.stop();
			}
		}
		
		if((minutes*60 + seconds) < yellowTime) {
			if(yellow === 0) {
				yellowbkg();
			console.log('yellow!');
			console.log(yellow);
			}
			
		} else if((minutes*60 + seconds) < redTime) {
			if(yellow !== 0)
				clearInterval(yellow);
			if(!red)
				redbkg();
		}
		
		if (!isPaused)
			seconds--;
	}
	
	function redbkg() {
		var red = setInterval(function() {
		$("body").css('background', 'red');
			setTimeout("$('body').css('background', '')", 500);
		}, 1000);
	}
	
	function yellowbkg() {
		var yellow = setInterval(function() {
		$("body").css('background', '#e5e500');
			setTimeout("$('body').css('background', '')", 500);
		}, 1000);
	}
	
	this.start = function () {
		clearInterval(timer);
		timer = 0;
		minutes = options.minutes;
		seconds = options.seconds;
		timer = setInterval(decrementCounter, 100);
	};
	
	this.stop = function () {
		clearInterval(timer);
	};
	
	this.pause = function () {
		isPaused = !isPaused;
	};
}

function format(n) {
	return (n < 10 ? "0" : "") + n;
}

var counter = new Timer({
	minutes: 3,
	seconds: 0,
	onUpdateStatus: function(min, sec){
		$("#minute").html(format(min));
		$("#second").html(format(sec));
	}
});

counter.start();

$(function(){
	$(window).keypress(function(e) {
		if (e.keyCode == 0 || e.keyCode == 32) {
			counter.pause();
		}
	});
});
