function Timer(options) {
	var timer,
	instance = this,
	seconds = options.seconds || 10,
	minutes = options.minutes || 0,
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
