function Timer(options) {
	var timer,
	instance = this,
	seconds = options.seconds || 10,
	minutes = options.minutes || 0,
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
		if (!isPaused)
			seconds--;
	}
	
	this.start = function () {
		clearInterval(timer);
		timer = 0;
		minutes = options.minutes;
		seconds = options.seconds;
		timer = setInterval(decrementCounter, 1000);
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

function yellow() {
	var interval = setInterval(function() {
		$("body").css('background', '#e5e500');
		setTimeout("$('body').css('background', '')", 500);
	}, 1000);
	return interval;
}

function red() {
	var interval = setInterval(function() {
		$("body").css('background', 'red');
		setTimeout("$('body').css('background', '')", 500);
	}, 1000);
	return interval;
}

var yellowFlag;

var counter = new Timer({
	minutes: 15,
	seconds: 0,
	onUpdateStatus: function(min, sec){
		
		var secondsleft = min*60 + sec;
		
		var yellowwarning = 2*60 + 0;
		var redwarning = 1*60 + 0; 
		
		if(secondsleft == yellowwarning) {
			yellowFlag = yellow();
		}
		
		if(secondsleft == redwarning) {
			clearInterval(yellowFlag);
			red();
		}
		
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
