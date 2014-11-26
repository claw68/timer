function Timer(options) {
	var timer,
	instance = this,
	seconds = options.seconds || 10,
	updateStatus = options.onUpdateStatus || function () {},
	counterEnd = options.onCounterEnd || function () {};
	
	function decrementCounter() {
		updateStatus(seconds);
		if (seconds === 0) {
			counterEnd();
			instance.stop();
		}
		seconds--;
	}
	
	this.start = function () {
		clearInterval(timer);
		timer = 0;
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
	seconds: 5,
	onUpdateStatus: function(sec){
		$("#second").html(format(sec));
	}
});

counter.start();
