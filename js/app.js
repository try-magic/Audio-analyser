var context = new (window.AudioContext || window.webkitAudioContext)(),
	gainNode = context.createGain(),
	source;

gainNode.connect(context.destination);

var	playButton = document.querySelector('#play'),
	stopButton = document.querySelector('#stop');
	
function play(){
	
	source = context.createOscillator();
	source.connect(gainNode);
	source.start(0);
}

function stop(){

	source.stop(0);
	source = null;
}
$(playButton).click(function(){

	play();
});

$(stopButton).click(function(){

	stop();
});